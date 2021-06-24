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

// Looping on daily reports to do monthly report
function renderMonthReport(reportData, monthReportContainer) {
	var attendCount = 0,
		lateCount = 0,
		excuseCount = 0,
		absenceCount = 0;
	var parsePrevDateMonth = Date.parse(reportData[0].date);
	var prevDateMonth = new Date(parsePrevDateMonth).getMonth();

	for (let i = 0; i < reportData.length; i++) {
		let { date, attendance, late, excuse, absence } = reportData[i];

		// Converting date string in database into a date object to compare
		let parseDate = Date.parse(date);
		var curDateMonth = new Date(parseDate).getMonth();

		if (curDateMonth === prevDateMonth) {
			attendCount += attendance;
			lateCount += late;
			excuseCount += excuse;
			absenceCount += absence;
			let monthReportHtml = `<h2>${monthsNames[curDateMonth]}</h2>
				<ul>
				<li>Attendance: ${attendCount}</li>
				<li>Late: ${lateCount}</li>
				<li>Excuse: ${excuseCount}</li>
				<li>Absence: ${absenceCount}</li>
				</ul>`;

			$(monthReportContainer).append(monthReportHtml);
		} else {
			prevDateMonth = curDateMonth;
			attendCount = attendance;
			lateCount = late;
			excuseCount = excuse;
			absenceCount = absence;
		}
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
