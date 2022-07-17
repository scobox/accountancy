import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";

export async function cteateUserInFirebaseWithEmailAndPassword(email, password, name, surname) {
	return new Promise((resolve, reject) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// const user = userCredential.user;
				sessionStorage.setItem('user', userCredential.user.uid);
				resolve(true)
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				resolve(false);
			});
	})
}

export const checkFirebaseLoginStatus = function ({ setLoggedin }) {
	return new Promise((resolve, reject) => {


		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				// const uid = user.uid;
				console.log("onAuthStateChanged", user);
				setLoggedin(true);
				resolve(true);
				// ...
			} else {
				// User is signed out
				// ...
				console.log("onAuthStateChanged:logged out");
				setLoggedin(false);
				resolve(false);
			}
		});


	});
}