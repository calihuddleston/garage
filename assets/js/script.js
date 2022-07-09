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
        $(i).html(allData[row].name)
        console.log(allData[row].name)
    })

}

