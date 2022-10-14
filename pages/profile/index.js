function profile() {
	const user = JSON.parse(localStorage.getItem("searched-value"));
	
	function header() {
		const header = document.querySelector("header");

		header.innerHTML = `<div class="user-profile">
      <div class="user-image">
        <img src="${user.avatar_url}" alt="">
     </div>
     <div class="user-info">
       <h1>${user.name}</h1>
        <span>${user.bio ?? "Github User"}</span>
     </div>
    </div>

    <ul class="links">
      <li><a class="btn btn-primary" href="${
				user.email ?? user.html_url
			}">Email</a></li>
      <li><a class="btn btn-grey" href="../home/index.html">Trocar de usuário</a></li>
    </ul>`;
	}
	header();

	async function repository() {
		const grid = document.getElementById("repos");

		const response = await fetch(user.repos_url);
		const repos = await response.json();

		repos.forEach((rep) => {
			grid.insertAdjacentHTML(
				"beforeend",
				`
      <li class="card">
      <h2>${rep.name}</h2>
      <p>${rep.description ?? "Repositório"}</p>
      <div class="card-links">
        <a class="btn btn-outline" href="${
					rep.html_url
				}" target="_blank">Repositório</a>
        <a class="btn btn-outline" href="${
					rep.homepage
				}" target="_blank">Demo</a>
      </div>
    </li>`
			);
		});
	}
	repository();
}
profile();
