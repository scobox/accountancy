import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";

export function writeDataToFirebase() {
	const db = getDatabase();
	const userId = sessionStorage.getItem("user");
	set(ref(db, 'users/' + userId), {
		test: { 1: "adf", 2: "adfasdfasdfa" }
	});
}

export function loadDataFromFirebase(path = "") {
	return new Promise((resolve, reject) => {

		const auth = getAuth();
		const userId = auth.currentUser.uid;

		const dbRef = ref(getDatabase());
		get(child(dbRef, `users/${userId}/${path}`)).then((snapshot) => {
			if (snapshot.exists()) {
				console.log(snapshot.val());
				resolve(snapshot.val())
			} else {
				console.log("No data available");
			}
		}).catch((error) => {
			console.error(error);
			resolve(false);
		});
	});
}
export function addDataIntoFirebase(path, payload = {}) {
	const auth = getAuth();
	const userId = auth.currentUser.uid;
	const db = getDatabase();
	const currentDate = new Date();
	let fullPath = 'users/' + userId + "/";
	// 'users/' + userId + "/" + path + "/" + currentDate.getFullYear() + "/" + currentDate.getTime()
	if (path === "profile") {
		fullPath += "profile";
	}
	else if (path) {
		fullPath += path;
	}
	set(ref(db, fullPath), payload);
}