import { renderMonthReport } from "./employee-reports.js";

function renderReportsForAdmin(usersData, reportsData) {
	for (let i = 0; i < usersData.length; i++) {
		let monthAccordionItem = `<div class="accordion-item">
        <h2 class="accordion-header" id="heading${i + 1}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${
			i + 1
		}">
        ${usersData[i].userName}
        </button>
        </h2>
        <div id="collapse${i + 1}" class="accordion-collapse collapse" data-bs-parent="#allEmployeesMonthReport">
        <div class="accordion-body ps-5 monthly-report-for-emp-${i}">
        </div>
        </div>`;
		let monthReportContainer = `.monthly-report-for-emp-${i}`;
		// console.log(monthReportContainer.toString());
		console.log(reportsData[i]);

		$("#allEmployeesMonthReport").append(monthAccordionItem);
		renderMonthReport(reportsData[i], monthReportContainer);

		let dayAccordionItem = `<div class="accordion-item">
        <h2 class="accordion-header" id="heading${i + 1}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${
			i + 1
		}">
        ${usersData[i].userName}
        </button>
        </h2>
        <div id="collapse${i + 1}" class="accordion-collapse collapse" data-bs-parent="#allEmployeesDayReport">
        <div class="accordion-body ps-5 daily-report-for-emp-${i}">
        </div>
        </div>`;
		$("#allEmployeesDayReport").append(dayAccordionItem);
		for (let j = 0; j < reportsData[i].report.length; j++) {
			let { date, time, attendance, late, excuse, absence } = reportsData[i].report[j];

			// Converting employee's attendance status into binary string to identify it's value
			let empAttendStatus = attendance.toString() + late + excuse + absence;
			let dayReport = "";

			switch (empAttendStatus) {
				case "1000":
					dayReport = `Attended on time ${time}`;
					break;
				case "0100":
					dayReport = `Late, at ${time}`;
					break;
				case "0010":
					dayReport = `Excused`;
					break;
				case "0001":
					dayReport = `Absent`;
					break;
			}

			let dayReportRender = `<h2>${date}</h2><p class="lead ps-3">${dayReport}<p>`;

			$(`.daily-report-for-emp-${i}`).append(dayReportRender);
		}
	}
}

export { renderReportsForAdmin };
