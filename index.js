// initial page load
function onPageLoad() {
    hideElements();
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
    
    updateBackButton()
    localStorage.setItem('history', null);
    addHistory("home", "");
    
    localStorage.setItem('ratings', null);
    displayRandomGame();
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
    var price = "$"+game.price;
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
                '<video preload="metadata" class="gameDetailsVideoPreview" onclick="displayVid(' + par + ')">'+
                    '<source id="' + par + '" src="' + vid + '#t=10" class="class="gameDetailsGalleryImg" type="video/mp4">' +
                '</video>'+
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
    document.getElementById('galleryContainer').addEventListener('mousewheel', function(e) {
        this.scrollLeft -= (e.wheelDelta);
        e.preventDefault();
    }, false);

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
        '<video id="videoPlayer" width="640" height="360" preload="metadata" controls class="gameDetailsVideo">'+
            '<source id="videoSourceElement" type="video/mp4" src="' + videolink + '">'+
        '</video>';

    // hide image
    var image = document.getElementById('gameDetailsMainImage');
    image.hidden = true;
}

function clickedRandomGame() {
    var id = loadRandomGame()
    displayGameDetails(id.id);
}

function updateHeartGameDetails(id){
    var heartDetails = document.getElementById('heartPathGameDetails');
    var game = getGame(id);
    if(game.liked){
        heartDetails.style = "fill: red;";
    } else{
        heartDetails.style = "fill: #282828; stroke: red; stroke-width: 15px";
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

function backButtonClick() {
    // Stop video on details page
    var videoPlayer = document.getElementById('videoPlayer');
    if(typeof(videoPlayer) != 'undefined' && videoPlayer != null){
        videoPlayer.pause();
        videoPlayer.innerHTML = "";
        videoPlayer.hidden = true;
    }

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
