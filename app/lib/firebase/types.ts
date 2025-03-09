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