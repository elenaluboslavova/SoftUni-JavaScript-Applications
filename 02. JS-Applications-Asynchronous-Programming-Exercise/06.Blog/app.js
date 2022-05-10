function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPost);
}

async function loadPosts(event) {
    event.preventDefault();
    let posts = document.getElementById('posts');
    posts.replaceChildren();
    let url = 'http://localhost:3030/jsonstore/blog/posts';
    let response = await fetch(url);
    let data = await response.json();

    for (let key in data) {
        let option = document.createElement('option');
        option.setAttribute('value', key);
        option.textContent = data[key].title;
        posts.appendChild(option);
    }
}

async function viewPost(event) {
    event.preventDefault();
    let post = event.target.parentNode.querySelector('#posts').value;
    let url = `http://localhost:3030/jsonstore/blog/comments/`;
    let response = await fetch(url);
    let list = document.getElementById('post-comments');
    list.replaceChildren();

    let data = await response.json();
    let title;
    let children = event.target.parentNode.querySelector('#posts').childNodes;
    for (let i in children) {
        if(children[i].value == post){
            title = children[i].textContent;
        }
    }

    document.getElementById('post-title').textContent = title;

    for(let key in data){
        if(data[key].postId == post){
            let li = document.createElement('li');
            li.setAttribute('id', data[key].id);
            li.textContent = data[key].text;
            list.appendChild(li);
        }
    }

}

attachEvents();