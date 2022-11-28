// initial page load
function onPageLoad() {
    hideElements();
    updateTrashCan();
    document.getElementById('mainDisplayTable').style.display = "table";
    document.getElementById('gameArea').style.display = "block";
    var data = defaultGames();
    storeGames(data);
    addLikedGamesToGameDiv();
    updateHeart();

    // add event listener for search box
    var search = document.getElementById("searchBox");
    search.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchGames();
        }
    });

    // back button hover
    var backButtonHover = document.getElementById("backButton");
    backButtonHover.addEventListener("mouseover", function (event) {
        backButtonHover.style = "opacity: .4";
    });

    backButtonHover.addEventListener("mouseleave", function (event) {

        var len = getHistory().length;

        var backButton = document.getElementById("backButton");
        if (len <= 1) {
            backButton.style = "opacity: 0.4";
        }
        else {
            backButton.style = "opacity: 1";
        }
    });

    // hover for trash can
    var trashButton = document.getElementById("trashButton");
    trashButton.addEventListener("mouseover", function (event) {
        trashButton.style = "opacity: .4";
    });

    trashButton.addEventListener("mouseleave", function (event) {

        var len = getDislikedGames().length;

        if (len < 1) {
            trashButton.style = "opacity: 0.4";
        }
        else {
            trashButton.style = "opacity: 1";
        }
    });

    updateBackButton()
    localStorage.setItem('history', null);
    addHistory("home", "");

    localStorage.setItem('ratings', null);
    displayRandomGame();
}

function likedGameClick(event, gameId, clickedX) {
    event.cancelBubble = true;
    event.stopPropagation();
    if (clickedX == true) {
        removeLikedGameFromHome(gameId);
        displayRandomGame();
    } else {
        displayGameDetails(gameId);
    }
}

// game details page
function displayGameDetails(gameId, back) {
    if (back == null || back == false) addHistory("gameDetailsPage", gameId);
    hideElements();

    // hide video
    var video = document.getElementById('videoElement');
    video.hidden = true;

    // game details
    var game = getGame(gameId);
    document.getElementById('gameDetailsPage').style.display = "block";
    document.getElementById('gameDetailsPage').data = gameId;
    document.getElementById('gameDetailsTitle').innerHTML = game.name;
    document.getElementById('gameDetailsName').innerHTML = game.name;
    var price = "$" + game.price;
    if (game.price <= 0) {
        price = "Free";
    }
    document.getElementById('gameDetailsPrice').innerHTML = "Price: " + price;
    document.getElementById('gameDetailsDescription').innerHTML = game.description;

    var galleryContainer = document.getElementById('galleryContainer')
    galleryContainer.innerHTML = "";

    // videos
    var video = document.getElementById('videoElement');
    video.innerHTML = "";

    for (let i = 0; i < game.videos.length; i++) {
        var vid = game.videos[i];
        var par = 200 + i;

        // Gets a thumbnail at 1 second into the video
        galleryContainer.innerHTML = galleryContainer.innerHTML +
            '<button class="gameDetailsGalleryButton">' +
            '<video preload="metadata" class="gameDetailsVideoPreview" onclick="displayVid(' + par + ')">' +
            '<source id="' + par + '" src="' + vid + '#t=10" class="class="gameDetailsGalleryImg" type="video/mp4">' +
            '</video>' +
            '</button>';

        if (i === 0) {
            displayVid(par);
        }
    }

    // pictures
    for (let i = 0; i < game.pictures.length; i++) {
        var pic = game.pictures[i];
        var par = 100 + i;

        galleryContainer.innerHTML = galleryContainer.innerHTML +
            '<button class="gameDetailsGalleryButton">' +
            '<img id="' + par + '" src="' + pic + '"class="gameDetailsGalleryImg" onclick="displayPic(' + par + ')">' +
            '</button>';
    }

    // Adds scrolling via scrollwheel
    document.getElementById('galleryContainer').addEventListener('mousewheel', function (e) {
        this.scrollLeft -= (e.wheelDelta);
        e.preventDefault();
    }, false);

    //tags
    var tagContainer = document.getElementById('tagContainer');
    tagContainer.innerHTML = "";

    game.tags.forEach(tag => {
        tagContainer.innerHTML = tagContainer.innerHTML + '<text class="gameDetailsTagText" onclick="searchGameTag(\'' + tag + '\')">' + tag + '</text>'
    });

    updateHeartGameDetails(gameId);
}

