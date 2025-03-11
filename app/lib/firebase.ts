import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence, browserSessionPersistence, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Types
export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLogin: Date;
  phoneNumber?: string;
  role?: 'user' | 'admin';
  isEmailVerified: boolean;
}

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Services d'authentification
const authService = {
  // Connexion
  async signIn(email: string, password: string, rememberMe: boolean = false) {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        const userRef = doc(db, 'users', userCredential.user.uid);
        await updateDoc(userRef, {
          lastLogin: new Date()
        });
        return userCredential.user;
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  },

  // Inscription
  async signUp(email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
        await dbService.createUserProfile(userCredential.user, { displayName });
        return userCredential.user;
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  },

  // Déconnexion
  async signOut() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      throw error;
    }
  },

  // Obtenir l'utilisateur courant
  getCurrentUser() {
    return auth.currentUser;
  }
};

// Services Firestore
const dbService = {
  // Créer le profil utilisateur
  async createUserProfile(user: User, additionalData: any = {}) {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userData: UserData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || additionalData.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date(),
        lastLogin: new Date(),
        isEmailVerified: user.emailVerified,
        role: 'user',
        ...additionalData
      };

      await setDoc(userRef, userData);
      return userData;
    } catch (error) {
      console.error('Erreur lors de la création du profil:', error);
      throw error;
    }
  },

  // Mettre à jour le profil utilisateur
  async updateUserProfile(uid: string, data: Partial<UserData>) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  },

  // Obtenir les données utilisateur
  async getUserData(uid: string): Promise<UserData | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  },

  // Mettre à jour la dernière connexion
  async updateUserLastLogin(uid: string) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        lastLogin: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la dernière connexion:', error);
      throw error;
    }
  }
};

// Export des services
export { auth, db, authService, dbService };