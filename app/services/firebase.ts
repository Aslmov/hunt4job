import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { UserData } from '@/app/types/user';
import { app } from '@/app/providers/firebase';

const db = getFirestore(app);

export const userServices = {
  // Créer ou mettre à jour un utilisateur
  async createOrUpdateUser(uid: string, userData: Partial<UserData>) {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Mettre à jour l'utilisateur existant
        await updateDoc(userRef, {
          ...userData,
          lastLogin: new Date(),
        });
      } else {
        // Créer un nouvel utilisateur
        await setDoc(userRef, {
          ...userData,
          uid,
          createdAt: new Date(),
          lastLogin: new Date(),
          isEmailVerified: false,
          role: 'user',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création/mise à jour de l\'utilisateur:', error);
      throw error;
    }
  },

  // Récupérer les données d'un utilisateur
  async getUserData(uid: string): Promise<UserData | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      throw error;
    }
  },

  // Mettre à jour la dernière connexion
  async updateLastLogin(uid: string) {
    try {
      await updateDoc(doc(db, 'users', uid), {
        lastLogin: new Date(),
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la dernière connexion:', error);
    }
  },
}; 