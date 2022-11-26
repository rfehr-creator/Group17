// elements that should be displayed and hidden for home screen
function home() {
    hideElements();
    document.getElementById('mainDisplayTable').style.display = "table";
    document.getElementById('gameArea').style.display = "block";

    // Show main table when details page is closed
    document.getElementById('mainDisplayTable').style.visibility = "visible";
    displayRandomGame();
    addLikedGamesToGameDiv();
}

// update back button
function updateBackButton(){
    var len = getHistory().length;
    var backButton = document.getElementsByClassName("backImage");
    for (let i = 0; i < backButton.length; i++) {
        if(len <= 1){
            backButton[i].style.opacity = 0.4;
        }
        else{
            backButton[i].style.opacity = 1;
            //backButton.classList.add('hover');
        }
    }
}

// display liked games in gameDiv
function updateHeart() {
    var heartImg = document.getElementById('likedListImg');
    if (getLikedGames().length > 0) {
        heartImg.src = "https://cdn-icons-png.flaticon.com/128/833/833472.png";
    }
    else {
        heartImg.src = "https://img.icons8.com/neon/512/experimental-hearts-neon.png";
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
            return a.name - b.name;
        });
    }
    return games;
}