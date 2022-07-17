export default function csvToJson(csvString) {
	let array = csvString.split(/\r?\n/);
	// console.log(csvString);
	// return array.filter(el => el && transactionStringToArray(el));
	return array.filter(el => el.length).map(el => transactionStringToArray(el));


}

const transactionStringToArray = (string) => {
	const tempArray = string.split(",");
	console.log(tempArray);
	return {
		date: tempArray[0],
		amount: tempArray[1].slice(1, -1),
		shopName: tempArray[2].slice(1, -1),
		balance: tempArray[3]
	}

}