ymaps.ready(init);

function init() {
    let map = new ymaps.Map('map', {
        center: SPB_CENTER, // SPB_CENTER
        zoom: 12,
        controls: []
    }, {});
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
        .then(json => closestPoint = json);

    console.log(closestPoint.coordinates);

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

function appendPoints(points) {
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

function addPlacemarks(center, points) {
    let mapDiv = document.querySelector('#map');
    mapDiv.innerHTML = '';

    let map = new ymaps.Map('map', {
        center: center,
        zoom: 16,
        controls: []
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
            balloonContentBody: `Адрес: ${points[point].address}, 
                                Район: ${points[point].district}, 
                                Покрытие: ${points[point].coverage}м, 
                                Статус: ${points[point].status}`,
            balloonContentFooter: `<button onclick="buildRoute(${points[point].coordinates[0]},
                                    ${points[point].coordinates[1]},
                                    ${center[0]},
                                    ${center[1]})">
                                    Построить маршрут до точки
                                </button>`
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/3898/3898607.png',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15]
        });

        map.geoObjects.add(placemark);
    }
}

function buildRoute(latitudeB, longitudeB, latitudeA, longitudeA) {
    console.log(latitudeA, longitudeA, latitudeB, longitudeB)
    console.log(typeof(latitudeA), typeof(longitudeA), typeof(latitudeB), typeof(longitudeB))

    let pointA = [latitudeA, longitudeA]
    let pointB = [latitudeB, longitudeB]

    let mapDiv = document.querySelector('#map');
    mapDiv.innerHTML = '';

    let map = new ymaps.Map('map', {
        center: pointA,
        zoom: 16,
        controls: []
    });

    let multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
            pointA,
            pointB
        ],
        params: {
            routingMode: 'pedestrian'
        }
    }, {
        boundsAutoApply: true
    });

    map.geoObjects.add(multiRoute);
}

const radio = document.querySelector('#radio')
const submitButton = document.querySelector('#submit-btn')

radio.addEventListener('change', function () {
    if (this.checked) {
        radiusInput.disabled = false;
        // radiusInput.value = '';
        submitButton.innerText = 'Найти все Wi-Fi точки в радиусе';
    } else {
        radiusInput.disabled = true;
        // radiusInput.value = '';
        submitButton.innerText = 'Найти ближашую Wi-Fi точку';
    }
});