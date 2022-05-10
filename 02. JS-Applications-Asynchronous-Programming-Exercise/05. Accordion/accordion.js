async function solution() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const data = await response.json();
    let main = document.getElementById('main');

    for (let key in data) {
        let accordion = document.createElement('div');
        accordion.className = 'accordion';

        let head = document.createElement('div');
        head.className = 'head';

        let title = document.createElement('span');
        title.textContent = data[key].title;
        head.appendChild(title);

        let button = document.createElement('button');
        button.className = 'button';
        button.setAttribute('id', data[key]._id);
        button.textContent = 'More';
        button.addEventListener('click', showMore);
        head.appendChild(button);
        accordion.appendChild(head);

        let extra = document.createElement('div');
        extra.className = 'extra';

        let p = document.createElement('p');

        let detailsUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${data[key]._id}`;
        let detailsResponse = await fetch(detailsUrl);
        let detailsData = await detailsResponse.json();
        
        p.textContent = detailsData.content;
        extra.appendChild(p);
        accordion.appendChild(extra);

        main.appendChild(accordion);
    }

    function showMore(event){
        event.preventDefault();
        let parent = event.target.parentNode.parentNode;
        parent.querySelector('.extra').style.display = parent.querySelector('.extra').style.display == 'inline' ? 'none' : 'inline';
        event.target.textContent = event.target.textContent == 'More' ? 'Less' : 'More';
    }
}