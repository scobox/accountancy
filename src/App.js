import { useEffect, useState } from "react";
import csvToJson from "./data_utils/csvToJson";
import readFile from "./data_utils/readFile";
import WriteFile from "./data_utils/WriteFile";
import { fbdb } from "./db/fbdb";
import auth, { loginToFirebaseWithEmailAndPassword } from "./db/auth"
import { writeDataToFirebase } from "./db/db_utils";
import SignIn from "./Components/SignIn";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./Components/SignUp";
import HomePage from "./Components/HomePage";
import { checkFirebaseLoginStatus } from "./db/user_utils";
import MySpendingTracker from "./Components/MySpendingTracker";

function App() {
	const [inv, setInv] = useState([]);
	const [loginStatusLoading, setLoginStatusLoading] = useState(true);
	const [loggedin, setLoggedin] = useState(false);
	const app = fbdb;
	useEffect(() => {
		setLoginStatusLoading(true);
		checkFirebaseLoginStatus({ setLoggedin })
			.then((loginstatus) => {
				setLoginStatusLoading(loginstatus);
			});



	}, [loggedin]);
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={!loggedin ? (loginStatusLoading ? <div>loading</div> : <SignIn setLoggedin={setLoggedin} />) : <HomePage />} />
				<Route path="myspendingtracker" element={<MySpendingTracker />}></Route>
				<Route path="signup" element={<SignUp />} />
			</Routes>
			{/* <div>
				<button onClick={WriteFile}>WriteFile</button>
				<button onClick={() => { readFile().then(res => setInv(csvToJson(res))) }}>readFile</button>
			</div>
			{loggedin ? "logged in" : "not logged in"} */}
			{/* <div>
				<button onClick={() => { loginToFirebaseWithEmailAndPassword("treex.lights1@gmail.com", "123456").then(setLoggedin) }}>Login</button>
			</div>
			<div>
				<button onClick={() => { console.log(sessionStorage.getItem("user")); }}>get from Session storage</button>
			</div>
			<div>
				<button onClick={() => { writeDataToFirebase() }}>add to Firebase</button>
			</div>
			<div>
				{inv.map((inv, i) => <div>{inv.date} {inv.amount} {inv.shopName} {inv.balance}</div>)}
			</div> */}
		</div>

	);

}

export default App;
