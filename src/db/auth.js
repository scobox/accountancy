import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";


export const loginToFirebaseWithEmailAndPassword = async (email, password) => {
	return new Promise((resolve, reject) => {


		const auth = getAuth();
		// signInWithEmailAndPassword(auth, email, password)
		setPersistence(auth, browserSessionPersistence)
			.then(() => {
				// Existing and future Auth states are now persisted in the current
				// session only. Closing the window would clear any existing state even
				// if a user forgets to sign out.
				// ...
				// New sign-in will be persisted with session persistence.
				return signInWithEmailAndPassword(auth, email, password);
			})
			.then((userCredential) => {
				// Signed in 

				// const user = userCredential.user;
				console.log(userCredential);
				sessionStorage.setItem('user', userCredential.user.uid);
				resolve(true);

				onAuthStateChanged(auth, (user) => {
					if (user) {
						// User is signed in, see docs for a list of available properties
						// https://firebase.google.com/docs/reference/js/firebase.User
						const uid = user.uid;
						console.log("logged in:", uid);
						// ...
					} else {
						// User is signed out
						// ...
						console.log("logged out");
						sessionStorage.removeItem("user");
					}
				});

				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				resolve(false);
			});
	})
}

export const logoutFromFirebase = function () {
	const auth = getAuth();
	signOut(auth).then(() => {
		// Sign-out successful.
	}).catch((error) => {
		// An error happened.
	});
} 