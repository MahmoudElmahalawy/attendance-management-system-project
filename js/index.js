import {
	generateRandomUserName,
	generateRandomPassword,
	addNewEmp,
	getIdOfNewEmp,
	addReportId,
	addReportForEmp,
} from "./registration.js";
import { verifyAuthenticityOfEmp, verifyAuthenticityOfAdmin } from "./login.js";

(function () {
	// "use strict";

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

	// Handling Registration Data
	$("#registerForm").submit(function (e) {
		e.preventDefault();
		var isNotComplete = false;
		$(this)
			.find("input")
			.each(function () {
				if (!$(this).val()) {
					isNotComplete = true;
				}
			});

		if (isNotComplete) return;

		let fName = $(this).find(":text:first").val();
		let lName = $(this).find(":text:eq(1)").val();
		let address = $(this).find(":text:eq(2)").val();
		let email = $(this).find("input[type='email']").val();
		let age = parseInt($(this).find("input[type='number']").val());

		let userName = generateRandomUserName(fName);
		let password = generateRandomPassword();

		let empDataObj = {
			fName,
			lName,
			address,
			email,
			age,
			userName,
			password,
			empType: 0,
		};

		(async function () {
			await addNewEmp(empDataObj);
			const id = await getIdOfNewEmp(empDataObj);
			console.log(id);
			await addReportForEmp(id);
			await addReportId(id);
			alert("Data registered, Now login using code and password sent to your email.");
		})();
	});

	// Handling Admin Login Credentials
	$("#adminLoginForm").submit(function (e) {
		e.preventDefault();
		let userName = $(this).find(":text").val();
		let userPassword = $(this).find(":password").val();

		verifyAuthenticityOfAdmin(userName, userPassword);
	});

	// Handling Employees Login Credentials
	$("#loginForm").submit(function (e) {
		e.preventDefault();
		let userName = $(this).find(":text").val();
		let userPassword = $(this).find(":password").val();

		verifyAuthenticityOfEmp(userName, userPassword);
	});
})();