function displayPic(id) {
    var image = document.getElementById('gameDetailsMainImage');
    image.hidden = false;
    image.src = document.getElementById(id).src;

    // hide video
    var video = document.getElementById('videoPlayer');
    video.pause();
    video.innerHTML = "";
    video.hidden = true;
}

function displayVid(id) {
    var video = document.getElementById('videoElement');
    video.hidden = false;
    video.innerHTML = "";
    var videolink = document.getElementById(id).src.substring(0, document.getElementById(id).src.length - 5) + "#t=0.1";

    video.innerHTML =
        '<video id="videoPlayer" width="640" height="360" preload="metadata" controls class="gameDetailsVideo">' +
        '<source id="videoSourceElement" type="video/mp4" src="' + videolink + '">' +
        '</video>';

    // hide image
    var image = document.getElementById('gameDetailsMainImage');
    image.hidden = true;
}

function clickedRandomGame() {
    var id = loadRandomGame()
    displayGameDetails(id.id);
}

function updateHeartGameDetails(id) {
    var heartDetails = document.getElementById('heartPathGameDetails');
    var game = getGame(id);
    if (game.liked) {
        heartDetails.style = "fill: green;";
    } else {
        heartDetails.style = "fill: transparent; stroke: green; stroke-width: 15px";
    }
}

// hide all elements divs on main page
function hideElements() {
    document.getElementById('mainDisplayTable').style.display = "none";
    document.getElementById('searchResults').style.display = "none";
    document.getElementById('cartItems').style.display = "none";
    document.getElementById('LikedListItems').style.display = "none";
    document.getElementById('gameArea').style.display = "none";
    document.getElementById('gameDetailsPage').style.display = "none";
    document.getElementById('DislikedListItems').style.display = "none";
}

function stopVideo() {
    // Stop video on details page
    var videoPlayer = document.getElementById('videoPlayer');
    if (typeof (videoPlayer) != 'undefined' && videoPlayer != null) {
        videoPlayer.pause();
        videoPlayer.innerHTML = "";
        videoPlayer.hidden = true;
    }
}

function backButtonClick() {
    stopVideo();

    var history = getHistory();
    if (history.length > 1) {
        popHistory();
    }

    history = getHistory();
    var hist = history[history.length - 1];

    switch (hist.page) {
        case "searchPage":
            document.getElementById('searchBox').value = hist.id;
            searchGames(true);
            break;

        case "home":
            document.getElementById('searchBox').value = "";
            home(true);
            break;

        case "gameDetailsPage":
            document.getElementById('searchBox').value = "";
            displayGameDetails(hist.id, true);

            break;

        case "likedListPage":
            document.getElementById('searchBox').value = "";
            DisplayLikedList(true);
            break;

        case "dislikedListPage":
            document.getElementById('searchBox').value = "";
            DisplayDislikedList(true);
            break;

        case "cartPage":
            document.getElementById('searchBox').value = "";
            DisplayCartItems(true);
            break;

        default:
            break;
    }
}

function addHistory(page, id) {
    var history = getHistory();

    if (history === null || history.length < 1) {
        history = [{ "page": page, "id": id }];
    } else if (history[history.length - 1].page !== page) {
        history.push({ "page": page, "id": id })
    } else if (history[history.length - 1].id !== id) {
        history.push({ "page": page, "id": id })
    }

    localStorage.setItem('history', JSON.stringify(history));
    updateBackButton();
}

function getHistory() {
    return JSON.parse(localStorage.getItem('history'));
}

function popHistory() {
    var history = getHistory();
    history.pop();
    localStorage.setItem('history', JSON.stringify(history));
    updateBackButton();
}

