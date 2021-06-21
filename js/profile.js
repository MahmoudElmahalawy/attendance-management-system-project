import { renderMonthReport } from "./employee-reports.js";

(function () {
	alert("your login id =====> " + sessionStorage.getItem("empLoginId"));
	$(".monthly-report").html("");
	$(".daily-report").html("");
	const empLoginId = sessionStorage.getItem("empLoginId");

	// Handling data to be displayed for employee's profile
	(async function () {
		const fetchUser = await fetch(`http://localhost:3000/users/${empLoginId}`);
		const userData = await fetchUser.json();

		$("#employee-name-header").text(`${userData.fName} ${userData.lName}`);

		const fetchReport = await fetch(`http://localhost:3000/reports/${empLoginId}`);
		const reportData = await fetchReport.json();

		console.log(reportData.report);
		renderMonthReport(reportData);

		for (let i = 0; i < reportData.report.length; i++) {
			let { date, time, attendance, late, excuse, absence } = reportData.report[i];
			let empAttendStatus = attendance.toString() + late + excuse + absence;
			let dayReport = "";

			switch (empAttendStatus) {
				case "1000":
					dayReport = `You attended on time ${time}`;
					break;
				case "0100":
					dayReport = `You were late, arrived at ${time}`;
					break;
				case "1000":
					dayReport = `You were excused`;
					break;
				case "1000":
					dayReport = `You were absent`;
					break;
			}

			let dayReportHtml = `<h2>${date}</h2>
			<p class="lead pl-3">${dayReport}<p>`;

			$(".daily-report").append(dayReportHtml);
		}
	})();
})();
