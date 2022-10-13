function getUser() {
	const getUserForm = document.getElementById("getUserName");
	const formInput = document.getElementById("user");
	const searchButton = document.getElementById("search");
	const errorText = document.querySelector(".error-text");

	let localStorageProfiles = [];

	formInput.addEventListener("input", validateInput);
	getUserForm.addEventListener("submit", getURL);

	function getURL(e) {
		e.preventDefault();

		const userURL = `https://api.github.com/users/${formInput.value}`;

		searchButton.classList.add("loading");

		const response = fetch(userURL)
			.then((r) => {
				return r.json();
			})
			.catch((err) => {
				console.log(err);
				errorText.style.display = "block";
				localStorageProfiles.splice(1);
				localStorage.setItem("users", JSON.stringify(localStorageProfiles));
			});

		localStorageProfiles.push(response);
		localStorage.setItem("users", JSON.stringify(localStorageProfiles));
	}

	function validateInput() {
		if (formInput.value.length > 0) {
			formInput.classList.remove("error");
			searchButton.removeAttribute("disabled");
			errorText.style.display = "none";
		} else {
			searchButton.setAttribute("disabled", "");
			formInput.classList.add("error");
		}
	}
}

getUser();

function recentlySearched() {
	const profilesList = document.getElementById("profilesList");

	const profiles = JSON.parse(localStorage.getItem("users"));

	if (profiles) {
		console.log(profiles);
	}
}
recentlySearched();
