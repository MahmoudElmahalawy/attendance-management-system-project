import { renderMonthReport, renderDayReport } from "./employee-reports.js";

(function () {
	alert("your login id =====> " + sessionStorage.getItem("empLoginId"));
	$(".monthly-report").html("");
	$(".daily-report").html("");
	const empLoginId = sessionStorage.getItem("empLoginId");

	// Handling data to be displayed for employee's profile
	(async function () {
		// Getting employee's personal info
		const fetchUser = await fetch(`http://localhost:3000/users/${empLoginId}`);
		const userData = await fetchUser.json();

		$("#employee-name-header").text(`${userData.fName} ${userData.lName}`);
		$("#employee-personal-info")
			.append(`<div class="ps-5 mb-0"><p class="small text-secondary mb-0">Address: ${userData.address}</p>
											<p class="small text-secondary mb-0">Email: ${userData.email}</p>
											<p class="small text-secondary mb-0">Age: ${userData.age}</p></div>`);

		// Getting employee's reports
		const fetchReport = await fetch(`http://localhost:3000/reports?empId=${empLoginId}`);
		const reportData = await fetchReport.json();

		// Displaying reports for the user
		console.log(reportData);
		renderMonthReport(reportData, ".monthly-report");
		renderDayReport(reportData);
	})();
})();
