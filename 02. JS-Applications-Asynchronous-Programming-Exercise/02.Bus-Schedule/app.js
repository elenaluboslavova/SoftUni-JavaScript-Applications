function solve() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let busStop = document.querySelector('#info .info');

    let current = {
        name: '',
        next: 'depot'
    };

    async function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;

        let url = `http://localhost:3030/jsonstore/bus/schedule/${current.next}`;
        let response = await fetch(url);
        let data = await response.json();

        current = data;

        busStop.textContent = 'Next stop ' + current.name;
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;

        busStop.textContent = 'Arriving at ' + current.name;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();