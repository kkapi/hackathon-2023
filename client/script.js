ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    let map = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [59.94892727754434,30.318982137709053], // Спб
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });

    let placemark = new ymaps.Placemark([59.94892727754434,30.318982137709053], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/3178/3178117.png',
        // iconImageHref: 'https://cdn-icons-png.flaticon.com/512/7902/7902219.png',
        // iconImageHref: 'https://cdn-icons-png.flaticon.com/512/63/63845.png',
        // iconImageHref: 'https://cdn-icons-png.flaticon.com/512/3178/3178257.png',
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -15]
    })

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    map.geoObjects.add(placemark);
}