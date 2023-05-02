import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {doc, getFirestore, setDoc,getDoc,collection,addDoc,getDocs,query,orderBy} from "firebase/firestore";
import store from "../store/index.js";

const firebaseConfig={
    apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

}




const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage()

const uploadImage = async (file,folder,fileName) => {
    const storageRef = ref(storage, `${folder}/${fileName}`)
    await uploadBytesResumable(storageRef, file)
    return await getDownloadURL(storageRef)
}
//get profile picture from firebase firestore with uid
const getProfilePicture = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().photoURL
    } else {
        return null
    }
}


const signUp = async (email, password,username,photo) => {
    try {

        const user = await createUserWithEmailAndPassword(auth, email, password)
        const photoURL = await uploadImage(photo,'profilePicture',user.user.uid)
        await updateProfile(auth.currentUser, { displayName: username, photoURL })
        //create user in firestore
        await setDoc(doc(db, "users", user.user.uid), {
            username ,
            email,
            photoURL,
            uid: user.user.uid,

        })



    }
    catch (e) {
        throw e
    }

}

const signupWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const { displayName, email, photoURL, uid } = user
        await setDoc(doc(db, "users", uid), {
            username: displayName,
            email,
            photoURL,
            uid,

        })
        return user
    }
    catch (e) {
        throw e
    }


}
const signIn = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password)

    }
    catch (error) {


        switch (error.code) {
            case 'auth/user-not-found':
                throw 'Bu kullanıcı adı veya e-posta adresi kayıtlı değil.';
            case 'auth/wrong-password':
                throw 'Şifreniz yanlış, lütfen tekrar deneyin.';
            case 'auth/invalid-email':
                throw 'Geçersiz bir e-posta adresi girdiniz.';
            default:
                throw 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.';
        }
    }
}
const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user
        return user




    }
    catch (e) {
        throw e
    }
}
const signOut = async () => {
    try {
        await auth.signOut()
    }
    catch (e) {
        throw e
    }
}

const getUserDataWithUidOnFirestore = async (uid) => {
    if (uid){
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
    }
}
onAuthStateChanged(auth, (user) => {
    if (user) {

        const {uid,displayName,email} = user;
        store.dispatch({ type: 'auth/login', payload: { uid,displayName,email } })
    } else {
        store.dispatch({ type: 'auth/logout' })

    }
}
)
const addNewBookmark = async ({ title, id,image }) => {
    try {
        const user = auth.currentUser;
        const { uid } = user;



        const userDocRef = doc(db, 'users', uid);
        const bookmarksCollectionRef = collection(userDocRef, 'bookmarks');
        const bookmarkDocRef = doc(bookmarksCollectionRef, title);
        await setDoc(bookmarkDocRef, {});
        const moviesCollectionRef = collection(bookmarkDocRef, 'movies');
        const movieData={
            id,
            image
        }
        await addDoc(moviesCollectionRef, movieData);

    } catch (e) {
        throw e;
    }
};
const getBookmarks = async () => {
    try{
        const user = auth.currentUser;
        const { uid } = user;
        const userDocRef = doc(db, 'users', uid);
        const bookmarksCollectionRef = collection(userDocRef, 'bookmarks');
        const sevdigimFilmlerDocRef = doc(bookmarksCollectionRef, 'sevdigim_Filmler');
        const moviesCollectionRef = collection(sevdigimFilmlerDocRef, 'movies');
        const moviesSnapshot = await getDocs(moviesCollectionRef);

        const movies = moviesSnapshot.docs.map((movieDoc) => {
            return { id: movieDoc.id, ...movieDoc.data() };
        });
        movies.map((movie)=>{
         movie.image = `https://image.tmdb.org/t/p/original${movie.image}`
        }
        )
        return movies;
    }
    catch (e) {
        throw e;
    }


}


export { signUp,signupWithGoogle ,signOut,signIn,signInWithGoogle,getProfilePicture,getUserDataWithUidOnFirestore,addNewBookmark,getBookmarks}