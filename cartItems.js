function DisplayCartItems(back) {
    document.getElementById('searchBox').value = "";
    if(back == null || back == false) addHistory("cartPage","");
    hideElements();
    document.getElementById('cartItems').style.display = "block";
    

    var cartItems = getGamesInCart();

    if (cartItems.length > 0) {
        sortResults(cartItems, "cartSort");
    }

    var cartTitle = document.getElementById('cartTitle')
    if(cartItems.length == 1){
        cartTitle.innerHTML = "Cart List ("+cartItems.length+" item)"
    } else{
        cartTitle.innerHTML = "Cart List ("+cartItems.length+" items)"
    }

    var price = 0;
    var tax = 0;
    var total = 0;
    var container = document.getElementById('cartItemsContainer')
    container.innerHTML = "";

    for (let index = 0; index < cartItems.length; index++) {
        const game = cartItems[index];
        addGame(game,container);

        price += game.price;
    }

    tax = price * .13;
    total = tax + price;

    var container = document.getElementById('cartPriceBeforeTax').innerHTML = "CA $" + price;
    var container = document.getElementById('cartTax').innerHTML = "CA $" + tax.toFixed(2);
    var container = document.getElementById('cartPriceAfterTax').innerHTML = "CA $" + total.toFixed(2);
}

function addGame(game,element){
    var price = "$" + game.price;
    if (game.price <= 0) {
        price = "Free";
    }
    element.innerHTML = element.innerHTML + 
    "<table class='displayItemTable'>" +
        "<tr>" +
            "<td class='displayItemImgCol'>"+
                "<img class='displayItemImg' src='"+game.displayPicture+"'>"+
            "</td>"+
            "<td class='displayItemDescCol'>"+
                "<p class='displayItemDescTitle'>"+game.name+"</p>"+
                "<p class='displayItemDescText'>"+price+"</p>"+
            "</td>"+
            "<td class='displayItemButtonCol'>"+
                "<button class='displayItemButton'>Remove from cart</button>"+
                "<br>"+
                "<br>"+
                "<button class='displayItemButton'>Add to Liked List</button>"+
            "</td>"+
        "</tr>"
    "</table>"+
    "<br>";
}

