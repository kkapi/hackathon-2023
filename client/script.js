ymaps.ready(init);

function init() {
    // Создание экземпляра карты и его привязка к контейнеру с заданным id ("map").
    let map = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: SPB_CENTER, // Спб
        zoom: 12
    }, {});

    removeControls(map);
}

const coordinatesForm = document.querySelector('#coordinates-form');
const latitudeInput = document.querySelector('#latitude-input');
const longitudeInput = document.querySelector('#longitude-input');
const raiusInput = document.querySelector('#raius-input');

coordinatesForm.addEventListener('submit', formHandler);

function formHandler(event) {
    event.preventDefault();

    const latitudeValue = Number(latitudeInput.value);
    const longitudeValue = Number(longitudeInput.value);
    const raiusValue = Number(raiusInput.value);

    console.log(latitudeValue, longitudeValue, raiusValue)

    console.log(typeof latitudeValue)
}

async function getPoints() {
    console.log('points')

    let JWT = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhU1RaZm42bHpTdURYcUttRkg1SzN5UDFhT0FxUkhTNm9OendMUExaTXhFIn0.eyJleHAiOjE3Nzg0OTc3OTUsImlhdCI6MTY4MzgwMzM5NSwianRpIjoiNjE2MWY2MzEtZTAyMS00OGRmLWJlYmItMzMwNmQ5NGE1NzcwIiwiaXNzIjoiaHR0cHM6Ly9rYy5wZXRlcnNidXJnLnJ1L3JlYWxtcy9lZ3MtYXBpIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjZjNDY2ZWI1LTQ4YzUtNDI5ZC04N2U2LWUxYmIzYTE2MWNiZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLXJlc3QtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6Ijk3OTcxYmQ0LTRiNjgtNDM2Yi1hZjdhLTUwZjFhMDRhOWVlNCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtZWdzLWFwaSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI5Nzk3MWJkNC00YjY4LTQzNmItYWY3YS01MGYxYTA0YTllZTQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiLQmtC40YDQuNC70Lsg0JrQvtC_0YvQu9C-0LIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI3OGU1Y2RiNjFkMzUxMzQ2YjQ1ZDNlNjM4NjczYmRkMSIsImdpdmVuX25hbWUiOiLQmtC40YDQuNC70LsiLCJmYW1pbHlfbmFtZSI6ItCa0L7Qv9GL0LvQvtCyIn0.a3kcttxnVtSkLV7u_9pF396UsQYxRFd4y1x76Jm6pO7sFwU3T1Vbgq0wnyys4XtsHgL1iYaw6O7Vu1npjbLU7u-QP7qF6WNknSr6uNLIPD7LKsmeDtiK9iRMDc_OyVNkTGQKV46sWKaU3pSrt_SG5n6XiRQQMp0B3SRHcjqnIeWX86F2KbOBkdLIj_eJLmUdtSFEd_sFJnDi1ruXTVn_xtCxRG-noro_UBMpplwQejh-1PlC7CWVEx-MwP6Yquk4s05J6f6tvsVj0ZiBgutybta7UNgBkrETtWzG0gSMFjJh_ylYvCDgPmCnxLm0A65v7TNxgnOUpy-LTLFH2jIbmA'

    let test;
    await fetch('https://spb-classif.gate.petersburg.ru/api/v2/datasets/195/versions/latest/data/417/', {
        headers: {
            Authorization: JWT,
        }
    })
        .then(response => response.json())
        .then(json => test = json)

    test = test.results;

    let list = document.createElement('ul');

    let div = document.querySelector('#points')

    div.innerHTML = ''

    list.classList.add("mt-5");

    for (let key in test) {
        let li = document.createElement('li');
        li.innerText = `№: ${test[key].number}\n Широта: ${test[key].coordinates[0]}\n Долгота: ${test[key].coordinates[1]}`
        list.append(li)
    }

    div.append(list)
}


async function getNair() {
    const latitudeValue = Number(latitudeInput.value);
    const longitudeValue = Number(longitudeInput.value);
    const raiusValue = Number(raiusInput.value);

    let test;
    await fetch(`${SERVER_HOST}/getWiFi?lon=${longitudeValue}&lat=${latitudeValue}&radius=${raiusValue}`, {

    })
        .then(response => response.json())
        .then(json => test = json)

    console.log(test)

    let list = document.createElement('ul');

    let div = document.querySelector('#points')

    div.innerHTML = ''

    list.classList.add("mt-5");

    for (let key in test) {
        let li = document.createElement('li');
        li.innerText = `№: ${test[key].number}\n Широта: ${test[key].coordinates[0]}\n Долгота: ${test[key].coordinates[1]}`
        list.append(li)
    }

    div.append(list)

    addPlacemarks([latitudeValue, longitudeValue], test)

}

function removeControls(map) {
    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
}


function addPlacemarks(center, points) {

    let mapDiv = document.querySelector('#map');
    mapDiv.innerHTML = '';

    let map = new ymaps.Map('map', {
        center: center,
        zoom: 16
    });

    let centerPlacemark = new ymaps.Placemark(center, {
        balloonContentHeader: 'Вы находитесь здесь.'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/762/762041.png',
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -15]
    });

    map.geoObjects.add(centerPlacemark);

    for (let point in points) {
        console.log(points[point].coordinates)
        let placemark = new ymaps.Placemark(points[point].coordinates, {
            balloonContentHeader: `${points[point].name_wifi}`,
            balloonContentBody: `Адрес:${points[point].name_wifi}, 
                                Район:${points[point].district}, 
                                Покрытие:${points[point].coverage}м, 
                                Статус:${points[point].status}`            
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/3898/3898607.png',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15]
        });

        map.geoObjects.add(placemark);
    }

    removeControls(map);
}
