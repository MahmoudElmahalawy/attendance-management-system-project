import { getTime12Hrs, convertTime12to24 } from "./general.js";

function recordAttendance(userName) {
	console.log(userName);
	(async function () {
		// Getting user to record attendance for
		const fetchUser = await fetch(`http://localhost:3000/users?userName=${userName}`);
		const userData = await fetchUser.json();

		console.log(userData);

		// Checking if username entered is correct
		if (!userData[0]) {
			alert("Username is incorrect please try again!");
			$("#recordForm").trigger("reset");
			return;
		} else {
			// Getting time in 12 hours format to record it in db.json
			const currentTime = getTime12Hrs(new Date());
			const currentTime24Hrs = convertTime12to24(currentTime);
			const empStatusChecked = $('input[name="empStatus"]:checked').val();
			let empStatus = { attendance: 0, late: 0, excuse: 0, absence: 0 };

			// Recording status of the employee based on time and admin's input
			switch (empStatusChecked) {
				case "attended":
					"7:30:00" < currentTime24Hrs < "9:00:00" ? (empStatus.attendance = 1) : (empStatus.late = 1);
					break;
				case "excused":
					empStatus.excuse = 1;
					break;
				case "absent":
					empStatus.absence = 1;
					break;
			}

			let attendanceRecord = {
				empId: userData[0].id,
				date: new Date().toLocaleDateString(),
				time: currentTime,
				...empStatus,
			};

			// Recording employee status in db.json
			await fetch(`http://localhost:3000/reports?empId=${userData[0].id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(attendanceRecord),
			});
		}
	})();
}

export { recordAttendance };
