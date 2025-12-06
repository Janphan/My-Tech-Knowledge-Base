// Firebase Authentication Service Template
// This provides a complete authentication service for Firebase Auth
// Make sure to configure your Firebase project in firebase.ts first

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase'; // Import auth from your firebase config

export const authService = {
  // Sign up a new user with email and password
  async signUp(email: string, password: string): Promise<User> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully:', userCredential.user.email);
      return userCredential.user;
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  },

  // Sign in an existing user with email and password
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully:', userCredential.user.email);
      return userCredential.user;
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  },

  // Sign out the current user
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  },

  // Listen for authentication state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user.email);
      } else {
        console.log('User is signed out');
      }
      callback(user);
    });
  },

  // Get the current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return auth.currentUser !== null;
  },
};

// Usage example:
/*
// In your React component or app:
import { authService } from './firebaseAuth';

// Sign up
const handleSignUp = async () => {
  try {
    const user = await authService.signUp('user@example.com', 'password123');
    console.log('Signed up:', user);
  } catch (error) {
    console.error('Sign up failed:', error);
  }
};

// Sign in
const handleSignIn = async () => {
  try {
    const user = await authService.signIn('user@example.com', 'password123');
    console.log('Signed in:', user);
  } catch (error) {
    console.error('Sign in failed:', error);
  }
};

// Sign out
const handleSignOut = async () => {
  try {
    await authService.signOut();
  } catch (error) {
    console.error('Sign out failed:', error);
  }
};

// Listen for auth changes
useEffect(() => {
  const unsubscribe = authService.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return () => unsubscribe(); // Cleanup on unmount
}, []);
*/
