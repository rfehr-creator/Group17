function searchGames() {
    hideElements();
    document.getElementById('searchResults').style.display = "block";

    var games = loadGames();
    var keyword = document.getElementById('searchBox').value.toLowerCase();

    var searchResults = [];
    for (let index = 0; index < games.length; index++) {
        var game = games[index];
        if (game.name.toLowerCase().includes(keyword) || game.description.toLowerCase().includes(keyword) || game.price == keyword) {
            searchResults.push(game);
        }
    }

    if (searchResults.length > 0) {
        searchResults = sortResults(searchResults, "searchSort");
    }


    // clear search results table
    clearTable("searchResultTable");

    var table = document.getElementById('searchResultTable');

    // add heading
    var headRow = table.insertRow(0);
    headRow.insertCell(0).outerHTML = "<th>Name</th>";
    headRow.insertCell(1).outerHTML = "<th>Description</th>";
    headRow.insertCell(2).outerHTML = "<th>Price</th>";

    // add search results to table
    for (let index = 0; index < searchResults.length; index++) {
        const game = searchResults[index];

        // add new row to end of table
        var row = table.insertRow(table.rows.length);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = game.name;
        cell2.innerHTML = game.description;
        cell3.innerHTML = game.price;
    }
}