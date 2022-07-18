import { Box, Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { addDataIntoFirebase, loadDataFromFirebase } from '../db/db_utils';
import AddInvioceModal from './AddInvoiceModal';

export default function Invoices() {

	const [invoices, setInvoices] = useState([]);
	function retriveDataFromFireBase() {
		loadDataFromFirebase("invoices/2022")
			.then((data) => {
				const invoicesInArray = Object.keys(data).map(key => { return { ...data[key], invoiceId: key } });
				setInvoices(invoicesInArray);
			});
	}


	useEffect(() => {
		retriveDataFromFireBase();
	}, []);
	return (
		<>
			<Box sx={{ p: 2 }}>
				<AddInvioceModal />
			</Box>
			<InvoiceTable invoiceData={invoices} retriveDataFromFireBase={retriveDataFromFireBase} />

		</>
	)
}






const InvoiceTable = ({ invoiceData, retriveDataFromFireBase }) => {

	const [allocationList, setAllocationList] = useState([]);
	const columns = [{ label: "Date", id: "date" }, { label: "Amount", id: "amount" }, { label: "Description", id: "description", width: "25%" }, { label: "Allocation", id: "allocation", width: "25%" }, { label: "", id: "edit" }];
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	useEffect(() => {
		loadDataFromFirebase("allocations").then(res => { setAllocationList(res); });

	}, [])

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	return (
		<>
			<Paper sx={{ width: '100%', overflow: 'hidden', border: "1px solid black" }}>
				<TableContainer sx={{ maxHeight: "70vh" }} component={Paper}>
					<Table stickyHeader aria-label="a dense table" size="small" >
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										// align={column.align}
										style={{ width: column.width ?? "" }}
									>
										{column.label}

									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{
								invoiceData

									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										return (

											<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
												{columns.map((column) => {
													// 				// const value = row[column.id];
													return (
														<TableCell
															key={column.id}
														>
															{column.id !== "allocation" && row[column.id]}
															{column.id === "allocation" &&
																<Select
																	size="small"
																	labelId="demo-simple-select-filled-label"
																	id="demo-simple-select-filled"
																	style={{ width: '100%' }}
																	value={row[column.id] ?? 0}
																	onChange={(e) => {
																		addDataIntoFirebase(`invoices/2022/${row.invoiceId}/allocation`, e.target.value);
																		retriveDataFromFireBase()
																	}}
																>
																	{/* <Button size="small" variant="contained">
																		allocation
																	</Button> */}
																	<MenuItem value={0}>Unallocated</MenuItem>

																	{allocationList.map((allocation, idx) => <MenuItem key={idx} value={allocation.id}>{allocation.name}</MenuItem>)}
																</Select>

															}
															{column.id === "edit" && <Button size="small" variant="contained">edit</Button>}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})
							}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 100]}
					component="div"
					count={invoiceData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	)
}


