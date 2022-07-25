import { Box, Button, Fade, Modal, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { addDataIntoFirebase } from '../../db/db_utils';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function AddInvoiceElement({ refreshData, handleClose }) {
	const [newInvoiceData, setNewInvoiceData] = React.useState({ date: "", amount: "", description: "" });
	const [areInpitsValid, setAreInpitsValid] = React.useState(false);

	useEffect(() => {
		setAreInpitsValid(validateInputs(newInvoiceData));
	}, [newInvoiceData])

	const handleUpdateInvoiceData = (data, label) => {
		setNewInvoiceData({ ...newInvoiceData, [label]: data })
	}
	return (
		<div style={{ display: "inline-block" }}>

			<Paper sx={{ p: 2 }}>
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
				{!areInpitsValid && <>
					<Typography>Enter valid date, amount</Typography><Typography> and description to save</Typography></>}


				<Button
					variant="contained"
					disabled={!areInpitsValid}
					onClick={() => {

						handleSubmit({ ...newInvoiceData, date: formatDate(newInvoiceData.date._d) });
						setNewInvoiceData({ amount: "", description: "", date: "" });
						refreshData()
						handleClose();

					}
					}>Save new invoice</Button>
				<Button variant="contained" sx={{ ml: 1 }} onClick={() => { handleClose() }}>Cancel</Button>
			</Paper>

		</div>
	)
}


const handleSubmit = (payload) => {
	addDataIntoFirebase(`invoices/2022/${Date.now()}`, payload);
	// console.log(payload);
}

const formatDate = (date) => {
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const validateInputs = (newInvoiceData) => {

	// console.log(newInvoiceData.date._isValid, /^\d{1,9}\.?\d{0,2}$/.test(newInvoiceData.amount), newInvoiceData.description.length > 0);

	return newInvoiceData.date?._isValid && /^\-?\d{1,9}\.?\d{0,2}$/.test(newInvoiceData.amount) && newInvoiceData.description.length > 0
}
