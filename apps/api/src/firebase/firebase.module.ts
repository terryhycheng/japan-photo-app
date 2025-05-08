import { Global, Module } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      apiKey: configService.get<string>('FIREBASE_API_KEY'),
      authDomain: configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
      storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: configService.get<string>(
        'FIREBASE_MESSAGING_SENDER_ID',
      ),
      appId: configService.get<string>('FIREBASE_APP_ID'),
    };

    return initializeApp(firebaseConfig);
  },
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
