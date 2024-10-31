import { db } from './firebase'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'

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
    const getWatchList = async (userId, colName) => {
        const docRef = doc(db, "users", userId, 'watchlist', userId, colName)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return false
        }
    }
    return { addToWatchList, checkIfInWatchList , getWatchList }
}