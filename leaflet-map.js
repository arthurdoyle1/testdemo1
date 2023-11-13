// Define custom icons for different categories
var iconAdults = L.icon({
    iconUrl: 'https://github.com/arthurdoyle1/testdemo1/blob/main/military%20icon.png?raw=true',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
});

var iconYouth = L.icon({
    iconUrl: 'https://github.com/arthurdoyle1/testdemo1/blob/main/military%20icon.png?raw=true',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var iconSeniors = L.icon({
    iconUrl: 'https://github.com/arthurdoyle1/testdemo1/blob/main/military%20icon.png?raw=true',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var iconMen = L.icon({
    iconUrl: 'https://github.com/arthurdoyle1/testdemo1/blob/main/Handshake.png?raw=true',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var iconWomen = L.icon({
    iconUrl: 'https://github.com/arthurdoyle1/testdemo1/blob/main/Handshake.png?raw=true',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// ...

// For each row in data, create a marker and add it to the map
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
            icon = defaultIcon;
            break;
    }

    var marker = L.marker([row.Latitude, row.Longitude], {
        icon: icon, // Set the custom icon for the marker
        opacity: 1
    }).bindPopup(row.Title);

    // ...
}
