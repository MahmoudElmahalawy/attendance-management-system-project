(function () {
	alert("your login id =====> " + sessionStorage.getItem("empLoginId"));

	const empLoginId = sessionStorage.getItem("empLoginId");

	(async function () {
		const fetchUser = await fetch(`http://localhost:3000/users/${empLoginId}`);
		const userData = await fetchUser.json();

		// console.log(userData);

		$("#employee-name-header").text(`${userData.fName} ${userData.lName}`);

		const fetchReport = await fetch(`http://localhost:3000/reports/${empLoginId}`);
		const reportData = await fetchReport.json();

		var attendCount = 0;
		var lateCount = 0;
		var excuseCount = 0;
		var absenceCount = 0;
		for (let i = 0; i < reportData.report.length; i++) {
			console.log(reportData.report[i]);
			if (reportData.report[i].attendance) attendCount++;
			if (reportData.report[i].late) lateCount++;
			if (reportData.report[i].excuse) excuseCount++;
			if (reportData.report[i].absence) absenceCount++;
		}
		console.log(reportData.report);
		console.log("Attendance count: " + attendCount);
		console.log("late count: " + lateCount);
		console.log("excuse count: " + excuseCount);
		console.log("absence count: " + absenceCount);
	})();
})();
