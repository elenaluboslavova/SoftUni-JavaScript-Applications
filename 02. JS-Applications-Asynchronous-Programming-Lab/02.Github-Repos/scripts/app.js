async function loadRepos() {
	let list = document.getElementById('repos');
	let username = document.getElementById('username').value;

	let url = `https://api.github.com/users/${username}/repos`;

	try{
		let response = await fetch(url);

		if(response.ok == false){
			throw new Error(`${response.status} ${response.statusText}`);
		}

		let data = await response.json();
		
		list.replaceChildren();
		for(let repo of data){
			let li = document.createElement('li');
			
		
			let a = document.createElement('a');
			a.setAttribute('href', repo.html_url);
			a.textContent = repo.full_name;
			li.appendChild(a);
			list.appendChild(li);
		}
	} catch(error){
		list.replaceChildren();
		list.textContent = error.message;
	}
}