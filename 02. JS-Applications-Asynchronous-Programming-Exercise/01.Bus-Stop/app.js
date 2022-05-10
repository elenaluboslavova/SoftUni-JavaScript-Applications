async function getInfo() {
    let id = document.getElementById('stopId').value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;
    let stopname = document.getElementById('stopName');
    let list = document.getElementById('buses');

    try {
        list.replaceChildren();
        stopname.textContent = "Loading...";
        
        let response = await fetch(url);

        if(response.status != 200){
            throw new Error();
        }

        let data = await response.json();
        
        stopname.textContent = data.name;

        for(let key in data.buses){
            let li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`;
            list.appendChild(li);
        }
    } catch {
        stopname.textContent = "Error";
        list.replaceChildren();
    }
}