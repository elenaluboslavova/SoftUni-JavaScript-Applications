async function lockedProfile() {
    let url = 'http://localhost:3030/jsonstore/advanced/profiles';
    let response = await fetch(url);
    let data = await response.json();
    let main = document.querySelector('main');

    console.log(data);
    document.querySelectorAll('div.profile')[0].style.display = 'none';
    document.getElementsByTagName('button')[0].addEventListener('click', showMore);
    let i = 2;

    for(let key in data){
        let profile = document.querySelector('div.profile');
        let newProfile = profile.cloneNode(true);

        newProfile.getElementsByTagName('input')[2].value = data[key].username;
        newProfile.getElementsByTagName('input')[3].value = data[key].email;
        newProfile.getElementsByTagName('input')[4].value = data[key].age;

        newProfile.getElementsByTagName('input')[0].name = `user${i}Locked`;
        newProfile.getElementsByTagName('input')[1].name = `user${i}Locked`;
        newProfile.getElementsByTagName('button')[0].addEventListener('click', showMore);

        newProfile.style.display = '';
        main.appendChild(newProfile);
        i++;
    }

    function showMore(event){
        event.preventDefault();
        let current = event.target.parentNode;
        if(current.getElementsByTagName('input')[1].checked){
            let labels = current.querySelectorAll('.hiddenInfo label');
            labels.forEach(l => l.style.display = 'inline');

            let inputs = current.querySelectorAll('.hiddenInfo input');
            inputs.forEach(i => i.style.display = 'inline');
        }
    }
}