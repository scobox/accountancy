import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';
import { Paper, TextField } from '@mui/material';
import { addDataIntoFirebase } from '../db/db_utils';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';





const Fade = React.forwardRef(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter();
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited();
			}
		},
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	);
});

Fade.propTypes = {
	children: PropTypes.element,
	in: PropTypes.bool.isRequired,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
};

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function AddInvioceModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [newInvoiceData, setNewInvoiceData] = React.useState({ date: "", amount: "", description: "" });


	const handleUpdateInvoiceData = (data, label) => {
		setNewInvoiceData({ ...newInvoiceData, [label]: data })
	}

	return (
		<div style={{ display: "inline-block" }}>
			<Button onClick={handleOpen} sx={{ mr: 2 }} variant="contained" >Add new invoice</Button>
			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Paper sx={{ p: 2 }}>

							<Typography id="spring-modal-title" variant="h6" component="h2">
								Add new invoice
							</Typography>


							<Box>
								<LocalizationProvider dateAdapter={AdapterMoment}>
									<DesktopDatePicker
										label="Date"
										inputFormat="DD/MM/YYYY"
										value={newInvoiceData.date}
										onChange={e => handleUpdateInvoiceData(e, "date")}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
							</Box>
							<Box>

								<TextField
									label="Amount"
									margin="normal"
									onChange={e => handleUpdateInvoiceData(e.target.value, "amount")}
								></TextField>
							</Box>
							<Box>

								<TextField
									label="Description"
									margin="normal"
									onChange={e => handleUpdateInvoiceData(e.target.value, "description")}
								></TextField>
							</Box>
							<Button
								variant="contained"
								onClick={() => {
									handleSubmit({ ...newInvoiceData, date: formatDate(newInvoiceData.date._d) });
									setNewInvoiceData({ amount: "", description: "", date: "" });
									setOpen(false);
								}
								}>Save new invoice</Button>
						</Paper>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

const handleSubmit = (payload) => {
	addDataIntoFirebase(`invoices/2022/${Date.now()}`, payload);
	console.log(payload);
}

const formatDate = (date) => {
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
