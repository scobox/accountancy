import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginToFirebaseWithEmailAndPassword } from '../db/auth';
import { Link as RouterLink } from "react-router-dom";
import ModalWindow from './ModalWindow';
import { CircularProgress } from '@mui/material';

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Oleg Borisov
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignIn({ setLoggedin }) {
	const [loginFail, setLoginFail] = React.useState(false);
	const [loadingInProgress, setLoadingInProgress] = React.useState(false);
	const handleSubmit = (event) => {
		event.preventDefault();
		setLoadingInProgress(true);
		const data = new FormData(event.currentTarget);
		loginToFirebaseWithEmailAndPassword(data.get('email'), data.get('password'))
			.then((loginResult) => {
				setLoadingInProgress(false);
				if (!loginResult) {//show Login fail message
					setLoginFail(true);
					setTimeout(() => {
						setLoginFail(false);
					}, 2800)
				}
				setLoggedin(loginResult);
				emailInput.current.value = "";
				passwordInput.current.value = "";
			})
	};
	const emailInput = React.useRef(null);
	const passwordInput = React.useRef(null);
	return (
		<ThemeProvider theme={theme}>


			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							inputRef={emailInput}
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							inputRef={passwordInput}
							id="password"
							autoComplete="current-password"
						/>
						{loginFail && <Typography component="h4" style={{ color: "red" }}>Login Faild - incorrect email or password, try again</Typography>}
						{loadingInProgress && <Box style={{ display: "flex", justifyContent: "space-around" }}><CircularProgress /></Box>}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<RouterLink to="/signup">
									"Don't have an account? Sign Up"
								</RouterLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}