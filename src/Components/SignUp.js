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
import { cteateUserInFirebaseWithEmailAndPassword } from '../db/user_utils';
import { Navigate, Route } from 'react-router-dom';


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

export default function SignUp({ setLoggedin }) {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		cteateUserInFirebaseWithEmailAndPassword(data.get('email'), data.get('password'))
			.then((result) => {
				if (result) {
					setLoggedin(true);


				};
				// console.log("result", result);
				const email = data.get('email');
				passwordField.current.value = ""
				passwordConfirmField.current.value = ""
				emailField.current.value = ""
				!result && setUserAlreadyExists({ ...userAlreadyExists, status: true, email });
			});

		// console.log({
		// 	email: data.get('email'),
		// 	password: data.get('password'),
		// });
	};
	const passwordField = React.useRef(null);
	const passwordConfirmField = React.useRef(null);
	const emailField = React.useRef(null);

	const validateEmailAndPassword = () => {
		const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField.current.value);
		if (passwordField.current.value.length < 6 || passwordConfirmField.current.value.length < 6 || !isEmailValid || passwordField.current.value !== passwordConfirmField.current.value) {
			isPasswordAndEmailValid && setIsPasswordAndEmailValid(false);
			return false;
		} else {
			!isPasswordAndEmailValid && setIsPasswordAndEmailValid(true);
			return true;
		}
	}

	const [userAlreadyExists, setUserAlreadyExists] = React.useState({ status: false, email: "" });
	const [isPasswordAndEmailValid, setIsPasswordAndEmailValid] = React.useState(false);
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
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									// required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									// required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onFocus={() => setUserAlreadyExists({ status: false, email: "" })}
									inputRef={emailField}
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={validateEmailAndPassword}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onFocus={() => setUserAlreadyExists({ status: false, email: "" })}
									inputRef={passwordField}
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									onChange={validateEmailAndPassword}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onFocus={() => setUserAlreadyExists({ status: false, email: "" })}
									inputRef={passwordConfirmField}
									required
									fullWidth
									name="confirmPassword"
									label="Confirm password"
									type="password"
									id="confirmPassword"
									autoComplete="new-password"
									onChange={validateEmailAndPassword}
								/>
							</Grid>
							{userAlreadyExists.status &&
								<Grid item xs={12}>
									<Typography color="red">
										User with email: {userAlreadyExists.email} already exists
									</Typography>
								</Grid>
							}
							{!isPasswordAndEmailValid && <Grid item xs={12}>
								<Typography>
									Password must be at least 6 characters long, confirm password must be the same, email must be valid to submit the registration request
								</Typography>
							</Grid>}
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={!isPasswordAndEmailValid}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="\" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}