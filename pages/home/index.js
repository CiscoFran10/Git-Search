function getUser() {
	const form = document.getElementById("getUserName");
	const formInput = document.getElementById("user");
	const searchButton = document.getElementById("search");
	const errorText = document.querySelector(".error-text");

	if (formInput && searchButton) {
		formInput.addEventListener("input", validateInput);
		form.addEventListener("submit", getURL);

		async function getURL(e) {
			e.preventDefault();

			try {
				searchButton.classList.add("loading");
				const response = await fetch(
					`https://api.github.com/users/${formInput.value}`
				);

				if (response.ok) {
					const githubUser = await response.json();

					if (githubUser) {
						setLocalStorage(githubUser);
						localStorage.setItem("searched-value", JSON.stringify(githubUser));
						window.location.href = "../../pages/profile/index.html";
					}
				} else {
					errorText.style.display = "block";
				}
			} finally {
				searchButton.classList.remove("loading");
			}
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
}

getUser();

function setLocalStorage(user) {
	const usersArray = JSON.parse(localStorage.getItem("users")) || [];

	if (!usersArray.find((item) => item.login === user.login)) {
		usersArray.push(user);
		localStorage.setItem("users", JSON.stringify(usersArray));
	}
}

function recentlySearched() {
	const profilesList = document.getElementById("profilesList");
	const profiles = JSON.parse(localStorage.getItem("users")).splice(-3);

	profiles.forEach((item) => {
		profilesList.insertAdjacentHTML(
			"beforeend",
			`
		<li class="list-item">
      <img src="${item.avatar_url}" alt="">
      <a href="../profile/index.html" id="${item.login}">Acessar este perfil</a>
    </li>`
		);
	});

	const profilesLink = profilesList.querySelectorAll(".list-item img");

	profilesLink.forEach((link) => {
		link.addEventListener("mouseover", (e) => {
			const user = profiles.find(
				(item) => item.login === e.target.nextElementSibling.getAttribute("id")
			);

			localStorage.setItem("searched-value", JSON.stringify(user));
		});

		link.addEventListener("mouseover", handleHover);

		function handleHover(e) {
			profilesLink.forEach((link) => {
				link.parentElement.classList.remove("hover");
			});
			e.target.parentElement.classList.add("hover");
		}
	});
}
recentlySearched();
