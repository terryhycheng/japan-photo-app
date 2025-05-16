import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { RedisService } from 'src/redis/redis.service';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { JudgeMainDto } from './dto/judge.dto';
import { PhotosDto } from 'src/photos/dto/photos.dto';
import { NotFoundError } from 'src/common/common.error';

type CollectionType = CollectionReference<DocumentData, DocumentData>;

@Injectable()
export class JudgeService {
  private readonly db: Firestore;
  private readonly PHOTOS_KEY = 'photos';
  private readonly photoCollection: CollectionType;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly redisService: RedisService,
  ) {
    this.db = this.firebaseService.firestore;
    this.photoCollection = collection(this.db, this.PHOTOS_KEY);
  }

  async createMainJudge({ id, comment, scores }: JudgeMainDto) {
    const REDIS_PHOTO_KEY = `${this.PHOTOS_KEY}:${id}`;
    const docRef = doc(this.photoCollection, id);

    let photoData: any =
      await this.redisService.get<PhotosDto>(REDIS_PHOTO_KEY);

    // check if photo data is in redis
    if (!photoData) {
      const docSnapShot = await getDoc(docRef);
      photoData = docSnapShot.data(); // get photo data from firestore
    }

    // check if photo data is valid
    if (!photoData) {
      throw new NotFoundError('Invalid photo id');
    }

    await updateDoc(docRef, {
      judge: {
        comment,
        scores,
      },
    });

    await this.redisService.delete(REDIS_PHOTO_KEY);
  }
}
