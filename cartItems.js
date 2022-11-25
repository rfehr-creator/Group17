function DisplayCartItems(back) {
    document.getElementById('searchBox').value = "";
    if(back == null || back == false) addHistory("cartPage","");
    hideElements();
    document.getElementById('cartItems').style.display = "block";
    

    var cartItems = getGamesInCart();

    if (cartItems.length > 0) {
        sortResults(cartItems, "cartSort");
    }

    for (let index = 0; index < cartItems.length; index++) {
        var container = document.getElementById('cartItemsContainer')
        addGame(cartItems[index],container);
    }
}

function addGame(game,element){
    element.innerHTML = element.innerHTML + "<table class='displayItemTable'><tr><td class='displayItemImgCol'>"+
    "<img class='displayItemImg' src='"+game.displayPicture+"'>"+
      "</td>"+
      "<td class='displayItemDescCol'>"+
      "<p class='displayItemDescTitle'>"+game.name+"</p>"+
      "<p class='displayItemDescText'>$"+game.price+"</p></td> "+
      "<td class='displayItemButtonCol'>"+
      "<button class='displayItemButton'>Remove from cart</button>"+
      "<br><br>"+
      "<button class='displayItemButton'>Add to Liked List</button>"+
      "</td></tr></table><br>"
}