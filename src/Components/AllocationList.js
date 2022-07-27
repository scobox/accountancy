import { Button, Chip, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { loadDataFromFirebase, addDataIntoFirebase } from '../db/db_utils';

export default function AllocationList() {
	const [allocationData, setAllocationData] = useState([]);
	const [mode, setMode] = useState(0);
	useEffect(() => {
		loadDataFromFirebase("allocations")
			.then(res => {
				setAllocationData(res);
			})
	}, [mode]);

	const MainAllocations = () => {
		const [editMode, setEditMode] = useState({ edit: false, elementId: -1 });




		const EditAllocationTextField = ({ idx }) => {
			const [textFieldData, setTextFieldData] = useState(allocationData[idx].name);
			return (<>
				<TextField
					size="small"
					value={textFieldData}
					onChange={(event) => setTextFieldData(event.target.value)}
				/>
				<Button onClick={() => {
					addDataIntoFirebase(`allocations/${editMode.elementId}`, { ...allocationData[editMode.elementId], name: textFieldData });
					setEditMode({ edit: false, elementId: -1 });
					loadDataFromFirebase("allocations").then(res => setAllocationData(res));


				}}>save</Button>
				<Button onClick={() => { setEditMode({ edit: false, elementId: -1 }) }}>cancel</Button>
			</>
			)
		}

		return (
			<Box>
				<Box sx={{ p: 2 }}>

					<Button variant="contained" onClick={() => setMode(1)}>add new allocation</Button>
				</Box>
				<Box >
					{allocationData.map((item, idx) => <Box sx={{ p: 1 }} key={idx}>
						{(editMode.edit && editMode.elementId === idx) ?

							<EditAllocationTextField idx={idx} />
							: (
								<>
									<Chip
										label={allocationData[idx].name}
									// onChange={(event) => setAllocationData(allocationData.map((alloc, index) => idx !== index ? alloc : { ...alloc, name: event.target.value }))}
									/>

									<Button size="small" onClick={() => setEditMode({ edit: true, elementId: idx })}>edit</Button>
								</>
							)}
					</Box>)}
				</Box>
			</Box>
		)
	}

	const AddAllocation = () => {
		const [allocationNameText, setAllocationNameText] = useState("");
		return (
			<Box component="form" onSubmit={event => handleSave({ event, text: allocationNameText })}>
				<Box>


					<TextField value={allocationNameText} onChange={event => setAllocationNameText(event.target.value)} size="small" label="enter new allocation" />
				</Box>
				<Button variant="contained" type="submit">save</Button>


				<Button variant="contained" onClick={() => setMode(0)}>x</Button>
			</Box>
		)
	}


	function handleSave({ event, text }) {
		event.preventDefault();
		addDataIntoFirebase(`allocations/${allocationData.length || 1}`, { name: text, id: allocationData.length || 1 });
		setMode(0);
	}



	return (
		<Paper sx={{ height: "100%", p: 2 }} >
			{mode === 0 && <MainAllocations />}
			{mode === 1 && <AddAllocation />}

		</ Paper>
	)
}


