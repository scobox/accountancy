import { fileOpen } from 'https://unpkg.com/browser-fs-access';
import csvToJson from './csvToJson';
export default function readFile() {
	return new Promise((resolve, reject) => {

		fileOpen({ mimeTypes: ['text/csv'] })
			.then(blob => {
				blob.text().then(res => resolve(csvToJson(res)))
			});
	})

}