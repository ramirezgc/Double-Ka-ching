
// Code for configuration of the map

// Set longitude, latitude, and starting zoom
// Map it to the div
// let myMap = L.map("map", {
//     center: [37.09, -100.71],
//     zoom: 4
// });

var countyMap = L.map("map",{
  center:[31.319547, -100.076758],
  zoom: 7
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
}).addTo(countyMap);

//load in Geojson data 

const url = "/api/county";
  d3.json(url).then(function(response) {

    console.log(response);
   
    let features = [{}]
    
    for (let i =0; i < 253; i++) {  
      features.push({
          // "type": "FeatureCollection", 
          // "features": {
              "type": "Feature",
              "geometery": {
                "type": "Point",
                "coordinates": [response.Latitude[i], response.Longitude[i]]
              },        
              "properties": {
                "county": response.County[i],
                "income": response["Median Household Income"][i],
                "population": response.Population[i],
                "poverty": response["Poverty Percent"][i],
                "crime": response.Total_Crime[i],
                "unemployment": response["Unemployment Rate (%)"][i]
              }
          
            })
          }
          
        
        let geoData = {"features": [{features}]}
        console.log(geoData)
        // })
//         // Grab data with d3
// d3.json (geoData, function(data){
//   console.log(data)
// })
// })
//   function style(data){
//     return{

//       fillColor: getColor(data.population),
//       weight: 2,
//       fillOpacity: 0.7
//     }

//   }
  
  function getColor(d){
    return d > 10000000 ? '#800026' :
    d > 2000000  ? '#E31A1C' :
    d > 100000  ? '#FC4E2A' :
    d > 50000  ? '#FD8D3C' :
    d > 20000   ? '#FEB24C' :
    d > 10000  ? '#FED976' :
               '#FFEDA0';
    
    }

     //iterate through the returned data
     for (let i = 1; i < features.length; i++) {
      let location = features[i].geometery;
      let properties = features[i].properties;
      

//   //Binding a pop-up to each layer 
//    function onEachFeature (data, layer) {
//     layer.bindPopup("County: " + data.properties.County + "<br>Population<br>" + data.properties.Population)
// }

      console.log(properties);
      // console.log(location.coordinates[0]);
    
      // console.log(properties);
      
      // Create a circle at each earthquake point
      L.circle([location.coordinates[1], location.coordinates[0]], {
          fillOpacity: 0.95,
          color: "yellow",
          weight: 1,
          fillColor: getColor(properties.population),
          radius: 25000
          // }).bindPopup("<h2>" + properties.county + "</h2> <hr> <h3> " + "Population: " + properties.population)
      }).addTo(countyMap);



   }        

})

//       })
// L.geoJson(geoData).addTo(countyMap);

//var geojson




// geojson = L.choropleth(data, {
//  // Define what  property in the features to use
//   valueProperty: 'Population',
//   //Set color scale
//   scale: ["#fc9272", "#de2d26"],

//   //Number of breaks in step range
//   steps: 10,
//   //q for quantile, e for equidistant, k for k-means
//   mode: "q",
//   border styling
//   style: {
//    color: "#fff",
//     weight: 1,
//     fillOpacity: 0.8
//   }


//   function style(data){
//     return{

//       fillColor: getColor(data.population),
//       weight: 2,
//       fillOpacity: 0.7
//     }

//   }
  
//   function getColor(population){
//     return d > 10000000 ? '#800026' :
//     d > 2000000  ? '#E31A1C' :
//     d > 100000  ? '#FC4E2A' :
//     d > 50000  ? '#FD8D3C' :
//     d > 20000   ? '#FEB24C' :
//     d > 10000  ? '#FED976' :
//                '#FFEDA0';
    
//     }

//      //iterate through the returned data
//      for (let i = 0; i < features.length; i++) {
//       let location = features[i].geometry;
//       let properties = features[i].properties;

//   //Binding a pop-up to each layer 
//    function onEachFeature (data, layer) {
//     layer.bindPopup("County: " + data.properties.County + "<br>Population<br>" + data.properties.Population)
// }

//       console.log(location);
//       console.log(properties);
      
//       //Create a circle at each earthquake point
//       L.circle([location.coordinates[1], location.coordinates[0]], {
//           fillOpacity: 0.95,
//           color: "black",
//           weight: 1,
//           fillColor: getColor(location.coordinates[2]),
//           }).bindPopup("<h2>" + properties.county + "</h2> <hr> <h3> " + "Population: " + properties.population).addTo(countyMap);   




  // //Binding a pop-up to each layer 
  //  function onEachFeature (data, layer) {
  //   layer.bindPopup("County: " + data.properties.County + "<br>Population<br>" + data.properties.Population)
// }



// function style(data){
// return{

//   fillColor: getColor(data.population),
//   weight: 2,
//   fillOpacity: 0.7
// }


// }


// function getColor(data){
// return d > 10000000 ? '#800026' :
// d > 2000000  ? '#E31A1C' :
// d > 100000  ? '#FC4E2A' :
// d > 50000  ? '#FD8D3C' :
// d > 20000   ? '#FEB24C' :
// d > 10000  ? '#FED976' :
//            '#FFEDA0';

// }


// L.geoJson(geoData, {style: style}).addTo(countyMap);

// Set up the legend
// legend = L.control({position: "bottomright"});
// legend.onAdd = function() {
  //let div = L.DomUtil.create("div", "info legend");
  //let limits = geojson.options.limits;
  //let colors = geojson.options.colors;
  //let labels = [];
  // Add min & max
  //var legendInfo = "<h1>Population</h1>" +
    //"<div class=\"labels\">" +
     // "<div class=\"min\">" + limits[0] + "</div>" +
     // "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
   //"</div>";

  //div.innerHTML = legendInfo;

 // limits.forEach(function(limit, index) {
   // labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //});

 // div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //return div;
//};

// Adding legend to the map
// legend.addTo(countyMap);
//})

// function mapOverlay(data){
//   console.log(data)
// }