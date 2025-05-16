/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import {
  CollectionReference,
  doc,
  DocumentData,
  getDocs,
  limit,
  where,
  writeBatch,
} from 'firebase/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PhotosDto } from './dto/photos.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PhotosService {
  private readonly PHOTOS_KEY = 'photos';
  private readonly photosCollectionRef: CollectionReference<
    DocumentData,
    DocumentData
  >;

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
      const photos = photosSnapshot.docs.map((doc) => {
        const { author, ...data } = doc.data();
        return {
          id: doc.id,
          ...data,
        } as PhotosDto;
      });
      await this.redisService.set(this.PHOTOS_KEY, photos);
      return photos;
    } catch (error) {
      throw new Error(`Failed to get photos: ${error}`);
    }
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
    const selectedPhotos = photosSnapshot.docs.map((doc) => {
      const { author, ...data } = doc.data();
      return {
        id: doc.id,
        ...data,
      } as PhotosDto;
    });
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
      const photoRef = doc(this.photosCollectionRef, id);
      batch.update(photoRef, { selected: true });
    });
    photosToSetFalse.forEach((photo) => {
      const photoRef = doc(this.photosCollectionRef, photo.id);
      batch.update(photoRef, { selected: false });
    });
    await batch.commit();
    await this.redisService.delete(`${this.PHOTOS_KEY}-selected`); // delete cache
  }

  async clearCache(key: string): Promise<void> {
    switch (key) {
      case this.PHOTOS_KEY:
        await this.redisService.delete(this.PHOTOS_KEY);
        break;
      case `${this.PHOTOS_KEY}-selected`:
        await this.redisService.delete(`${this.PHOTOS_KEY}-selected`);
        break;
      default:
        await this.redisService.delete(this.PHOTOS_KEY);
        await this.redisService.delete(`${this.PHOTOS_KEY}-selected`);
        break;
    }
  }
}
