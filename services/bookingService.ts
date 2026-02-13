import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore';
import { BookingState, BookingStatus } from '../types';

// ------------------------------------------------------------------
// CONFIGURATION: Add your Firebase Keys here for Cross-Device Sync
// ------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

let db: any = null;
const COLLECTION_KEY = 'urban_spark_bookings';

// Initialize Firebase only if configuration is provided
if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("🔥 Firebase initialized: Cross-device sync active");
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
} else {
    console.log("⚠️ Firebase keys missing: Using LocalStorage (Single Device Mode)");
}

export const bookingService = {
    // Create a new booking
    async createBooking(booking: BookingState): Promise<void> {
        if (db && booking.id) {
            // Firebase Mode
            await setDoc(doc(db, COLLECTION_KEY, booking.id), booking);
        } else {
            // LocalStorage Mode
            const bookings = JSON.parse(localStorage.getItem(COLLECTION_KEY) || '[]');
            bookings.unshift(booking);
            localStorage.setItem(COLLECTION_KEY, JSON.stringify(bookings));
            // Trigger storage event for same-browser tab sync
            window.dispatchEvent(new Event('storage'));
        }
    },

    // Real-time subscription to bookings
    subscribe(callback: (bookings: BookingState[]) => void): () => void {
        if (db) {
            // Firebase Real-time Listener
            const q = query(collection(db, COLLECTION_KEY), orderBy('createdAt', 'desc'));
            return onSnapshot(q, (snapshot) => {
                const bookings = snapshot.docs.map(doc => doc.data() as BookingState);
                callback(bookings);
            });
        } else {
            // LocalStorage Polling/Event Listener
            const load = () => {
                const bookings = JSON.parse(localStorage.getItem(COLLECTION_KEY) || '[]');
                // Sort by date desc
                bookings.sort((a: BookingState, b: BookingState) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                callback(bookings);
            };
            
            load();
            const handleStorage = () => load();
            window.addEventListener('storage', handleStorage);
            
            return () => window.removeEventListener('storage', handleStorage);
        }
    },

    // Update status
    async updateStatus(id: string, status: BookingStatus): Promise<void> {
        if (db) {
            await updateDoc(doc(db, COLLECTION_KEY, id), { status });
        } else {
            const bookings = JSON.parse(localStorage.getItem(COLLECTION_KEY) || '[]');
            const updated = bookings.map((b: BookingState) => b.id === id ? { ...b, status } : b);
            localStorage.setItem(COLLECTION_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event('storage'));
        }
    }
};