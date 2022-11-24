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
        addGame(cartItems[index],document.getElementById('cartItemsList'));
    }
}

function addGame(game,element){
    
}