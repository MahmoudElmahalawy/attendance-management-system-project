// Checking if username and password entered exist in database
async function checkEmpCreds(userName, userPassword) {
	if (!(userName && userPassword)) return;
	const fetchGetRes = await fetch(`http://localhost:3000/users?userName=${userName}`);
	const data = await fetchGetRes.json();
	let isAuthed = true;

	console.log(data[0]);

	if (!data[0]) return (isAuthed = false);
	if (userPassword != data[0].password) return (isAuthed = false);
	return { isAuthed, empType: data[0].empType, id: data[0].id };
}

function verifyAuthenticityOfAdmin(userName, userPassword) {
	if (!(userName && userPassword)) return;
	(async function () {
		const { isAuthed, id, empType } = await checkEmpCreds(userName, userPassword);
		if (!isAuthed) {
			alert("Username and/or password is incorrect, Please try again.");
			$("#adminLoginForm").trigger("reset");
		} else if (!empType) {
			alert("You're not allowed to enter admin panel, Use normal login to view profile.");
			$("#adminLoginForm").trigger("reset");
		} else {
			sessionStorage.setItem("empLoginId", id);
			window.location.replace("/admin-panel.html");
		}
	})();
}

// Alerting user of incorrect credentials and redirecting to profile page
function verifyAuthenticityOfEmp(userName, userPassword) {
	if (!(userName && userPassword)) return;
	(async function () {
		const { isAuthed, id } = await checkEmpCreds(userName, userPassword);
		if (!isAuthed) {
			alert("Username and/or password is incorrect, Please try again.");
			$("#loginForm").trigger("reset");
		} else {
			sessionStorage.setItem("empLoginId", id);
			window.location.replace("/profile.html");
		}
	})();
}

export { verifyAuthenticityOfEmp, verifyAuthenticityOfAdmin };
