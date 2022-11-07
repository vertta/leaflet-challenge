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


// WaterColor map

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

//make our base maps , last map in the list will always be the default, so best to list the default as last
var baseMaps  = {

    
    "Gray Scale Map": grayScale
    ,"Water Color Map": waterColorScale
    ,"Topography Map": topographyMap
	, default: defaultMap
};

// make a map object
var myMap = L.map ("map",{
    center: [34.0522, 118.2437], //corrdinates for Los Angeles
    zoom: 3,
    layers: [grayScale, waterColorScale, topographyMap,defaultMap]

});


// get data for techtonic plates and draw on myMap which was created in the functio up above

var technoicPlate = new L.layerGroup(); //variable to hold techtonic plates layer

// get the data to call the technic plates which is the information we found in the github link 
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
 .then(function(plateData){

	//print data to console to make sure it loads only used for troubleshooting
	//console.log(plateData);

	 //load data via geoJson and add the tectonic plates layer to the group
	 L.geoJson(plateData,{
		// add colors to make the lines visible 
		color: "blue",
		weight: 2
	}).addTo(technoicPlate);
 });

//----------------------------------------------
 //create information for the overlay for earthquakes

var earthquakes = new L.layerGroup();
 
 //get data for earthquake and populate layer group 
// call USGS GeoJson API

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
   .then (function(earthquakeData){
	//console.log(earthquakeData) for troubleshooting


	// plot radius where circles are dependent on magnitutude
	// and the color is dependent on the depth 

	// Create function that will choose the color of the data point
	function chooseColor (depth) {
		if (depth > 90 ) 
			return "red";
		else if (depth > 70)
		   return "#ff5349";
		else if (depth > 50)
			return "#FFA500";
		else if (depth < 30)
			return "#FFFF00";
		else if (depth < 10)
			return "#9ACD32";
		else
			return "green";
		}
//-------------------------------------------------------------------

		//function to that determines the size of the radius 
		function radiusSize (mag){
			if (mag == 0 )
				return 1;  // make sure that if magnitude is 0 it will still show up on the map 
			else 
				return mag * 5; // make the circle stand out in the map

		}
//---------------------------------------------------------------

		// add the style for each data point 
		function dataStyle(feature){
			return {
				opacity: 0.5 ,
				fillOpacity : 0.5,
				fillColor : chooseColor(feature.geometry.coordinates[2]),  // index 2 represents depth
				color : "0000000",
				radius : radiusSize(feature.properties.mag), //location of data for magnitude
				weight: 0.5,
				stroke : true
			}
		}

		// add Geo JSON data
		L.geoJson(earthquakeData,{	

			// make each feature a marker that is on the map , each marker is a crcle 
			pointToLayer: function(feature,latLng){
				return L.circleMarker(latLng);
			},
			// setup style for each marker
			style: dataStyle,	 // call the style function 
			// add pop ups 
			onEachFeature: function(feature, layer){
                layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                                Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                                Location: <b>${feature.properties.place}</b>`);
            }
		}).addTo(earthquakes);			
		
   });

   
   //-------------------------------------------------------
   

 var overlays = {
	"Technoic Plates": technoicPlate,
	"Earthquake Data": earthquakes
 };


 //----------------------------------------------------------
var legend = L.control({
    position: "bottomright"
});

// Add legend properties
legend.onAdd = function(){
    // To make legend appear on page
    let div = L.DomUtil.create("div", "info legend");

    // Interval setup
    var intervals = [-10, 10, 30, 50, 70, 90];

    // Set colors for intervals
    var colors = [
        "green",
        "#cafc03",
        "#fcad03",
        "#fc8403",
        "#fc4903",
        "red"
    ];

    // Loop through intervals and colors to generate a label
    // with colored square for each interval
    for(var i = 0; i < intervals.length; i++){
        div.innerHTML += "<i style='background: "
            + colors[i]
            + "'></i> "
            + intervals[i]
            + (intervals[i + 1] ? "km - " + intervals[i + 1] + "km<br>" : "+");
    }

    return div;

};		
//---------------------------------------------
// call all functions

defaultMap.addTo(myMap); // add the default layer
earthquakes.addTo(myMap); // add earthquake layer to map
technoicPlate.addTo(myMap); //add the techtonic plates to map
legend.addTo(myMap); // Add legend to map
L.control.layers(baseMaps, overlays).addTo(myMap); // add Layer Control