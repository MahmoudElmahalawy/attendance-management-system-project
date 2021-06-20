// Checking if username and password entered exist in database
async function checkEmpCreds(userName, userPassword) {
	if (!(userName && userPassword)) return;
	const fetchGetRes = await fetch(`http://localhost:3000/users?userName=${userName}`);
	const data = await fetchGetRes.json();
	let isAuthed = true;

	console.log(data[0]);

	if (!data[0]) return (isAuthed = false);
	if (userPassword != data[0].password) return (isAuthed = false);
	return { isAuthed, id: data[0].id };
}

// Alerting user of incorrect credentials and redirecting to profile page
function verifyAuthenticity(userName, userPassword) {
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

export { verifyAuthenticity };
