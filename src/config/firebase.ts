import { initializeApp } from 'firebase/app'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  ...(storageBucket && { storageBucket }),
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

/** Firebase Storage. Only available when VITE_FIREBASE_STORAGE_BUCKET is set in .env */
export const storage: FirebaseStorage | null = storageBucket
  ? getStorage(app)
  : null
