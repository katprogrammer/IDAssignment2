var map, infowindow;
function createMap() {
    var options = {
        center: {lat: 1.290270, lng: 103.851959},
        zoom: 10,
    };
    map = new google.maps.Map(document.getElementById('map'), options);
    infowindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (p) {
            var position = {
                lat: p.coords.latitude,
                lng: p.coords.longitude
            };
            infowindow.setPosition(position);
            infowindow.setContent('Your Location!');
            infowindow.open(map);s
        }, function() {
            handleLocationError('Geolocation failed', map.center());
        })

    } else {
        handleLocationError('No geolocation available', map.center());

    }
}

function handleLocationError(content, position) {
    infowindow.setPosition(position);
    infowindow.setContent(content);
    infowindow.open(map);
}


  