import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import { logoutFromFirebase } from '../db/auth';
import { Link as RouterLink } from "react-router-dom";

export default function NavigationMenu() {
	return (
		<React.Fragment>
			<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar sx={{ flexWrap: 'wrap' }}>
					<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
						Spending allocations
					</Typography>
					<nav>

						{/* <Link
    variant="button"
    color="text.primary"
    href="#"
    sx={{ my: 1, mx: 1.5 }}
>

</Link> */}
						<RouterLink to="/myspendingtracker">My spending tracker</RouterLink>
						<Link
							variant="button"
							color="text.primary"
							href="#"
							sx={{ my: 1, mx: 1.5 }}
						>
							Profile
						</Link>
						<Link
							variant="button"
							color="text.primary"
							href="#"
							sx={{ my: 1, mx: 1.5 }}
						>
							Help
						</Link>
					</nav>
					<Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={logoutFromFirebase}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>

			{/* <button onClick={() => loadDataFromFirebase()}>load data from firebase</button>
<button onClick={() => loadDataFromFirebase("invoices")}>load invoices</button>
<button onClick={() => addDataIntoFirebase("invoices")}>add invoices</button> */}
		</React.Fragment>

	);
};
