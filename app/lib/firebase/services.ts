import { auth, db } from './config';
import { UserData } from './types';
import { User } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const dbService = {
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