// Functions for general purpose usage

const monthsNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function groupArrayOfObjectsByValue(list, key) {
	let arrOfObjects = list.reduce(function (prev, cur) {
		(prev[cur[key]] = prev[cur[key]] || []).push(cur);
		return prev;
	}, []);

	// Filtering empty elements out of the array
	return arrOfObjects.filter(function (e) {
		return e != null;
	});
}

function getTime12Hrs(time24h) {
	let hours = time24h.getHours();
	let minutes = time24h.getMinutes();
	let ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;

	return `${hours}:${minutes}:00 ${ampm}`;
}

function convertTime12to24(time12h) {
	const [time, modifier] = time12h.split(" ");
	let [hours, minutes] = time.split(":");

	if (hours === "12") hours = "00";
	if (modifier === "PM") hours = parseInt(hours, 10) + 12;

	return `${hours}:${minutes}:00`;
}

export { monthsNames, groupArrayOfObjectsByValue, getTime12Hrs, convertTime12to24 };
