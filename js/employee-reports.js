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

// Looping on daily reports to do the month's report
function renderMonthReport(reportData) {
	var attendCount = 0,
		lateCount = 0,
		excuseCount = 0,
		absenceCount = 0;
	var parsePrevDateMonth = Date.parse(reportData.report[0].date);
	var prevDateMonth = new Date(parsePrevDateMonth).getMonth();

	for (let i = 0; i < reportData.report.length; i++) {
		let { date, attendance, late, excuse, absence } = reportData.report[i];
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

			$(".monthly-report").append(monthReportHtml);
		} else {
			prevDateMonth = curDateMonth;
			attendCount = attendance;
			lateCount = late;
			excuseCount = excuse;
			absenceCount = absence;
		}
	}
}

export { renderMonthReport };
