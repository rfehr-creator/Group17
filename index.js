// initial page load
function onPageLoad() {
    hideElements();
    document.getElementById('mainDisplayTable').style.display = "table";
    document.getElementById('gameArea').style.display = "block";
    var data = defaultGames();
    storeGames(data);
    displayRandomGame();
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
    updateBackButton()
    localStorage.setItem('history', null);
    addHistory("home", "");
}

// game details page
function displayGameDetails(gameId, back) {
    if (back == null || back == false) addHistory("gameDetailsPage", gameId);
    hideElements();
    var game = getGame(gameId);

    document.getElementById('gameDetailsPage').style.display = "block";


    document.getElementById('gameDetailsPage').data = gameId;
    document.getElementById('gameDetailsTitle').innerHTML = game.name;
    document.getElementById('gameDetailsName').innerHTML = game.name;

    document.getElementById('gameDetailsPrice').innerHTML = "Price: " + game.price;
    document.getElementById('gameDetailsDescription').innerHTML = game.description;

    // pictures
    var galleryContainer = document.getElementById('galleryContainer')
    galleryContainer.innerHTML = "";

    for (let i = 0; i < game.pictures.length; i++) {
        var pic = game.pictures[i];
        var par = 100 + i;

        galleryContainer.innerHTML = galleryContainer.innerHTML +
            '<button class="gameDetailsGalleryButton">' +
            '<img id="' + par + '" src="' + pic + '"class="gameDetailsGalleryImg" onclick="displayPic(' + par + ')">' +
            '</button>'
    }

    // videos
    var video = document.getElementById('videoElement');
    video.innerHTML = "";

    for (let i = 0; i < game.videos.length; i++) {
        var vid = game.videos[i];
        var par = 200 + i;

        galleryContainer.innerHTML = galleryContainer.innerHTML +
            '<button class="gameDetailsGalleryButton">' +
            '<img id="' + par + '" src="' + vid + '"class="gameDetailsGalleryImg" onclick="displayVid(' + par + ')">' +
            '</button>'
    }



    //tags
    var tagContainer = document.getElementById('tagContainer');
    tagContainer.innerHTML = "";

    game.tags.forEach(tag => {
        tagContainer.innerHTML = tagContainer.innerHTML + '<text class="gameDetailsTagText">' + tag + '</text>'
    });

    updateHeartGameDetails(gameId);
}

function displayPic(id) {
    var image = document.getElementById('gameDetailsMainImage');
    image.hidden = false;
    image.src = document.getElementById(id).src;

    // hide video
    var video = document.getElementById('videoElement');
    video.pause();
    video.innerHTML = "";
    video.hidden = true;
}

function displayVid(id) {
    alert("vid")
    var video = document.getElementById('videoElement');
    video.hidden = false;
    video.innerHTML = "";
    video.innerHTML = '<source id="videoSourceElement" type="video/mp4" src="' +
        document.getElementById(id).src + '">';

    // var source = document.getElementById('videoSourceElement');
    // source.src = "";
    // source.src = document.getElementById(id).src;

    // hide image
    var image = document.getElementById('gameDetailsMainImage');
    image.hidden = true;
}

function clickedRandomGame() {
    var id = loadRandomGame()
    displayGameDetails(id.id);
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

function backButtonClick() {

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
