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

    // if there are no cart items
    if(cartItems.length == 0){
        container.innerHTML = "<div class='emptyList'>Cart is empty</div>"
    }

    tax = price * .13;
    total = tax + price;

    var container = document.getElementById('cartPriceBeforeTax').innerHTML = "CA $" + price.toFixed(2);
    var container = document.getElementById('cartTax').innerHTML = "CA $" + tax.toFixed(2);
    var container = document.getElementById('cartPriceAfterTax').innerHTML = "CA $" + total.toFixed(2);
}

function addGame(game,element){
    var price = game.price.toFixed(2);
    if (game.price <= 0) {
        price = "Free";
    } else {
        price = "$" + price;
    }
    var tags = "";
    game.tags.forEach(tag => {
        tags = tags + '<text class="gameDetailsTagText" onclick="searchGameTag(\'' + tag + '\')">' + tag + '</text>'
    });
    element.innerHTML = element.innerHTML +
    "<div class='cartTableSpacing'>"+
    "<table class='displayItemTable'>" +
        "<tr>" +
            "<td class='displayItemImgCol'>"+
            '<div class="displayItemImgContainer">'+
            '<img class="displayItemImg" src="' + game.displayPicture + '"' + 'onclick="displayGameDetails(' + game.id + ')">' +
                '<div class="gameDetailsMiddle">'+
                    '<div class="gameDetailsText" onclick="displayGameDetails(' + game.id + ')">Click for details</div>' +
                '</div>'+
            '</div>'+
            "</td>"+
            "<td class='displayItemDescCol'>" +
                "<p class='displayItemDescTitle'>" + game.name +
                    "<br><br>" +
                    tags +
                    "<text class='displayItemDescText'>" + game.description + "</text>" +
                "</p>" +
                "<p class='displayItemDescTitle'>" + price + "</p>" +
            "</td>" +
            "<td class='displayItemButtonCol'>"+
                "<button class='displayItemButton' onclick='removeFromCart("+game.id+")'>Remove from Cart</button>"+
                "<br>"+
                "<br>"+
                "<button class='displayItemButton' onclick='addToLikedlist("+game.id+")'>Add to Liked</button>"+
            "</td>"+
        "</tr>"
    "</table>"+
    "</div>"+
    "<br>";
}

