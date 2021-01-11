window.onload = () => {
    var pos =  navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.Latitude;
        const longitude = position.Longitude;
        return `latitude: ${latitude}; longitude: ${longitude};`
    let places = staticLoadPlaces(latitude,longitude);
    renderPlaces(places);
  }
};

function staticLoadPlaces(latitude,longitude) {


    return [
        {
            name: 'MiaoMiao',
            location: {
                lat: latitude,
                lng: longitude,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', 'assets/miaoglb/Cat_male_animations_exported.glb');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}
