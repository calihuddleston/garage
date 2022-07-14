/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map;
let service;
let infowindow;

// insert map for second page and gets location
function initMap() {
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
  });
  document.getElementById("map")

  const request = {
    query: localStorage.getItem('query'),
    fields: ["name", "geometry"],
    Referer: 'https://calihuddleston.github.io/park-me/search-results.html'
  };

  // get information to work into the maps
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      map.setCenter(results[0].geometry.location);
      createMarker(results[0])
        localStorage.setItem('start', JSON.stringify(results[0].geometry.location)) //location entered
      const nearbyRequest = {
        location: results[0].geometry.location,
        radius: 500,
        type: ['parking'],
      };
      service.nearbySearch(nearbyRequest, (nresults, nstatus) => {
        if (nstatus == google.maps.places.PlacesServiceStatus.OK) { storeResults(nresults)
            console.log(nresults)
          for (let i = 0; i < nresults.length; i++) {
            //createMarker(nresults[i]); //<GIVES ALL RESULTS
          }
        }
      });
    }
  });
}

//getting data info
function storeResults (nresults){
    console.log('store')
  localStorage.setItem('data', JSON.stringify(nresults))
  console.log('movingon')
  nameDisplay()
}

function createMarker(place, box) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
  });
  $(box).hover(()=>{toggleBounce(marker)})
}
//console.log(localStorage.getItem('query'))

// makes the markers bounce
function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}




