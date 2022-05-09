async function loadCommits() {
    let list = document.getElementById('commits');
	let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;

	let url = `https://api.github.com/repos/${username}/${repo}/commits`;

	try{
		let response = await fetch(url);

		if(response.ok == false){
			throw new Error(`Error ${response.status} (Not Found)`);
		}

		let data = await response.json();
		
		list.replaceChildren();

        console.log(data);
		for(let commit of data){
			let li = document.createElement('li');
			
            li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
			list.appendChild(li);
		}
	} catch(error){
		list.replaceChildren();
        let li = document.createElement('li');
        li.textContent = error.message;
		list.appendChild(li);
	}
}