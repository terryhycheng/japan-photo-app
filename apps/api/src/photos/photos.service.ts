import { Injectable } from '@nestjs/common';
import {
  CollectionReference,
  doc as docRef,
  DocumentData,
  doc,
  getDoc,
  getDocs,
  where,
  writeBatch,
} from 'firebase/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PhotosDto } from './dto/photos.dto';
import { RedisService } from 'src/redis/redis.service';
import { NotFoundError } from 'src/common/common.error';

type CollectionType = CollectionReference<DocumentData, DocumentData>;

@Injectable()
export class PhotosService {
  private readonly PHOTOS_KEY = 'photos';
  private readonly photosCollectionRef: CollectionType;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly redisService: RedisService,
  ) {
    this.photosCollectionRef = collection(
      this.firebaseService.firestore,
      'photos',
    );
  }

  async getPhotos(): Promise<PhotosDto[]> {
    try {
      const cachedPhotos = await this.redisService.get<PhotosDto[]>(
        this.PHOTOS_KEY,
      );
      if (cachedPhotos) {
        return cachedPhotos;
      }
      const q = query(this.photosCollectionRef, orderBy('__name__'));
      const photosSnapshot = await getDocs(q);
      const photosPromise = photosSnapshot.docs.map(async (doc) => {
        const { author, ...data } = doc.data();
        const authorSnapshot = await getDoc<DocumentData, DocumentData>(author);
        return {
          id: doc.id,
          ...data,
          author: {
            id: authorSnapshot.id,
            ...authorSnapshot.data(),
          },
        } as PhotosDto;
      });
      const photos = await Promise.all(photosPromise);
      await this.redisService.set(this.PHOTOS_KEY, photos);
      return photos;
    } catch (error) {
      throw new Error(`Failed to get photos: ${error}`);
    }
  }

  async getPhotoById(photoId: string): Promise<PhotosDto> {
    const cachedPhoto = await this.redisService.get<PhotosDto>(
      `${this.PHOTOS_KEY}:${photoId}`,
    );
    if (cachedPhoto) {
      return cachedPhoto;
    }
    const docRef = doc(this.photosCollectionRef, photoId);
    const docSnapShot = await getDoc(docRef);
    const photoData = docSnapShot.data();
    if (!photoData) {
      throw new NotFoundError('Invalid photo id');
    }
    await this.redisService.set(`photo:${photoId}`, photoData);
    return photoData as PhotosDto;
  }

  async getSelectedPhotos(): Promise<PhotosDto[]> {
    const cachedSelectedPhotos = await this.redisService.get<PhotosDto[]>(
      `${this.PHOTOS_KEY}-selected`,
    );

    if (cachedSelectedPhotos) {
      return cachedSelectedPhotos;
    }

    const q = query(this.photosCollectionRef, where('selected', '==', true));
    const photosSnapshot = await getDocs(q);
    const selectedPhotosPromise = photosSnapshot.docs.map(async (doc) => {
      const { author, ...data } = doc.data();
      const authorSnapshot = await getDoc<DocumentData, DocumentData>(author);
      return {
        id: doc.id,
        ...data,
        author: {
          id: authorSnapshot.id,
          ...authorSnapshot.data(),
        },
      } as PhotosDto;
    });
    const selectedPhotos = await Promise.all(selectedPhotosPromise);
    await this.redisService.set(`${this.PHOTOS_KEY}-selected`, selectedPhotos);
    return selectedPhotos;
  }

  async updateSelection(selection: string[]): Promise<void> {
    // get all selected photos from firestore
    const selectedPhotos = await this.getSelectedPhotos();

    // get photos to set true
    const photosToSetTrue = selection.filter(
      (id) => !selectedPhotos.some((photo) => photo.id === id),
    );

    // get photos to set false
    const photosToSetFalse = selectedPhotos.filter(
      (photo) => !selection.some((id) => id === photo.id),
    );

    if (photosToSetTrue.length === 0 && photosToSetFalse.length === 0) {
      return;
    }

    const batch = writeBatch(this.firebaseService.firestore);
    photosToSetTrue.forEach((id) => {
      const photoRef = docRef(this.photosCollectionRef, id);
      batch.update(photoRef, { selected: true });
    });
    photosToSetFalse.forEach((photo) => {
      const photoRef = docRef(this.photosCollectionRef, photo.id);
      batch.update(photoRef, { selected: false });
    });
    await batch.commit();
    await this.redisService.delete(`${this.PHOTOS_KEY}-selected`); // delete cache
  }

  async clearCache(key?: string): Promise<void> {
    switch (key) {
      case this.PHOTOS_KEY:
        await this.redisService.delete(this.PHOTOS_KEY);
        break;
      case `${this.PHOTOS_KEY}-selected`:
        await this.redisService.delete(`${this.PHOTOS_KEY}-selected`);
        break;
      default:
        await this.redisService.delete(this.PHOTOS_KEY);
        await this.redisService.delete(`${this.PHOTOS_KEY}:*`);
        await this.redisService.delete(`${this.PHOTOS_KEY}-selected`);
        break;
    }
  }
}
