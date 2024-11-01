import { db } from './firebase'
import { addDoc, collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore'

export const useFirestore = () => {

    const addToWatchList = async (userId, collName, dataId, data) => {
        try {
            if (await checkIfInWatchList(userId, dataId, collName)) {
                return alert('already in watchlist')
            }
            await setDoc(doc(db, "users", userId, 'watchlist', userId, collName, dataId.toString()), data);
        } catch (error) {
            console.log('error', error)
        }
    }
    const checkIfInWatchList = async (userId, dataId, colName) => {
        const docRef = doc(db, "users", userId, 'watchlist', userId, colName, dataId.toString())
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return true
        } else {
            return false
        }
    }
    const getWatchList = async (userId) => {
        const moviesCollectionRef = collection(db, "users", userId, "watchlist", userId, "movies");
        const tvShowsCollectionRef = collection(db, "users", userId, "watchlist", userId, "tvshows");
      
        try {
          // Get all documents in "movies"
          const moviesSnapshot = await getDocs(moviesCollectionRef);
          const movies = moviesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          // Get all documents in "tvshows"
          const tvShowsSnapshot = await getDocs(tvShowsCollectionRef);
          const tvShows = tvShowsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          return { movies, tvShows };
        } catch (error) {
          console.error("Error fetching watchlist data:", error);
        }

        
    }
    
    const removeFromWatchList = async (userId, collName, dataId) => {
        try {
            await deleteDoc(doc(db, "users", userId, 'watchlist', userId, collName, dataId.toString()))
        } catch (error) {
            console.log('error', error)
        }
    }
    
    return { addToWatchList, checkIfInWatchList , getWatchList , removeFromWatchList }
}