import { Inject, Injectable } from '@nestjs/common';
import { FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';

@Injectable()
export class FirebaseService {
  firestore: Firestore;
  auth: Auth;

  constructor(@Inject('FIREBASE_APP') private readonly app: FirebaseApp) {
    this.firestore = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }
}
