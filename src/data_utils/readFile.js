// import { fileOpen } from 'https://unpkg.com/browser-fs-access';
import { fileOpen } from 'browser-fs-access';
import csvToJson from './csvToJson';
export default function readFile() {
	return new Promise((resolve, reject) => {

		fileOpen({ mimeTypes: ['text/csv'] })
			.then(blob => {
				console.log("reading file");
				blob.text().then(res => resolve(csvToJson(res)))
			});
	})

}