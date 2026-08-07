import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/stores/profile.store";

export class FirestoreService {
  /**
   * Save user profile to Firestore
   */
  static async saveProfile(userId: string, profile: UserProfile): Promise<void> {
    if (!db || !userId) return;
    const ref = doc(db, "users", userId, "profile", "info");
    await setDoc(ref, profile, { merge: true });
  }

  /**
   * Fetch user profile from Firestore
   */
  static async getProfile(userId: string): Promise<UserProfile | null> {
    if (!db || !userId) return null;
    const ref = doc(db, "users", userId, "profile", "info");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  }

  /**
   * Subscribe to real-time updates for any user collection
   */
  static subscribeCollection<T extends { id: string }>(
    userId: string,
    collectionName: string,
    onData: (data: T[]) => void
  ): Unsubscribe {
    if (!db || !userId) return () => {};
    const colRef = collection(db, "users", userId, collectionName);
    return onSnapshot(colRef, (snapshot) => {
      const items: T[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as T[];
      onData(items);
    });
  }

  /**
   * Save a single item to a user collection
   */
  static async saveItem<T extends { id: string }>(
    userId: string,
    collectionName: string,
    item: T
  ): Promise<void> {
    if (!db || !userId) return;
    const ref = doc(db, "users", userId, collectionName, item.id);
    await setDoc(ref, item, { merge: true });
  }

  /**
   * Delete a single item from a user collection
   */
  static async deleteItem(
    userId: string,
    collectionName: string,
    itemId: string
  ): Promise<void> {
    if (!db || !userId) return;
    const ref = doc(db, "users", userId, collectionName, itemId);
    await deleteDoc(ref);
  }
}
