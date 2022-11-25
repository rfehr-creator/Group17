function searchGames(back) {
    var keyword = document.getElementById('searchBox').value.toLowerCase();
    if (keyword != null && keyword != "") {
        if (back == null || back == false) addHistory("searchPage", keyword);
        hideElements();
        document.getElementById('searchResults').style.display = "block";

        var games = loadGames();
        var searchResults = [];
        for (let index = 0; index < games.length; index++) {
            var game = games[index];

            // add game if name, description or price match
            if (game.name.toLowerCase().includes(keyword) || game.description.toLowerCase().includes(keyword) || game.price == keyword) {
                searchResults.push(game);
            } else {


                // add game if tags match
                for (let tagIndex = 0; tagIndex < game.tags.length; tagIndex++) {
                    const tag = game.tags[tagIndex];

                    if (tag.toLowerCase().includes(keyword)) {
                        searchResults.push(game);
                    }
                }
            }
        }

        if (searchResults.length > 0) {
            searchResults = sortResults(searchResults, "searchSort");
        }

        var container = document.getElementById('SearchResultContainerItems')
        container.innerHTML = "";

        // add search results to table
        for (let index = 0; index < searchResults.length; index++) {
            const game = searchResults[index];

            addSearchResultGame(game, container);
        }
    }
}

function addSearchResultGame(game, element) {
    element.innerHTML = element.innerHTML +
        '  <div class="displayItem">' +
        '  <table class="displayItemTable">' +
        '    <tr>' +
        '      <td class="displayItemImgCol">' +
        '        <img class="displayItemImg"' +
        '          src="' + game.displayPicture + '">' +
        '      </td>' +
        '      <td class="displayItemDescCol">' +
        '        <p class="displayItemDescTitle">' + game.name +
        '          <br>' +
        '          <text class="displayItemDescText">' + game.description + '</text>' +
        '        </p>' +
        '        <p class="displayItemDescTitle">$' + game.price + '</p>' +
        '      </td>' +
        '    </tr>' +
        '  </table>' +
        '</div>' +
        '<br>'
}