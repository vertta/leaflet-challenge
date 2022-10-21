// create the tile layers for the backgrounds of the maps

var defaultMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//grayScale layer 


var grayScale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});


// WaterColor 

var waterColorScale =  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

// Topography Map 

var topographyMap =  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

//make our base maps 
var baseMaps  = {
    "Default Map": defaultMap,
    "Gray Scale Map": grayScale,
    "Water Color Map": waterColorScale,
    "Topography Map": topographyMap
};

// make a map object
var myMap = L.map ("map",{
    center: [19.8968, 155.5828],
    zoom: 3,
    layers: [grayScale, waterColorScale, topographyMap,defaultMap]

});

// add the default map to our map
defaultMap.addTo(myMap);

// add Layer Control
L.control.layers(baseMaps).addTo(myMap);

// get data for techtonic plates and draw on myMap which was created in the functio up above
//variable to hold techtonic plates layer
var technoicPlate = new L.layterGroup ();
// get the data to call the technic plates which is the information we found in the github link 
d3.json("https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json")
 .then(function(plateData){

	//print data to console to make sure it loads 
	console.log(plateData)
 }) ;


