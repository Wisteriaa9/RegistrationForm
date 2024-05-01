var map;
var geocoder;

function initMap() {
    
    var initialLatLng = {lat: 30.7641, lng: 76.7774};

    
    map = new google.maps.Map(document.getElementById('google-maps'), {
        zoom: 17,
        center: initialLatLng
    });

    var marker = new google.maps.Marker({
        position: initialLatLng,
        map: map,
        title: 'South Jakarta, INA' // Title Location
    });

    // Initialize Geocoder
    geocoder = new google.maps.Geocoder();
}

function searchLocation() {
    var input = document.getElementById('search-input').value;
    if (input) {
        geocoder.geocode({ 'address': input }, function (results, status) {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
                map.setZoom(17);

                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                handleGeocodingError(status);
            }
        });
    } else {
        alert('Please enter a location.');
    }
}

function handleGeocodingError(status) {
    if (status === 'ZERO_RESULTS') {
        alert('No results found for the given address.');
    } else if (status === 'OVER_QUERY_LIMIT') {
        alert('You have exceeded your daily request quota for the Geocoding API.');
    } else if (status === 'REQUEST_DENIED') {
        alert('Geocoding request denied. Please check your API key or billing status.');
    } else if (status === 'INVALID_REQUEST') {
        alert('Invalid request. Please check the provided address.');
    } else {
        alert('Geocoding error: ' + status);
    }
}
