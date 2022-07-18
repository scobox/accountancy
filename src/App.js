import { useEffect, useState } from "react";
import SignIn from "./Components/SignIn";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import HomePage from "./Components/HomePage";
import { setFirebaseLoginStatusWatcher } from "./db/user_utils";
import "./db/fbdb"; //initialize database


function App() {

	const [loggedin, setLoggedin] = useState(false);
	useEffect(() => {
		setFirebaseLoginStatusWatcher({ setLoggedin })
	}, [loggedin]);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={!loggedin ? <SignIn setLoggedin={setLoggedin} /> : <HomePage />} />
				<Route path="signup" element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;
