function attachEvents() {
    document.getElementById('submit').addEventListener('click', loadConditions);

    async function loadConditions(event) {
        event.preventDefault();
        let location = document.getElementById('location');
        let forecast = document.getElementById('forecast');
        let currentConditions = document.getElementById('current');
        let upcomingConditions = document.getElementById('upcoming');

        let url = 'http://localhost:3030/jsonstore/forecaster/locations';

        try {
            let response = await fetch(url);
            let data = await response.json();

            let code;

            for (let key in data) {
                if (data[key].name == location.value) {
                    code = data[key].code;
                }
            }

            let todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
            let todayResponse = await fetch(todayUrl);
            let todayData = await todayResponse.json();


            let upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
            let upcomingResponse = await fetch(upcomingUrl);
            let upcomingData = await upcomingResponse.json();

            displayCurrentConditions(todayData);
            displayUpcomingConditions(upcomingData);
        } catch {
            forecast.style.display = '';
            forecast.textContent = "Error";
        }

        function displayCurrentConditions(data) {
            forecast.style.display = '';

            currentConditions.replaceChildren();

            let forecasts = document.createElement('div');
            forecast.className = 'forecasts';

            let symbolSpan = document.createElement('span');
            symbolSpan.className = 'condition symbol';

            let symbol;
            let degrees = '\u00B0';

            switch (data.forecast.condition) {
                case 'Sunny':
                    symbol = '\u2600';
                    break;
                case 'Partly sunny':
                    symbol = '\u26C5';
                    break;
                case 'Overcast':
                    symbol = '\u2601';
                    break;
                case 'Rain':
                    symbol = '\u2614';
                    break;
            }

            symbolSpan.textContent = symbol;

            forecasts.appendChild(symbolSpan);

            let conditionSpan = document.createElement('span');

            let forecastCityName = document.createElement('span');
            forecastCityName.className = 'forecast-data';
            forecastCityName.textContent = data.name;
            conditionSpan.appendChild(forecastCityName);

            let forecastDegrees = document.createElement('span');
            forecastDegrees.className = 'forecast-data';
            forecastDegrees.textContent = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;
            conditionSpan.appendChild(forecastDegrees);

            let forecastCondition = document.createElement('span');
            forecastCondition.className = 'forecast-data';
            forecastCondition.textContent = data.forecast.condition;
            conditionSpan.appendChild(forecastCondition);

            forecasts.appendChild(conditionSpan);
            currentConditions.appendChild(forecasts);

        }

        function displayUpcomingConditions(data) {
            upcomingConditions.replaceChildren();

            for (let key in data.forecast) {
                let currentCondition = data.forecast[key];

                let forecastInfo = document.createElement('div');
                forecastInfo.className = 'forecast-info';

                let upcomingSpan = document.createElement('span');
                upcomingSpan.className = 'upcoming';

                let symbolS = document.createElement('span');
                symbolS.className = 'symbol';

                let symbol;
                let degrees = '\u00B0';

                switch (currentCondition.condition) {
                    case 'Sunny':
                        symbol = '\u2600';
                        break;
                    case 'Partly sunny':
                        symbol = '\u26C5';
                        break;
                    case 'Overcast':
                        symbol = '\u2601';
                        break;
                    case 'Rain':
                        symbol = '\u2614';
                        break;
                }
                symbolS.textContent = symbol;
                upcomingSpan.appendChild(symbolS);

                let span1 = document.createElement('span');
                span1.className = 'forecast-data';
                span1.textContent = `${currentCondition.low}${degrees}/${currentCondition.high}${degrees}`;
                upcomingSpan.appendChild(span1);

                let span2 = document.createElement('span');
                span2.className = 'forecast-data';
                span2.textContent = `${currentCondition.condition}`;
                upcomingSpan.appendChild(span2);
                forecastInfo.appendChild(upcomingSpan);
                upcomingConditions.appendChild(forecastInfo);
            }
        }
    }

}

attachEvents();