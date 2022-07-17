// import fs from 'fs';
import {
	fileOpen,
	directoryOpen,
	fileSave,
} from 'https://unpkg.com/browser-fs-access';
export default function WriteFile() {

	const DB_URL = "c:/db/dbfile.txt";
	const invoice = {
		number: 1,
		decription: "pen",
		price: 23.5
	};
	const blob = new Blob([JSON.stringify(invoice)], { type: 'text/html' });
	console.log(blob);
	fileSave(blob, {
		fileName: DB_URL,
	});
}
