import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signOut,
  User,
  updateProfile
} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, User };

// Auth methods
export const signInWithEmailAndPassword = (email: string, password: string) => {
  return firebaseSignIn(auth, email, password);
};

export const createUserWithEmailAndPassword = (email: string, password: string) => {
  return firebaseCreateUser(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const updateUserProfile = (user: User, profile: { displayName?: string; photoURL?: string }) => {
  return updateProfile(user, profile);
};

// Firestore methods
export const addComment = (itemId: string, userId: string, userName: string, text: string) => {
  return addDoc(collection(db, 'comments'), {
    itemId,
    userId,
    userName,
    text,
    createdAt: new Date(),
  });
};

export const getComments = async (itemId: string) => {
  const q = query(collection(db, 'comments'), where('itemId', '==', itemId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
