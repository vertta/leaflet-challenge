# Challenge 15 Visualizing Data Leaflet 

## Background

In our assignment, we were asked to think about how to visual data in this hypothetical situation.
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.
## Scripting

This project we were asked to do the following:
* Use both **HTML** and **JavaScript**
* Part 1: Create the Earthquake Visualization 
* Part 2: Gather and Plot More Data 

### Part 1: Create the Earthquake Visualization

![2-BasicMap](Images/2-BasicMap.png)

1. Visualize an earthquake dataset. from
   * The USGS provides earthquake data in a number of different formats, updated every five minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a dataset to visualize. The following image is an example screenshot of what appears when you visit this link:
I used the following link to get all earthquake data for 7 dayls
   ![3-Data](Images/3-Data.png)

    * When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:

   ![4-JSON](Images/4-JSON.png)

2. Import and visualize the data by doing the following: 

   * Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

       *  The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
       * Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth  appear darker in color.
       * The depth of the earth is found in the third coordinate for each earthquake.

   *  When clicking each circle, a pop up provides additional information about the earthquake for each associated marker

   * A lengend is also created to  provide context for the map data.

  
- - -

### Part 2: Gather and Plot More Data (Optional)

1. The plot of the  dataset on the  map to illustrate the relationship between tectonic plates and seismic activity. 
    *Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

The following image is an example screenshot of what the USGS would like you to produce:

![5-Advanced](Images/5-Advanced.png)

Additional tasks that were performed:

* Plot the tectonic plates dataset on the map in addition to the earthquakes.

* Add other base maps to choose from.

* Put each dataset into separate overlays that can be turned on and off independently.

* Add layer controls to our map.
