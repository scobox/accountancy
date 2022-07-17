import { fileOpen } from 'https://unpkg.com/browser-fs-access';
import csvToJson from './csvToJson';
export default async function readFile() {
	const blob = await fileOpen({
		mimeTypes: ['text/csv'],
	});
	// blob.text().then(string => console.log(csvToJson(string)));
	return blob.text();

}