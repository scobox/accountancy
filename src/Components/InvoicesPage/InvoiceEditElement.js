import { Box, Button, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { addDataIntoFirebase } from '../../db/db_utils';

export default function InvoiceEditElement({ invoiceData, handleClose, retriveDataFromFireBase }) {
	const [currentInvoice, setCurrentInvoice] = useState({});
	function handleEditedInvoiceSave(invoiceId) {
		console.log(invoiceId);
		addDataIntoFirebase(`invoices/2022/${currentInvoice.invoiceId}`, currentInvoice);
		retriveDataFromFireBase();
		handleClose();
	};

	const handleUpdateInvoiceData = (data, label) => {
		setCurrentInvoice({ ...currentInvoice, [label]: data })
	}

	useEffect(() => {
		setCurrentInvoice(invoiceData);
	}, [])
	return (
		<Paper sx={{ p: 2 }}>
			<Typography sx={{ pb: 2 }}>
				Edit invoice
			</Typography>
			<Box sx={{ pb: 2 }}>
				<TextField
					sx={{ mr: 2 }}
					style={{ width: "120px" }}
					value={currentInvoice.date}
					onChange={(e) => handleUpdateInvoiceData(e.target.value, "date")}
				/>
				<TextField
					style={{ width: "110px" }}
					value={currentInvoice.amount}
					onChange={(e) => handleUpdateInvoiceData(e.target.value, "amount")}
				/>
			</Box>

			<TextareaAutosize
				style={{ minWidth: "245px" }}
				value={currentInvoice.description}
				onChange={(e) => handleUpdateInvoiceData(e.target.value, "description")}
			/>
			<Box>
			</Box>
			<Button variant="contained" sx={{ mr: 2 }} onClick={() => handleEditedInvoiceSave(invoiceData.invoiceId)}>Save changes</Button>
			<Button variant="contained" onClick={() => handleClose()}>Cancel</Button>

		</Paper>
	)
}


