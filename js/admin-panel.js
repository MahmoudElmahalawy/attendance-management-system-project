import { renderReportsForAdmin } from "./admin-panel-reports.js";
import { recordAttendance } from "./record-attendance.js";

(function () {
	const empType = sessionStorage.getItem("empType");
	const adminLoginId = sessionStorage.getItem("empLoginId");
	alert("Admin login id =====> " + adminLoginId);

	if (empType) {
		// Handling data to be displayed for employee's profile
		(async function () {
			// Getting admin info
			const fetchAdmin = await fetch(`http://localhost:3000/users/${adminLoginId}`);
			const adminData = await fetchAdmin.json();
			$("#admin-name-header").text(`${adminData.fName} ${adminData.lName}`);
			$("#admin-personal-info")
				.append(`<div class="ps-5 mb-0"><p class="small text-secondary mb-0">Address: ${adminData.address}</p>
											<p class="small text-secondary mb-0">Email: ${adminData.email}</p>
											<p class="small text-secondary mb-0">Age: ${adminData.age}</p></div>`);

			// Getting employee's personal info
			const fetchUsers = await fetch(`http://localhost:3000/users/`);
			const usersData = await fetchUsers.json();

			// Getting employee's reports
			const fetchReports = await fetch(`http://localhost:3000/reports/`);
			const reportsData = await fetchReports.json();

			renderReportsForAdmin(usersData, reportsData);
		})();

		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.querySelectorAll(".needs-validation");

		// Loop over them and prevent submission
		Array.prototype.slice.call(forms).forEach(function (form) {
			form.addEventListener(
				"submit",
				function (event) {
					if (!form.checkValidity()) {
						event.preventDefault();
						event.stopPropagation();
					}

					form.classList.add("was-validated");
				},
				false
			);
		});

		$("#recordForm").submit(function (e) {
			e.preventDefault();
			let userName = $(this).find(":text").val();
			recordAttendance(userName);
		});
	} else {
		alert("You are not an admin!");
		window.location.replace("/index.html");
		return;
	}
})();
