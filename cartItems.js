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
    element.innerHTML = element.innerHTML + "<table class='cartTable'><tr><td class='cartImageCol'>"+
    "<img class='cartImage' src='"+game.displayPicture+"'>"+
      "</td>"+
      "<td class='cartPriceCol'>"+
      "<p class='cartPriceText'>"+game.name+"</p>"+
      "<p class='cartPriceText'>$"+game.price+"</p></td> "+
      "<td class='cartButtonsCol'>"+
      "<button class='cartListButton'>Remove from cart</button>"+
      "<br><br>"+
      "<button class='cartListButton'>Add to Liked List</button>"+
      "</td></tr></table><br>"
}