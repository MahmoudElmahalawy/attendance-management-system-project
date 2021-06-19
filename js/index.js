import {
	generateRandomUserName,
	generateRandomPassword,
	addNewEmp,
	getIdOfNewEmp,
	addReportId,
	addReportForEmp,
} from "./registration.js";

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
					alert("a7a");
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
	$("#adminLoginFormBtn").click(function () {
		let userName = $(this.form).find(":text").val();
		let userPassword = $(this.form).find(":password").val();

		if (userName && userPassword) {
			console.log(userName);
			console.log(userPassword);
		}
	});

	// Handling Employees Login Credentials
	$("#loginFormBtn").click(function () {
		let userName = $(this.form).find(":text").val();
		let userPassword = $(this.form).find(":password").val();

		if (userName && userPassword) {
			console.log(userName);
			console.log(userPassword);
		}
	});
})();
