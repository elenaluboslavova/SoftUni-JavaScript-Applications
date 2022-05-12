window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);
});

async function onRegister(event) {
    event.preventDefault();
    const form = document.querySelector('form');

    let data = new FormData(event.target);
    let email = data.get('email').trim();
    let password = data.get('password').trim();
    let rePass = data.get('rePass').trim();

    if (password !== rePass) {
        alert('Passwords must match!');
        form.reset();
        return;
    }
    let url = 'http://localhost:3030/users/register';

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rePass })
        });

        if(response.ok != true){
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        const token = data.accessToken;

        localStorage.setItem('token', token);

        window.location = './index.html';

    } catch (error) {
        alert(error.message);
    }
}