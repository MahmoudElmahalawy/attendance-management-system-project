import { monthsNames, groupArrayOfObjectsByValue } from "./general.js";

// Looping on daily reports to do monthly report
function renderMonthReport(reportData, monthReportContainer) {
	var attendCount = 0,
		lateCount = 0,
		excuseCount = 0,
		absenceCount = 0;
	// Converting date string in database into a date object
	//var parsePrevDateMonth = Date.parse(reportData[0].date);
	//var prevDateMonth = new Date(parsePrevDateMonth).getMonth();

	// Creating new array grouped by month
	var copyOfReport = [];
	for (let i = 0; i < reportData.length; i++) {
		// Copying report into a new array
		copyOfReport.push(reportData[i]);

		// Getting month number from date in report
		var parseDate = Date.parse(reportData[i].date);
		var monthNum = new Date(parseDate).getMonth();

		// Overwriting date from full string to only month number
		copyOfReport[i] = { ...copyOfReport[i], date: monthNum };
	}

	// Grouping the cloned array by month number
	let reportGroupedByMonth = groupArrayOfObjectsByValue(copyOfReport, "date");
	console.log("reportGroupedByMonth", reportGroupedByMonth);

	for (let i = 0; i < reportGroupedByMonth.length; i++) {
		let month = `<h2>${monthsNames[reportGroupedByMonth[i][0].date]}</h2>`;
		attendCount = 0;
		lateCount = 0;
		excuseCount = 0;
		absenceCount = 0;
		$(monthReportContainer).append(month);
		for (let j = 0; j < reportGroupedByMonth[i].length; j++) {
			let { date, attendance, late, excuse, absence } = reportGroupedByMonth[i][j];
			attendCount += attendance;
			lateCount += late;
			excuseCount += excuse;
			absenceCount += absence;
		}
		let monthReportHtml = `<ul>
		<li>Attendance: ${attendCount}</li>
		<li>Late: ${lateCount}</li>
		<li>Excuse: ${excuseCount}</li>
		<li>Absence: ${absenceCount}</li>
		</ul>`;

		$(monthReportContainer).append(monthReportHtml);
	}
}

function renderDayReport(reportData) {
	for (let i = 0; i < reportData.length; i++) {
		let { date, time, attendance, late, excuse, absence } = reportData[i];

		// Converting employee's attendance status into binary string to identify it's value
		let empAttendStatus = attendance.toString() + late + excuse + absence;
		let dayReport = "";

		switch (empAttendStatus) {
			case "1000":
				dayReport = `You attended on time ${time}`;
				break;
			case "0100":
				dayReport = `You were late, arrived at ${time}`;
				break;
			case "0010":
				dayReport = `You were excused`;
				break;
			case "0001":
				dayReport = `You were absent`;
				break;
		}

		let dayReportHtml = `<h2>${date}</h2>
        <p class="lead ps-3">${dayReport}<p>`;

		$(".daily-report").append(dayReportHtml);
	}
}

export { renderMonthReport, renderDayReport };
