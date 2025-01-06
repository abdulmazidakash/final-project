import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({children}) => {

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const googleProvider = new GoogleAuthProvider();
	const axiosPublic = useAxiosPublic();

	const  createUser = (email, password) =>{
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	}

	const signInUser = (email, password) =>{
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	}

	const googleSignIn = () =>{
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	}

	const signOUtUser = () =>{
		setLoading(true);
		return signOut(auth);
	}

	const updateUserProfile = (name, photo) =>{
		setLoading(true);
		return updateProfile(auth.currentUser, {
			displayName: name, photoURL: photo
		});
	}

	useEffect(()=> {
		const unSubscribe = onAuthStateChanged (auth, currentUser =>{
			setUser(currentUser);
			console.log(`current user---✔  ${currentUser?.email}`);
			if(currentUser){
				//get token and store client
				const userInfo = { email: currentUser.email};
				axiosPublic.post('/jwt', userInfo)
					.then(res =>{
						if(res.data.token){
							localStorage.setItem('access-token', res.data.token)
						}
					})

			}
			else{
				//todo: remove token (if token stored in the client side local storage, caching, in memory)
				localStorage.removeItem('access-token');
			}
			setLoading(false);
			
		})
		return ()=> {
			return unSubscribe();
		}
	}, [])

	const authInfo = {
		user, 
		loading,
		createUser,
		signInUser,
		signOUtUser,
		updateUserProfile,
		googleSignIn,
	}
	return (
		<AuthContext.Provider value={authInfo}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;