function searchGames(back) {
    var keyword = document.getElementById('searchBox').value.toLowerCase();
    if (keyword != null && keyword != "") {
        if (back == null || back == false) addHistory("searchPage", keyword);
        hideElements();
        document.getElementById('searchResults').style.display = "block";
        var title = document.getElementById('searchResultsTitle');
        title.innerHTML = "Search Results for " + "'" + keyword + "'"

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

function searchGameTag(keyword, back) {
    document.getElementById('searchBox').value = keyword;
    searchGames();
}

function addSearchResultGame(game, element) {
    var price = "$" + game.price;
    if (game.price <= 0) {
        price = "Free";
    }
    var tags = "";
    game.tags.forEach(tag => {
        tags = tags + '<text class="gameDetailsTagText" onclick="searchGameTag(\'' + tag + '\')">' + tag + '</text>'
    });
    element.innerHTML = element.innerHTML +
        '  <div class="displayItem">' +
        '  <table class="displayItemTable">' +
        '    <tr>' +
        '      <td class="displayItemImgCol">' +
        '<div class="displayItemImgContainer">' +
        '<img class="displayItemImg" src="' + game.displayPicture + '"' + 'onclick="displayGameDetails(' + game.id + ')">' +
        '<div class="gameDetailsMiddle">' +
        '<div class="gameDetailsText" onclick="displayGameDetails(' + game.id + ')">Click for details</div>' +
        '</div>' +
        '</div>' +
        '      </td>' +
        '      <td class="displayItemDescCol">' +
        '        <p class="displayItemDescTitle">' + game.name +
        '          <br><br>' +
        tags +
        '          <text class="displayItemDescText">' + game.description + '</text>' +
        '        </p>' +
        '        <p class="displayItemDescTitle">' + price + '</p>' +
        '      </td>' +
        '      <td class="displayItemButtonCol">' +
        '       <button class="displayItemButton" onclick="addToLikedlist(' + game.id + ')">Add to Liked</button>' +
        '       <br>' +
        '       <br>' +
        '       <button class="displayItemButton" onclick="addToCart(' + game.id + ')">Add to Cart</button>' +
        '      </td>' +
        '    </tr>' +
        '  </table>' +
        '</div>'
}

// elements that should be displayed and hidden for home screen
function home() {
    hideElements();
    document.getElementById('mainDisplayTable').style.display = "table";
    document.getElementById('gameArea').style.display = "block";

    // Show main table when details page is closed
    document.getElementById('mainDisplayTable').style.visibility = "visible";
    displayRandomGame();
    addLikedGamesToGameDiv();
    updateBackButton();

    updateTrashCan();
}

function updateTrashCan() {
    const trash = document.getElementById("trashButton");
    const disliked = getDislikedGames();
    if (disliked.length == 0) {
        trash.style = "opacity: 0.4;";
    } else {
        trash.style = "opacity: 1;";
    }

}

function discoveryButton() {
    stopVideo()
    home();
    localStorage.setItem('history', null);
    addHistory("home", "");
    updateBackButton();

    // clear search box text
    document.getElementById('searchBox').value = "";
}

// update back button
function updateBackButton() {
    var len = getHistory().length;

    var backButton = document.getElementById("backButton");
    if (len <= 1) {
        backButton.style = "opacity: 0.4";
    }
    else {
        backButton.style = "opacity: 1";
    }
}

// display liked games in gameDiv
function updateHeart() {
    var heartImg = document.getElementById('heartPathTopbar');
    if (getLikedGames().length > 0) {
        heartImg.style = "fill: green;";
    }
    else {
        heartImg.style = "fill: transparent; stroke: green; stroke-width: 15px";
    }
}


function sortResults(games, element) {
    var sort = document.getElementById(element);

    if (sort.options[sort.selectedIndex].value === "sortLowestPrice") {
        games.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (sort.options[sort.selectedIndex].value === "sortHighestPrice") {
        games.sort(function (a, b) {
            return b.price - a.price;
        });
    } else {
        games.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }
    return games;
}