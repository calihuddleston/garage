//
async function placeSearch(event){ //gets the users input
    event.preventDefault()
    let searchValue = $("#search-input").val()
    //console.log(searchValue)

    localStorage.setItem('query', searchValue)
    window.location.href = 'search-results.html'
    
    //using geo API to get lng and lat
    var geoQueryUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=AIzaSyCTjDm3etvNz344yfeMwR1zkdT6__kMZeE&`;
    let location=await fetch(geoQueryUrl)
    .then(localtion_data_raw =>{return localtion_data_raw.json()})
    .then(location_data => {
       let lat = location_data.results[0].geometry.location.lat
        let lng = location_data.results[0].geometry.location.lng 
        return{'lat': lat, 'lng': lng}
    })
    console.log(location)

   
}

//WHAT TO GET NAMES AND ADDRESS FROM PINPOINT. W/ NAMES MAKE FUNCTION TO CREATE 4LOOP INPUT EL WITH BNT. AFTER 4LOOP CHANGE VALUE TO NAME AND VALUE 


function nameDisplay(){
    var allData = JSON.parse(localStorage.getItem('data'))
    console.log(allData)
    let placement = $(".parking")
    $(placement).children().each((row, i) =>{
        createMarker(allData[row], i)
        $(i).html(allData[row].name)
        console.log(allData[row].name)
        $(i).on('click', ()=>{getDirections(allData[row].geometry.location)})
    })

}

let creatorsBtn = $('#iconBtn')

creatorsBtn.on('click', () => {
    console.log('you clicked the button!');
    window.location.href = 'map.html'
}) //4loogs and map with address 
//get to the 3rd page when clicked on w/ map directions
function getDirections(finalDestination){
        localStorage.setItem('finalDestination', JSON.stringify(finalDestination))
        window.location.href = 'map.html'
}

function calcRoute(directionsService,directionsRenderer) {
    var start = JSON.parse(localStorage.getItem('start'));
    var end = JSON.parse(localStorage.getItem('finalDestination'));
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }

function directionsMap(){
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        const mapOptions = {
         zoom:15,
        }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);
calcRoute(directionsService,directionsRenderer)
  
}


    
