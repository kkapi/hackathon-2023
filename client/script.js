ymaps.ready(init);

function init() {
    let map = new ymaps.Map('map', {
        center: SPB_CENTER, // SPB_CENTER
        zoom: 12,
    }, {});

    removeControls(map);
}

const coordinatesForm = document.querySelector('#coordinates-form');
const latitudeInput = document.querySelector('#latitude-input');
const longitudeInput = document.querySelector('#longitude-input');
const radiusInput = document.querySelector('#raius-input');

coordinatesForm.addEventListener('submit', formHandler);

function formHandler(event) {
    event.preventDefault();

    if (radio.checked) {
        getAreaPoint();      
    } else {
        getClosestPoint();
    }
}

async function getClosestPoint() {
    const latitudeValue = Number(latitudeInput.value);
    const longitudeValue = Number(longitudeInput.value);

    let closestPoint;

    await fetch(`${SERVER_HOST}/getWiFiNear?lon=${longitudeValue}&lat=${latitudeValue}`, {})
        .then(response => response.json())
        .then(json => closestPoint = json)

    addPlacemarks([latitudeValue, longitudeValue], [closestPoint])
}

async function getAreaPoint() {
    const latitudeValue = Number(latitudeInput.value);
    const longitudeValue = Number(longitudeInput.value);
    const radiusValue = Number(radiusInput.value);

    let points;

    await fetch(`${SERVER_HOST}/getWiFi?lon=${longitudeValue}&lat=${latitudeValue}&radius=${radiusValue}`, {

    })
        .then(response => response.json())
        .then(json => points = json)

    // appendPoints(points)
    
    addPlacemarks([latitudeValue, longitudeValue], points)
}

function appendPoints (points) {
    let list = document.createElement('ul');

    let div = document.querySelector('#points')

    div.innerHTML = ''

    list.classList.add("mt-5");

    for (let key in points) {
        let li = document.createElement('li');
        li.innerText = `№: ${points[key].number}\n Широта: ${points[key].coordinates[0]}\n Долгота: ${points[key].coordinates[1]}`
        list.append(li)
    }

    div.append(list)
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
        let placemark = new ymaps.Placemark(points[point].coordinates, {
            balloonContentHeader: `${points[point].name_wifi}`,
            balloonContentBody: `Адресc:${points[point].address}, 
                                Район:${points[point].district}, 
                                Покрытие:${points[point].coverage}м, 
                                Статус:${points[point].status}`,
            balloonContentFooter: `<button onclick="test(${points[point].coordinates[0]},
                                                         ${points[point].coordinates[1]},
                                                         ${center[0]},
                                                         ${center[1]})">
                                        Кнопка
                                    </button>`        
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

function test(a,b,c,d) {
    console.log(a,b,c,d)
}

const radio = document.querySelector('#radio')
const submitButton = document.querySelector('#submit-btn')

radio.addEventListener('change', function() {
    if (this.checked) {      
      radiusInput.disabled = false;
      radiusInput.value = '';
      submitButton.innerText = 'Найти все Wi-Fi точки в радиусе';
    } else {
      radiusInput.disabled = true;
      radiusInput.value = '';
      submitButton.innerText = 'Найти ближашую Wi-Fi точку';
    }
  });