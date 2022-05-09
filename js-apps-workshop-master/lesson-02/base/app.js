async function init(){
    let url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    let response = await fetch(url);
    let data = await response.json();
    let main = document.querySelector('main');
    main.replaceChildren();
    for(let i in data){
        let recipe = data[i];
        let article = document.createElement('article');
        article.className = 'preview';

        let title = document.createElement('div');
        title.className = 'title';

        let h2 = document.createElement('h2');
        h2.textContent = recipe.name;

        title.appendChild(h2);

        let small = document.createElement('div');
        small.className = 'small';

        let img = document.createElement('img');
        img.setAttribute('src', recipe.img);

        small.appendChild(img);

        article.appendChild(title);
        article.appendChild(small);

        article.addEventListener('click', showDetails);

        main.appendChild(article);
    }
}

async function showDetails(event){
    event.preventDefault();

    let title = event.target.querySelector('.title h2').textContent;
    let id = `0${title.substring(title.length - 1)}`;
    let url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;
    let main = document.querySelector('main');
    
    let response = await fetch(url);
    let data = await response.json();
    
    let newArticle = document.createElement('article');

    let h2 = document.createElement('h2');
    h2.textContent = data.name;

    newArticle.appendChild(h2);

    let band = document.createElement('div');
    band.className = 'band';

    let thumb = document.createElement('div');
    thumb.className='thumb';

    let img = document.createElement('img');
    img.setAttribute('src', data.img);

    thumb.appendChild(img);
    band.appendChild(thumb);

    let ingredients = document.createElement('div');
    ingredients.className = 'ingredients';

    let h3 = document.createElement('h3');
    h3.textContent = 'Ingredients:';

    ingredients.appendChild(h3);

    let ul = document.createElement('ul');

    for(let i in data.ingredients){
        let ing = data.ingredients[i];
        let li = document.createElement('li');
        li.textContent = ing;
        ul.appendChild(li);
    }

    ingredients.appendChild(ul);
    band.appendChild(ingredients);

    let desc = document.createElement('div');
    desc.className="description";

    let desch3 = document.createElement('h3');
    desch3.textContent = 'Preparation:';
    desc.appendChild(desch3);

    for(let i in data.steps){
        let step = data.steps[i];
        let p = document.createElement('p');
        p.textContent = step;
        desc.appendChild(p);
    }

    newArticle.appendChild(band);
    newArticle.appendChild(desc);

    main.replaceChild(newArticle, event.target);
}