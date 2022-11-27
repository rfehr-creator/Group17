function DisplayLikedList(back) {
    document.getElementById('searchBox').value = "";
    if (back == null || back == false) addHistory("likedListPage", "");
    hideElements();
    document.getElementById('LikedListItems').style.display = "block";

    var likedItems = getLikedGames();


    if (likedItems.length > 0) {
        sortResults(likedItems, "LikedSort");
    }


    if (likedItems.length == 1) {
        document.getElementById('likedListTitleText').innerHTML = "Liked List (" + likedItems.length + " item)"
    } else {
        document.getElementById('likedListTitleText').innerHTML = "Liked List (" + likedItems.length + " items)"
    }
    var container = document.getElementById('likedlistItemContainer')
    container.innerHTML = "";

    for (let index = 0; index < likedItems.length; index++) {
        var game = likedItems[index];
        addGameLikedList(game, container)
    }
}

function addGameLikedList(game, element) {
    var price = "$"+game.price;
    if (game.price <= 0) {
        price = "Free";
    }
    element.innerHTML = element.innerHTML +
        '<div class="displayItem">' +
            '<table class="displayItemTable">' +
                '<tr>' +
                    '<td class="displayItemImgCol">' +
                        '<div class="displayItemImgContainer">'+
                        '<img class="displayItemImg" src="' + game.displayPicture + '"' + 'onclick="displayGameDetails(' + game.id + ')">' +
                            '<div class="gameDetailsMiddle">'+
                                '<div class="gameDetailsText" onclick="displayGameDetails(' + game.id + ')">Click for details</div>' +
                            '</div>'+
                        '</div>'+
                    '</td>' +
                    '<td class="displayItemDescCol">' +
                        '<p class="displayItemDescTitle">' + game.name +
                            '<br>' +
                            '<text class="displayItemDescText">' + game.description + '</text>' +
                        '</p>' +
                        '<p class="displayItemDescTitle">' + price + '</p>' +
                    '</td>' +
                    '<td class="displayItemButtonCol">' +
                        '<button class="displayItemButton" onclick="removeLikedGame('+ game.id +')">Remove From List</button>' +
                        '<br>' +
                        '<br>' +
                        '<button class="displayItemButton" onclick="addToCart('+game.id+')">Add to Cart</button>' +
                    '</td>' +
                '</tr>' +
            '</table>' +
        '</div>'
}

function DisplayDislikedList(back) {
    if (back == null || back == false) addHistory("dislikedListPage", "");
    hideElements();
    document.getElementById('DislikedListItems').style.display = "block";

    var dislikedItems = getDislikedGames();


    if (dislikedItems.length > 0) {
        sortResults(dislikedItems, "DislikedSort");
    }

    if (dislikedItems.length == 1) {
        document.getElementById('dislikedListTitleText').innerHTML = "Disliked List (" + dislikedItems.length + " item)"
    } else {
        document.getElementById('dislikedListTitleText').innerHTML = "Disliked List (" + dislikedItems.length + " items)"
    }
    var container = document.getElementById('dislikedlistItemContainer')
    container.innerHTML = "";

    for (let index = 0; index < dislikedItems.length; index++) {
        var game = dislikedItems[index];
        addGameDislikedList(game, container)
    }
}

function addGameDislikedList(game, element) {
    var price = "$"+game.price;
    if (game.price <= 0) {
        price = "Free";
    }
    element.innerHTML = element.innerHTML + 
        '<div class="displayItem">' +
            '<table class="displayItemTable">' +
                '<tr>' +
                    '<td class="displayItemImgCol">' +
                        '<div class="displayItemImgContainer">'+
                        '<img class="displayItemImg" src="' + game.displayPicture + '"' + 'onclick="displayGameDetails(' + game.id + ')">' +
                            '<div class="gameDetailsMiddle">'+
                                '<div class="gameDetailsText" onclick="displayGameDetails(' + game.id + ')">Click for details</div>' +
                            '</div>'+
                        '</div>'+
                    '</td>' +
                    '<td class="displayItemDescCol">' +
                        '<p class="displayItemDescTitle">' + game.name +
                            '<br>' +
                            '<text class="displayItemDescText">' + game.description + '</text>' +
                        '</p>' +
                        '<p class="displayItemDescTitle">' + price + '</p>' +
                    '</td>' +
                    '<td class="displayItemButtonCol">' +
                        '<button class="displayItemButton" onclick="removeDislikedGame('+game.id+')">Remove From List</button>' +
                        '<br>' +
                        '<br>' +
                        '<button class="displayItemButton" onclick="addToCart('+game.id+')">Add to Cart</button>' +
                    '</td>' +
                '</tr>' +
            '</table>' +
        '</div>'
}