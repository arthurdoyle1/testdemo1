<!DOCTYPE html>
<html>

<head>
    <title>leaflet-map-csv</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">

    <!-- Load Leaflet code library - see updates at http://leafletjs.com/download.html -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

    <!-- Load jQuery and PapaParse to read data from a CSV file -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js"></script>

    <!-- Position the map with Cascading Style Sheet (CSS) -->
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 100%;
            left: 0;
            width: 100%;
        }
    </style>

</head>

<body>

    <!-- Insert HTML division tag to layout the map -->
    <div id="map"></div>

    <!-- Insert Javascript (.js) code to create the map -->
    <script>
        // Set up initial map center and zoom level
        var map = L.map('map', {
            center: [41.57, -72.69], // EDIT latitude, longitude to re-center map
            zoom: 9, // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
            scrollWheelZoom: false,
            tap: false
        });

        /* Control panel to display map layers */
        var controlLayers = L.control.layers(null, null, {
            position: "topright",
            collapsed: false
        }).addTo(map);

        // display Carto basemap tiles with light features and labels
        var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
        }).addTo(map); // EDIT - insert or remove ".addTo(map)" before the last semicolon to display by default
        controlLayers.addBaseLayer(light, 'Carto Light basemap');

        /* Stamen colored terrain basemap tiles with labels */
        var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }); // EDIT - insert or remove ".addTo(map)" before the last semicolon to display by default
        controlLayers.addBaseLayer(terrain, 'Stamen Terrain basemap');

        // Define custom icons for different categories
        var iconAdults = L.icon({
            iconUrl: 'https://github.com/arthurdoyle1/testdemo1/raw/main/military%20icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        var iconYouth = L.icon({
            iconUrl: 'https://github.com/arthurdoyle1/testdemo1/raw/main/military%20icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        var iconSeniors = L.icon({
            iconUrl: 'https://github.com/arthurdoyle1/testdemo1/raw/main/military%20icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        var iconMen = L.icon({
            iconUrl: 'https://github.com/arthurdoyle1/testdemo1/raw/main/Handshake.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        var iconWomen = L.icon({
            iconUrl: 'https://github.com/arthurdoyle1/testdemo1/raw/main/Handshake.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        // Create an object to store layers by category
        var categoryLayers = {};
        var myMarkers = L.featureGroup().addTo(map);

        // Read markers data from data.csv
        $.get('./data.csv', function (csvString) {

            // Use PapaParse to convert string to array of objects
            var data = Papa.parse(csvString, {
                header: true,
                dynamicTyping: true
            }).data;

            // For each row in data, create a marker and add it to the map
            // For each row, columns `Latitude`, `Longitude`, `Title`, and `Category` are required
            for (var i in data) {
                var row = data[i];

                // Choose the appropriate icon based on the category
                var icon;
                switch (row.Category) {
                    case 'adults':
                        icon = iconAdults;
                        break;
                    case 'youth':
                        icon = iconYouth;
                        break;
                    case 'seniors':
                        icon = iconSeniors;
                        break;
                    case 'men':
                        icon = iconMen;
                        break;
                    case 'women':
                        icon = iconWomen;
                        break;
                    default:
                        // You can provide a default icon if needed
                        icon = L.icon(); // Replace with your default icon
                        break;
                }

                var marker = L.marker([row.Latitude, row.Longitude], {
                    icon: icon, // Set the custom icon for the marker
                    opacity: 1
                }).bindPopup(row.Title);

                // Check if the category layer exists, if not, create it
                if (!categoryLayers[row.Category]) {
                    categoryLayers[row.Category] = L.layerGroup().addTo(map);
                    controlLayers.addOverlay(categoryLayers[row.Category], row.Category);
                }

                // Add the marker to the corresponding category layer
                marker.addTo(categoryLayers[row.Category]);
            }
        });

        map.attributionControl.setPrefix(
            'View <a href="https://github.com/HandsOnDataViz/leaflet-map-csv" target="_blank">code on GitHub</a>'
        );

        btnForm.onclick = () => filter();

        function filter() {
            myMarkers.clearLayers();
            let myJSONcopy = JSON.parse(JSON.stringify(myJSON));
            let categories = [];
            if (cbAdults.checked) {
                categories.push('adults');
            }
            if (cbYouth.checked) {
                categories.push('youth');
            }
            if (cbSeniors.checked) {
                categories.push('seniors')
            }
            if (cbMen.checked) {
                categories.push('men');
            }
            if (cbWomen.checked) {
                categories.push('women');
            }
            for (let i = 0; i < myJSONcopy.length; i++) {
                for (let j = 0; j < categories.length; j++) {
                    for (let k = 0; k < myJSONcopy[i].demographic.length; k++)
                        if (categories[j] == myJSONcopy[i].demographic[k] && !myJSONcopy[i].added) {
                            L.circleMarker([myJSONcopy[i].lat, myJSONcopy[i].lon]).addTo(myMarkers);
                            myJSONcopy[i].added = true;
                            break;
                        }
                }
            }
        }
    </script>
</body>

</html>
