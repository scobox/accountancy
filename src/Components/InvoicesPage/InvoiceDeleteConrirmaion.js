import { Button, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import { deleteRecordInFirebase } from '../../db/db_utils';

export default function InvoiceDeleteConrirmaion({ invoiceData, handleClose, retriveDataFromFireBase }) {
	console.log(invoiceData, handleClose);

	function handleInvoiceDelete(invoiceId) {
		console.log(invoiceId);
		deleteRecordInFirebase(invoiceId);
		retriveDataFromFireBase();
		handleClose();
	}

	return (
		<Paper sx={{ p: 2 }}>
			<Typography>Are you sure you want to delete invoice:
				{invoiceData.description}
			</Typography>
			<Typography>
				amount: {invoiceData.amount}
			</Typography>
			<Box sx={{ mt: 1 }}>

				<Button variant="contained" sx={{ mr: 2 }} onClick={() => handleInvoiceDelete(invoiceData.invoiceId)}>Delete</Button>
				<Button variant="contained" onClick={() => handleClose()}>Cancel</Button>
			</Box>
		</Paper>
	)
}
