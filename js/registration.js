// Generating username on registration
function generateRandomUserName(name) {
	let random3digitNum = new Date().getUTCMilliseconds();
	return name.slice(0, 3) + random3digitNum + Math.random().toString(36).substring(3).slice(0, 3);
}

// Generating random password for user on registration
function generateRandomPassword() {
	let length = 8,
		charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		retVal = "";
	for (let i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}

// Adding employee's entered data into db.json --> /users
async function addNewEmp(empDataObj) {
	await fetch("http://localhost:3000/users/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(empDataObj),
	});
	console.log("Employee's data added to db.json");
}

async function getIdOfNewEmp(empDataObj) {
	const fetchGetRes = await fetch(`http://localhost:3000/users?userName=${empDataObj.userName}`);
	const data = await fetchGetRes.json();
	console.log("id: " + data[0].id);
	return data[0].id;
}

async function addReportId(id) {
	await fetch(`http://localhost:3000/users/${id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			reportId: id,
		}),
	});
}

async function addReportForEmp(id) {
	await fetch("http://localhost:3000/reports/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id: id,
			report: [],
		}),
	});
}

export { generateRandomUserName, generateRandomPassword, addNewEmp, getIdOfNewEmp, addReportId, addReportForEmp };
