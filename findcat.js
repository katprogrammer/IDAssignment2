var map, infowindow;
function createMap() {
    var options = {
        center: {lat: 1.290270, lng: 103.851959},
        zoom: 10,
    };
    map = new google.maps.Map(document.getElementById('map'), options);
    var input = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(input);
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.lenth === 0)
        return;
        markers.forEach(function (m) {m.setMap(null) });
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(p) {
            if (!p.geometry)
                return;

            markers.push(new google.maps.Marker ({
                map: map,
                title: p.name,
                position: p.geometry.location
            }));

            if (p.geometry.viewport)
                bounds.union(p.geometry.viewport);
            else
                bounds.extend(p.geometry.location);
        });
        maps.fitBounds(bounds);
    });
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


  