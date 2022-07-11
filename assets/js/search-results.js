function displaySearch() {
    "use strict";

    var displayResult = document.getElementById("displayResult");

    window.open("search.html") //How do I display the result in this page?

    displayResult.style.display = "block";
    displayResult.innerHTML = result;
}

function doSearch() {
    "use strict";

    var searchField = document.getElementById("searchField").value;

    for (var i = 0; i < db.length; i++) {
        if (db[i].artist.toUpperCase() === searchField.toUpperCase()) {
            result = db[i].artist;
        }
    }

    displaySearch();

}

function search() {
    "use strict";

    var searchImput = document.getElementById("searchImput");
    searchImput.addEventListener("click", doSearch, false);
}

window.addEventListener("load", search, false);