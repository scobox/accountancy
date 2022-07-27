import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { addDataIntoFirebase } from '../../db/db_utils';

export default function ImportInvoicesElement({ invoicesForImport, setInvoiceSubPage }) {
	const [selectedInvoices, setSelectedInvoices] = useState([]);
	return (
		<>
			<InvoiceTable invoiceList={invoicesForImport} setSelectedInvoices={setSelectedInvoices} selectedInvoices={selectedInvoices} setInvoiceSubPage={setInvoiceSubPage} />
		</>
	)
}


const InvoiceTable = ({ invoiceList, setSelectedInvoices, selectedInvoices, setInvoiceSubPage }) => {
	const invoiceListWithId = invoiceList.map(invoice => { return { ...invoice, id: invoice.amount.slice(1).replace(".", "-") + "-" + invoice.balance.slice(1).replace(".", "-") } });
	const columns = [
		{ field: 'date', headerName: 'Date', width: 90 },
		{ field: 'amount', headerName: 'Amount', width: 150 },
		{ field: 'description', headerName: 'Description', width: 530 },
		// {
		// 	field: 'age',
		// 	headerName: 'Age',
		// 	type: 'number',
		// 	width: 90,
		// },
		// {
		// 	field: 'fullName',
		// 	headerName: 'Full name',
		// 	description: 'This column has a value getter and is not sortable.',
		// 	sortable: false,
		// 	width: 160,
		// 	valueGetter: (params) =>
		// 		`${params.row.firstName || ''} ${params.row.lastName || ''}`,
		// },
	];




	return (
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={invoiceListWithId}
				columns={columns}
				// pageSize={5}
				// rowsPerPageOptions={[5]}
				checkboxSelection
				onSelectionModelChange={(newSelection) => { setSelectedInvoices(handleSelectionChange(newSelection, invoiceListWithId)) }}
			/>
			<Button variant="contained" sx={{ m: 2 }} onClick={() => { addInvoicesIntoDb(selectedInvoices) }}>Import selected</Button>
			<Button variant="contained" sx={{ mr: 2 }} onClick={() => { addInvoicesIntoDb(invoiceListWithId) }}>Import all</Button>
			<Button variant="contained" onClick={() => { setInvoiceSubPage(0) }}>Cancel importing</Button>
		</div>
	);
}

function addInvoicesIntoDb(invoiceList) {
	invoiceList.forEach(invoice => {
		console.log("addInvoicesIntoDb", invoice);
		addDataIntoFirebase(`invoices/2022/${invoice.id}`, invoice);
	})
}

function handleSelectionChange(selection, invoiceList) {

	console.log(selection);
	return (invoiceList.filter(invoice => {
		let isSelected = false;
		selection.forEach(selectionId => { invoice.id === selectionId && (isSelected = true) })
		return isSelected
	}));
}
