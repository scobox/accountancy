import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { addDataIntoFirebase, loadDataFromFirebase } from '../db/db_utils'

export default function Profile() {
	const [profileData, setProfileData] = useState({ name: "", surname: "", address: "" });

	useEffect(() => {
		loadDataFromFirebase("profile")
			.then((data) => {
				setProfileData({ ...profileData, ...data });
			});

	}, []);
	return (<>
		<div>
			<Box component="form" onSubmit={(e) => { e.preventDefault(); addDataIntoFirebase("profile", profileData) }} noValidate sx={{ mt: 1, p: 2 }}>
				<TextField
					margin="normal"
					InputLabelProps={{ shrink: true }}
					label="Name"
					fullWidth
					value={profileData.name}
					onChange={(event) => setProfileData({ ...profileData, name: event.target.value })}
				/>

				<TextField
					margin="normal"
					InputLabelProps={{ shrink: true }}
					label="Surname"
					fullWidth
					value={profileData.surname}
					onChange={(event) => setProfileData({ ...profileData, surname: event.target.value })}
				/>
				<TextField
					margin="normal"
					InputLabelProps={{ shrink: true }}
					label="Address"
					fullWidth
					value={profileData.address}
					onChange={(event) => setProfileData({ ...profileData, address: event.target.value })}
				/>
				<Button variant="contained" type="submit">Save changes</Button>
			</Box>
		</div>
		{/* <Button onClick={() => loadDataFromFirebase("profile")}>Get Profile</Button>
		<Button onClick={() => addDataIntoFirebase("profile", { name: "John", surname: "Baker" })}>Add to Profile</Button> */}
	</>
	)
}
