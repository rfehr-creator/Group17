function addGameToCart() {
    var gameId = document.getElementById('gameDetailsPage').data;

    addToCart(gameId);
}

function addToCart(id){
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        const game = games[index];
        if (game.id === id) {
            game.inCart = true;
        }
    }
    storeGames(games);

    updateCartBadge();
}

function addGameToLikedList() {
    var gameId = document.getElementById('gameDetailsPage').data;

    addToLikedlist(gameId);
    updateHeartGameDetails(gameId);
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

function addToLikedlist(id){
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        const game = games[index];
        if (game.id === id) {
            game.liked = true;
        }
    }
    storeGames(games);
    updateHeart();
}

function updateCartBadge() {
    document.getElementById('cartBadge').innerHTML = getGamesInCart().length;
}

// return all liked games only
function getLikedGames() {
    const likedGames = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].liked === true) {
            likedGames.push(games[index]);
        }
    }

    return likedGames;
}

function getGame(gameId) {
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        const game = games[index];
        if (game.id === gameId) {
            return game;
        }
    }
}



// return all disliked games only
function getDislikedGames() {
    const dislikedGames = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].disliked === true) {
            dislikedGames.push(games[index]);
        }
    }

    return dislikedGames;
}

// return all games in cart
function getGamesInCart() {
    const gamesInCart = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].inCart === true) {
            gamesInCart.push(games[index]);
        }
    }

    return gamesInCart;
}

function removeLikedGame(id){
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        var game = games[index];
        if (game.id === id) {
            game.liked = false;
        }
    }

    storeGames(games);
    DisplayLikedList();
    addLikedGamesToGameDiv();
    updateHeart();
}

function removeDislikedGame(id) {
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        var game = games[index];
        if (game.id === id) {
            game.disliked = false;
        }
    }

    storeGames(games);
    DisplayDislikedList();
}

function checkout(){
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        var game = games[index];
        if (game.inCart === true) {
            game.inCart = false;
        }
    }
    
    storeGames(games);
    updateCartBadge();
    alert("Checkout was successful")
    home(); // to refresh empty cart
}

function removeFromCart(id){
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        var game = games[index];
        if (game.id == id) {
            game.inCart = false;
        }
    }

    storeGames(games);
    updateCartBadge();
    DisplayCartItems();
}

// loads games stored in local storage, local storage is used to keep track of modified games
function loadGames() {
    return JSON.parse(localStorage.getItem('games'));
}

function storeGames(data) {
    localStorage.setItem('games', JSON.stringify(data));
}

// store the random game currently displayed
function storeRandomGame(data) {
    localStorage.setItem('randomGame', JSON.stringify(data));
}

function loadRandomGame() {
    return JSON.parse(localStorage.getItem('randomGame'));
}

// default game list with default values when website is loaded
function defaultGames() {
    return [
        {
            "id": 1,
            "name": "Call of Duty: Black Ops III",
            "description": "Call of Duty®: Black Ops III Zombies Chronicles Edition includes the full base game plus the Zombies Chronicles content expansion.",
            "price": 59.99,
            "displayPicture": "https://www.xtrafondos.com/wallpapers/vertical/call-of-duty-black-ops-iii-1452.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/ss_ca7376d838d5714f916936f0070824c27c4c5641.600x338.jpg?t=1646763462",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/ss_31f499fa9bb7eb4b4cd5209988ff5f1d81756027.600x338.jpg?t=1646763462",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/ss_01c9cbde469b82ab719fb30c491f5e1102894607.600x338.jpg?t=1646763462",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/ss_61b6c855912c4542162252584b73dec0f9962f38.1920x1080.jpg?t=1646763462",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/ss_fd59cd3b0af53cef7f9a726f3dbfc92625452f9e.1920x1080.jpg?t=1646763462",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/ss_1e4a1d817d5b6b456bec8f71f5cb99e6a306e759.1920x1080.jpg?t=1646763462",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/ss_3a84113daacead987f549fbc3bd95fa9e66a833b.1920x1080.jpg?t=1646763462"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256672764/movie480.webm?t=1476830888"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["FPS", "Action", "Shooter", "Multiplayer", "Zombies"],
        },
        {
            "id": 2,
            "name": "Call of Duty®: Modern Warfare® II",
            "description": "Existing Modern Warfare® II Digital Standard Edition owners can upgrade to the Vault Edition as part of a limited time offer. Welcome to the new era of Call of Duty®. Call of Duty®: Modern Warfare® II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141. From small-scale, high-stakes infiltration tactical ops to highly classified missions, players will deploy alongside friends in a truly immersive experience. Infinity Ward brings fans state-of-the-art gameplay, with all-new gun handling, advanced AI system, a new Gunsmith and a suite of other gameplay and graphical innovations that elevate the franchise to new heights. Modern Warfare® II launches with a globe-trotting single-player campaign, immersive Multiplayer combat and a narrative-driven, co-op Special Ops experience.",
            "price": 69.99,
            "displayPicture": "https://4kwallpapers.com/images/wallpapers/call-of-duty-modern-warfare-2-2022-games-call-of-duty-1440x2560-8580.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/ss_b7d2f0b086a9d7d27fbab073e6fabd304ba5a908.600x338.jpg?t=1668813907",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/ss_1f1f380757cd18aecd83344329e8ed223b03a427.116x65.jpg?t=1668813907",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/ss_e01ffb1c1ffa22e06ae99dc6fb71f56c91b5b0cc.600x338.jpg?t=1668813907",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/ss_2d07e12de41060e3aa700b1a207e04ad92175aa4.600x338.jpg?t=1668813907",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/ss_6fefacb27d22ce288b985055d7c3b79d39c3dc1e.1920x1080.jpg?t=1668813907",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/ss_66b144b6406b43964c10dd474d2d4525ccf7b0a1.1920x1080.jpg?t=1668813907",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/ss_3bc236957083b41c2820733cc41eb5f76063aa23.1920x1080.jpg?t=1668813907",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/ss_2e25d5720f94648ec94dceb3f48a1dbf12d12c38.1920x1080.jpg?t=1668813907"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256913488/movie480_vp9.webm?t=1666987383", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["FPS", "Action", "Shooter", "Multiplayer"],
        },
        {
            "id": 3,
            "name": "Counter-Strike: Global Offensive",
            "description": "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
            "price": 0.00,
            "displayPicture": "https://valvearchive.com/archive/Counter-Strike/Counter-Strike%20Global%20Offensive/Art/csgo_keyart_alt.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_118cb022b9a43f70d2e5a2df7427f29088b6b191.600x338.jpg?t=1668125812",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.600x338.jpg?t=1668125812",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_3cef516c1a3c338f2554f3f11790aba3b7c0add7.600x338.jpg?t=1668125812",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_92c05c1cb1319beb15ed92c63b6b1d6f261d2f64.600x338.jpg?t=1668125812",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_34090867f1a02b6c17652ba9043e3f622ed985a9.1920x1080.jpg?t=1668125812",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_77215ea1b454c08a75351a74585a5b089142da3e.1920x1080.jpg?t=1668125812",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_110be563b66dde31b3b00dcf7d2f644c50374f07.1920x1080.jpg?t=1668125812",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_60b4f959497899515f46012df805b0006ef21af6.1920x1080.jpg?t=1668125812"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/81958/movie480.webm?t=1554409259" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["FPS", "Shooter", "Multiplayer", "Competitive", "Action"],
        },
        {
            "id": 4,
            "name": "Rust",
            "description": "The only aim in Rust is to survive. Everything wants you to die - the island’s wildlife and other inhabitants, the environment, other survivors. Do whatever it takes to last another night.",
            "price": 50.49,
            "displayPicture": "https://i.pinimg.com/736x/5d/42/06/5d420640b1e232674efbb4fcadc5374a.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/ss_2a8518810024a5fbf9c714e697a43a1201b5d53e.600x338.jpg?t=1669127647",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/ss_e825b087b95e51c3534383cfd75ad6e8038147c3.600x338.jpg?t=1669127647",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/ss_b6cfe69db0aa6e4e7885efbe3acbe17ea2c24d0f.600x338.jpg?t=1669127647",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/ss_0e646f1a70e5cb8eed00efef8adb9579d40d5b2e.600x338.jpg?t=1669127647",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/ss_1c2d0d1eefee54f0c67626c74eb21699bbb0ef52.1920x1080.jpg?t=1669127647",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/ss_9dfb2cb3e93ab37ff47c7b2e011b1b9e42351107.1920x1080.jpg?t=1669127647",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/ss_c88939db635d959b25eb1bcf9b4c4dcdec04b3fe.1920x1080.jpg?t=1669127647",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/ss_326282c7485e8aff1ebf6750c82622afef098998.1920x1080.jpg?t=1669127647"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256684736/movie480_vp9.webm?t=1624520315" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Survival", "Crafting", "Multiplayer", "Open World"],
        },
        {
            "id": 5,
            "name": "Borderlands 3",
            "description": "The original shooter-looter returns, packing bazillions of guns and a mayhem-fueled adventure! Blast through new worlds and enemies as one of four new Vault Hunters.",
            "price": 79.99,
            "displayPicture": "https://external-preview.redd.it/YAPF3mFktcVd9moP1vLuW9CSKRkbsMIk367ANq7R_d4.jpg?auto=webp&s=7aa87eb7a9f6ff8fe329cfc936da963791e43512",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/ss_9868ee40f39749a4c8222502cf86525ee32c1bef.600x338.jpg?t=1657214217",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/ss_624638e46ed590d4bb1835558a5ab0981f7baadd.600x338.jpg?t=1657214217",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/ss_6f1836277ffe8733503a9446d51b8c7eb3d20d5f.600x338.jpg?t=1657214217",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/ss_f983c0c1cc566b8ca21a6c45e6f044b57aff0f0f.600x338.jpg?t=1657214217",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/ss_bd8b719de92cfc9e65cd96d5da74426918964291.600x338.jpg?t=1657214217",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/ss_f983c0c1cc566b8ca21a6c45e6f044b57aff0f0f.600x338.jpg?t=1657214217",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/ss_bb22ac18c1db1a87d779db0c3fb480eb1ce79f0e.600x338.jpg?t=1657214217",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/ss_bb22ac18c1db1a87d779db0c3fb480eb1ce79f0e.600x338.jpg?t=1657214217"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256871049/movie480_vp9.webm?t=1643331503" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["RPG", "Action", "Shooter", "FPS", "Multiplayer"],
        },
        {
            "id": 6,
            "name": "Left 4 Dead 2",
            "description": "Set in the zombie apocalypse, Left 4 Dead 2 (L4D2) is the highly anticipated sequel to the award-winning Left 4 Dead, the #1 co-op game of 2008. This co-operative action horror FPS takes you and your friends through the cities, swamps and cemeteries of the Deep South, from Savannah to New Orleans across five expansive campaigns.",
            "price": 12.99,
            "displayPicture": "https://picfiles.alphacoders.com/174/thumb-17456.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/550/ss_2eae29fbdfe8e5e8999b96d8bb28c5db70507968.600x338.jpg?t=1666824129",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/550/ss_29b3b4f2a3994c889f6fc12e0781d9d4726ef33f.600x338.jpg?t=1666824129",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/550/ss_ba2ea2eda245f89626277457ae2ab76ba997f46a.600x338.jpg?t=1666824129",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/550/ss_2b06e1786598ab033411c27600de1868f023c663.600x338.jpg?t=1666824129",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/550/ss_40c3f02a01ce435ea776b07fde7710c66532e6b6.1920x1080.jpg?t=1666824129",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/550/ss_13912b20f591bfde622fc87174b3265a579bd9c9.1920x1080.jpg?t=1666824129",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/550/ss_2b06e1786598ab033411c27600de1868f023c663.1920x1080.jpg?t=1666824129",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/550/ss_1d9d6e638c8ad4b04fac0f49ca32947b31396f24.1920x1080.jpg?t=1666824129"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/5952/movie480.webm?t=1447353587" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Zombies", "Co-op", "FPS", "Multiplayer", "Shooter"],
        },
        {
            "id": 7,
            "name": "New World",
            "description": "Explore a thrilling, open-world MMO filled with danger and opportunity where you'll forge a new destiny on the supernatural island of Aeternum.",
            "price": 49.99,
            "displayPicture": "https://picfiles.alphacoders.com/431/thumb-431006.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/ss_32b377faf983064af7638e858e1bfa7c845c9e2f.600x338.jpg?t=1666108453",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/ss_c5c9e520c69d217da25769cd3c093c04458a83ac.600x338.jpg?t=1666108453",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/ss_45594186d0784865980a9c8b009675b5c5e8c0ac.600x338.jpg?t=1666108453",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/ss_b48cb21ccfb35c81307d2435ce3cbda7dc3a7c88.600x338.jpg?t=1666108453",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/ss_84bc9909c2dfc8ec0d4ff84fd072b35785332fdc.600x338.jpg?t=1666108453",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/ss_ceeb983fca848dc3ec1ce88efcbf85cce6f00489.600x338.jpg?t=1666108453",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/ss_59edc8f4cd2c13495538a3c96040cd133cab6555.600x338.jpg?t=1666108453",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/ss_21a08b813ef3abdd3da501755807a404adff91e5.600x338.jpg?t=1666108453"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256911386/movie480_vp9.webm?t=1666108429" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Massively Multiplayer", "Open World", "MMORPG"],
        },
        {
            "id": 8,
            "name": "FINAL FANTASY XIV Online",
            "description": "Take part in an epic and ever-changing FINAL FANTASY as you adventure and explore with friends from around the world.",
            "price": 24.99,
            "displayPicture": "https://img.finalfantasyxiv.com/lds/h/W/oD5KOpOh_r1uwlBpW6wrPUewHA.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_ca57d5322b116ffaab2de37958df59eba8c7807a.600x338.jpg?t=1646695302",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_f1bc7a959795c1fad6bfc602ccbd0e311075a454.600x338.jpg?t=1646695302",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_ddb71dc0c9a667de5c23e0b3823dad3590d5e9bb.600x338.jpg?t=1646695302",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_912ffecab72b0ec4132e100582a6592e559ac3aa.600x338.jpg?t=1646695302",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_d37db153382217ad479679691899588e8d173937.600x338.jpg?t=1646695302",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_b13bbf3e5c841c759483c63604b0359080700dbd.600x338.jpg?t=1646695302",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_ed8445bec9d85b79079f7ec46be38adc4068e3c5.600x338.jpg?t=1646695302",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_e4686dc9cbe1b0d9d4d96bc029c766b195325209.116x65.jpg?t=1646695302",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/ss_634fd54775211fc96a911857f4baac7109985b5b.600x338.jpg?t=1646695302"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/2029865/movie480.webm?t=1447359267" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["MMORPG", "RPG", "Massively Multiplayer", "Fantasy"],
        },
        {
            "id": 9,
            "name": "Lost Ark",
            "description": "Embark on an odyssey for the Lost Ark in a vast, vibrant world: explore new lands, seek out lost treasures, and test yourself in thrilling action combat in this action-packed free-to-play RPG.",
            "price": 0.00,
            "displayPicture": "https://m.media-amazon.com/images/M/MV5BOTA3YjIxNjYtNzU1ZS00NmEzLTk4ZjItN2M4MGYwMDcwZDM4XkEyXkFqcGdeQXVyODczMTkwNzY@._V1_.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_ecb8cb71b127f9f6eea9bcdadddabd5b6d8f734f.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_f367fad018a2cc92530e3b8fc7dc8541dd21b71e.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_840ff7c3bd4209f2a35ba98fc19561089dce3f89.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_93dcd15dc501062b3f6e2b1575d278133d457e59.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1599340/ss_4e7802861ea7a1cb72e75a2003bf8769d47f6c4a.1920x1080.jpg?t=1669168252",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1599340/ss_0835a9016d0c453675994ec218a3dd70a73529ea.1920x1080.jpg?t=1669168252",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1599340/ss_b9c562ad66414ec37cf448f2f9d19d70009129ef.1920x1080.jpg?t=1669168252",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1599340/ss_ad65376ee41e614c8e28993168c294cb600e4777.1920x1080.jpg?t=1669168252"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256916251/movie480_vp9.webm?t=1668553272" // trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["MMORPG", "Free To Play", "Action RPG", "Multiplayer"],
        },
        {
            "id": 10,
            "name": "Black Desert",
            "description": "Played by over 20 million Adventurers - Black Desert Online is an open-world, action MMORPG. Experience intense, action-packed combat, battle massive world bosses, fight alongside friends to siege and conquer castles, and train in professions such as fishing, trading, crafting, cooking, and more!",
            "price": 12.99,
            "displayPicture": "https://thumbnails.pcgamingwiki.com/2/20/Black_Desert_Online_cover.jpg/450px-Black_Desert_Online_cover.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_ecb8cb71b127f9f6eea9bcdadddabd5b6d8f734f.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_f367fad018a2cc92530e3b8fc7dc8541dd21b71e.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_840ff7c3bd4209f2a35ba98fc19561089dce3f89.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_93dcd15dc501062b3f6e2b1575d278133d457e59.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_428ca6c26d05fa1f4ad17c1d889510ffd3c4c60b.1920x1080.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_8899e09c05645aa8730b57bc0412c07476312787.1920x1080.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_33cce203fc6d3148ee705e3b73904d72dedd907e.1920x1080.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_8cf91b7dd9ee5d110c72ddd3bde5aabe1a8faa56.1920x1080.jpg?t=1669235984"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256897088/movie480_vp9.webm?t=1658233223", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["MMORPG", "Massively Multiplayer", "RPG", "Fantasy"],
        },
        {
            "id": 11,
            "name": "God of War",
            "description": "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.",
            "price": 59.99,
            "displayPicture": "https://picfiles.alphacoders.com/198/thumb-198638.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/ss_6eccc970b5de2943546d93d319be1b5c0618f21b.1920x1080.jpg?t=1650554420",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/ss_f1bff24d3967a21d303d95e11ed892e3d9113057.1920x1080.jpg?t=1650554420",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/ss_3670ba72c7e3e9c3c3225547ef2c1053504e62b8.1920x1080.jpg?t=1650554420",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/ss_93a3ca63aa2cd8c675bbb6430324ee3f2d44b845.1920x1080.jpg?t=1650554420",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/ss_1bd99270dcbd4ff9fe9c94b0d9c8ffc50ebb42c7.1920x1080.jpg?t=1650554420",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/ss_0858b868ea51d53f73bd805ba7382f027dd33dca.1920x1080.jpg?t=1650554420",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/ss_1351cb512d008f7e47fc50b74197f4f8eb6f3419.1920x1080.jpg?t=1650554420",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/ss_8db3de5b5d611e50945268848de2889e1ed4ba84.1920x1080.jpg?t=1650554420"
    
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256864004/movie480_vp9.webm?t=1639001817" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Action", "Singleplayer", "Adventure", "Story Rich"],
        },
        {
            "id": 12,
            "name": "ELDEN RING",
            "description": "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
            "price": 79.99,
            "displayPicture": "https://wallpapercave.com/wp/wp4674122.png",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_c372274833ae6e5437b952fa1979430546a43ad9.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_e87a3e84890ab19f8995566e62762d5f8ed39315.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_41e2e8f3b0ad631e929e0c2ec3d1f21de883e98c.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_75f25974c20b8704fe5ee246f74896b550088d3e.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_fb2957cce97f4633bc743b561f76865e6993c781.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_8b58d96262fb0d62a482621b86c6ff85f4f57997.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_1011610a0e330c41a75ffd0b3a9a1bac3205c46a.600x338.jpg?t=1668042166"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256889452/movie480_vp9.webm?t=1654109247", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fantasy", "RPG", "Action RPG", "Action"],
        },
        {
            "id": 13,
            "name": "The Elder Scrolls V: Skyrim Special Edition",
            "description": "Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space reflections, and more.",
            "price": 53.49,
            "displayPicture": "https://picfiles.alphacoders.com/428/thumb-42880.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_73c1a0bb7e1720c8a1847186c3ddd837d3ca7a8d.600x338.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_d64b646612ab1402bdda8e400672aa0dbcb352ea.600x338.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_921ccea650df936a0b14ebd5dd4ecc73c1d2a12d.600x338.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_5d19c69d33abca6f6271d75f371d4241c0d6b2d1.600x338.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_b6bb6f79278505b3f48567f08c21f7a0eb171c68.1920x1080.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_8c7ecd394afb581b9b2137a3de04433f78fdf4ea.1920x1080.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_50c3da9e29e9b0368889379cdd03a71aba8d614c.1920x1080.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_2ca72f4ecc42a18dd4bf056c539a9794c2b2493d.1920x1080.jpg?t=1650909796"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256672927/movie480.webm?t=1476991615", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Open World", "RPG", "Adventure", "Singleplayer"],
        },
        {
            "id": 14,
            "name": "Cyberpunk 2077",
            "description": "Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.",
            "price": 79.99,
            "displayPicture": "https://picfiles.alphacoders.com/532/thumb-532455.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_b529b0abc43f55fc23fe8058eddb6e37c9629a6a.600x338.jpg?t=1663663573",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_8640d9db74f7cad714f6ecfb0e1aceaa3f887e58.600x338.jpg?t=1663663573",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9284d1c5b248726760233a933dbb83757d7d5d95.600x338.jpg?t=1663663573",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_e5a94665dbfa5a30931cff2f45cdc0ebea9fcebb.600x338.jpg?t=1663663573",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_4bda6f67580d94832ed2d5814e41ebe018ba1d9e.600x338.jpg?t=1663663573",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_429db1d013a0366417d650d84f1eff02d1a18c2d.600x338.jpg?t=1663663573",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_872822c5e50dc71f345416098d29fc3ae5cd26c1.600x338.jpg?t=1663663573",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_ae4465fa8a44dd330dbeb7992ba196c2f32cabb1.600x338.jpg?t=1663663573"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256904407/movie480_vp9.webm?t=1662480414" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Open World", "RPG", "Singleplayer", "Sci-fi"],
        },
        {
            "id": 15,
            "name": "The Witcher® 3: Wild Hunt",
            "description": "As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.",
            "price": 55.99,
            "displayPicture": "https://picfiles.alphacoders.com/198/thumb-198636.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_107600c1337accc09104f7a8aa7f275f23cad096.600x338.jpg?t=1668443314",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_64eb760f9a2b67f6731a71cce3a8fb684b9af267.600x338.jpg?t=1668443314",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_eda99e7f705a113d04ab2a7a36068f3e7b343d17.600x338.jpg?t=1668443314",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_d5b80eb63c12a6484f26796f3e34410651bba068.600x338.jpg?t=1668443314",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_b74d60ee215337d765e4d20c8ca6710ae2362cc2.600x338.jpg?t=1668443314",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_dc55eeb409d6e187456a8e159018e8da098fa468.600x338.jpg?t=1668443314",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_849ec8dcc6f8df1c0b2c509584c9fc9e51f88cfa.600x338.jpg?t=1668443314",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_90a33d7764a2d23306091bfcb52265c3506b4fdb.600x338.jpg?t=1668443314"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256658589/movie480.webm?t=1528288687" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Open World", "RPG", "Story Rich", "Fantasy"],
        },
        {
            "id": 16,
            "name": "TEKKEN 7",
            "description": "Discover the epic conclusion of the long-time clan warfare between members of the Mishima family. Powered by Unreal Engine 4, the legendary fighting game franchise fights back with stunning story-driven cinematic battles and intense duels that can be enjoyed with friends and rivals.",
            "price": 49.99,
            "displayPicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyu-NU_7SOIudxXIBJmnsdWyjNMAjmrbG3iWbWL3PMEeaNtz2K3xKXWanjvec5FTlqIIE&usqp=CAU",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/ss_d92a558644ad60ae5814fc4d2bbaebc5abf62fa3.600x338.jpg?t=1666949098",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/ss_40faa5ba39563cb899f1ab2ddd2afbf8b451d52f.600x338.jpg?t=1666949098",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/ss_ed3246605518907954918eb06e90705249be77d6.600x338.jpg?t=1666949098",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/ss_4274653781c2c618f7749cdb569e2b9274fceba9.600x338.jpg?t=1666949098",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/ss_744702d2289cc49bebb1b2fba7dd758b5534e1c5.600x338.jpg?t=1666949098",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/ss_e4266a29ed7485522c85ff61b454f3765151a0db.600x338.jpg?t=1666949098",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/ss_8f6d9f87f50513ed756004cfa5b2b54cdeb1df18.600x338.jpg?t=1666949098",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/ss_d92a558644ad60ae5814fc4d2bbaebc5abf62fa3.600x338.jpg?t=1666949098"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256864020/movie480_vp9.webm?t=1638994619" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fighting", "Action", "Multiplayer", "Competitive"],
        },
        {
            "id": 17,
            "name": "SOULCALIBUR VI",
            "description": "Bring more than your fists to the fight! Featuring all-new battle mechanics and characters, SOULCALIBUR VI marks a new era of the historic franchise. Welcome back to the stage of history!",
            "price": 79.99,
            "displayPicture": "https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA09903_00/3/i_c004d0521217a1aa254257619a664793ce401599949e2444459b84fdf9a89043/i/icon0.png",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/ss_38779cc03d7e37c2082d1c0e630107cf2ba61332.600x338.jpg?t=1646956219",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/ss_0a759f4027ad366646fac37399a04599e09c2040.600x338.jpg?t=1646956219",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/ss_cbc118ee08695b438a37303fb0753df522687f6a.600x338.jpg?t=1646956219",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/ss_48d90ad60e5e2e46f8990896e622e40c1df1ad0d.1920x1080.jpg?t=1646956219",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/ss_7beaa34d62c37585b90a58a62919428673efb7ef.1920x1080.jpg?t=1646956219",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/ss_7afa4001cf72e793c38da6e3b5894d7e4169802a.1920x1080.jpg?t=1646956219",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/ss_2d52a52a3b8707159d51674f2449c614b7a48dcf.1920x1080.jpg?t=1646956219"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256807455/movie480_vp9.webm?t=1604033038" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fighting", "Action", "Character Customization", "Mulitplayer"],
        },
        {
            "id": 18,
            "name": "Mortal Kombat 11",
            "description": "Mortal Kombat is back and better than ever in the next evolution of the iconic franchise.",
            "price": 69.99,
            "displayPicture": "https://www.xtrafondos.com/en/descargar.php?id=3175&vertical=1",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/ss_e5cd8debd74027dbfafd9729fc32986a63393333.1920x1080.jpg?t=1654216426",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/ss_4fa4fd2ea1b7ff6c6b699dc9eb717986f80845a4.1920x1080.jpg?t=1654216426",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/ss_aa70f659fe14e3c07033474249096b60c17021b3.1920x1080.jpg?t=1654216426",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/ss_b0e8bcfcebf910a6606a7903d2e23ec589c0c45b.1920x1080.jpg?t=1654216426",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/ss_ecddafdaee86bfb66b0a7290dda445f43195b48d.1920x1080.jpg?t=1654216426",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/ss_4a9c1909083a75dcf684d79806afd9d9b46e432a.1920x1080.jpg?t=1654216426"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256813084/movie480_vp9.webm?t=1607567246" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fighting", "Multiplayer", "Action", "Competitive"],
        },
        {
            "id": 19,
            "name": "Warframe",
            "description": "Awaken as an unstoppable warrior and battle alongside your friends in this story-driven free-to-play online action game",
            "price": 0.00,
            "displayPicture": "https://thumbnails.pcgamingwiki.com/9/92/Warframe_cover.jpg/1024px-Warframe_cover.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_2e4077f215eccde84171a4b8e0f2bc8a3264c776.600x338.jpg?t=1669152840",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_0a541a8bf59e212870ea8d82260ac1b3ae2d0354.600x338.jpg?t=1669152840",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_e1d1bfebe225c85ea284ffecfe279c2695ddf3a5.600x338.jpg?t=1669152840",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_b06620c448c51d2bc5b71144a184da9ba37b703e.600x338.jpg?t=1669152840",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_ce00a212a29e9a6c1fc37b16dbd802b2844a901d.1920x1080.jpg?t=1669152840",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_29355e0546599c72002b34b42fe952329df61c2e.1920x1080.jpg?t=1669152840"
                
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256904810/movie480_vp9.webm?t=1662572584", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Free To Play", "Action RPG", "Shooter", "RPG"],
        },
        {
            "id": 20,
            "name": "Sid Meier’s Civilization® VI",
            "description": "Civilization VI is the newest installment in the award winning Civilization Franchise. Expand your empire, advance your culture and go head-to-head against history’s greatest leaders. Will your civilization stand the test of time?",
            "price": 79.99,
            "displayPicture": "https://oyster.ignimgs.com/wordpress/stg.ign.com/2016/05/CivilizationVI_KeyArt-VERTICALx.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_12cc6e1f4084de5bc0f66bfdbe3aaf3e59388b53.600x338.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_6c4a3cfb61f1a9677cf2ac549c2816a4e651f741.600x338.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_b2bf12299c38214fe520af0f724a6349d17ed330.600x338.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_36c63ebeb006b246cb740fdafeb41bb20e3b330d.600x338.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_7ca34ff8ae81fb10ddc540187e2e21d1b8e1dfe9.1920x1080.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_7f598198526afc260d939a98af4d76d95f5349e4.1920x1080.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_cf53258cb8c4d283e52cf8dce3edf8656f83adc6.1920x1080.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_f501156a69223131ee8b12452f3003698334e964.1920x1080.jpg?t=1669055236"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256672694/movie480.webm?t=1476736935", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Strategy", "Turn-Based Strategy", "Singleplayer", "Multiplayer"],
        },
        {
            "id": 21,
            "name": "Divinity: Original Sin 2 - Definitive Edition",
            "description": "The critically acclaimed RPG that raised the bar, from the creators of Baldur's Gate 3. Gather your party. Master deep, tactical combat. Venture as a party of up to four - but know that only one of you will have the chance to become a God.",
            "price": 54.99,
            "displayPicture": "https://thumbnails.pcgamingwiki.com/f/f1/Divinity_Original_Sin_II_-_Definitive_Edition_cover.jpg/300px-Divinity_Original_Sin_II_-_Definitive_Edition_cover.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_b59e5889726cab2cf01a93d0c0d192d25928952a.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_34a428cdd26113e8645b77331d9fc82fcc50a4a2.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_66d58326ebea7154d7f3d89e02f13913452caef7.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_d51d3ccb39019124c45bf851bbe6a76e2461fab3.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_5ba36377bbb88fdde6c9e9ccddb581d3a952ea6a.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_d882a5136e99c31ac7192cd3648b0d547be53f0e.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_9f7699218d7acc9e1dd0a081d3a2c5cae4ffba86.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_f85eb1d28993d481dcde84118f5ac23c705a8774.600x338.jpg?t=1668591196"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256694830/movie480.webm?t=1561485484", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Tactical RPG", "RPG", "Turn-Based Strategy", "Fantasy"],
        },{
            "id": 22,
            "name": "XCOM® 2",
            "description": "XCOM 2 is the sequel to XCOM: Enemy Unknown, the 2012 award-winning strategy game of the year. Earth has changed and is now under alien rule. Facing impossible odds you must rebuild XCOM, and ignite a global resistance to reclaim our world and save humanity.",
            "price": 79.99,
            "displayPicture": "https://picfiles.alphacoders.com/204/thumb-204112.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_a95cdbe487dbabf6621962fc92f438e26c5fdfd3.600x338.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_ca76303e136d2ea500b8e6546d4319502ae8862a.600x338.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_c42d24a1bd8a9d9d50cbda9772ca3aae5348ce0e.600x338.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_3aca7c3d18a0a99c49658fc939edd27235d17e5f.600x338.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_ebf8ce7259f56e92cc5fdc75d9eeb2305521e8fb.600x338.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_0aeb69f3b0d79e0934ba99468294f7acaae23459.1920x1080.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_d7c7eee81e4f9de3deac5358a0d8766c11fa83b2.1920x1080.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_306d842978f1ee39fb21bec7998715820b821b5d.1920x1080.jpg?t=1646157374"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256660485/movie480.webm?t=1454648692", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Strategy", "Turn-Based Strategy", "Sci-fi", "Character Customization"],
        },
        {
            "id": 23,
            "name": "Battle Brothers",
            "description": "Battle Brothers is a turn based tactical RPG which has you leading a mercenary company in a gritty, low-power, medieval fantasy world. You decide where to go, whom to hire or to fight, what contracts to take and how to train and equip your men in a procedurally generated open world campaign.",
            "price": 32.99,
            "displayPicture": "https://static-cdn.jtvnw.net/ttv-boxart/490771_IGDB-272x380.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_2ed5eff851e0562800376e4903e9bf3a2dcdde76.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_c03600b98e321733a1cc9184f3e7150cfac8dffc.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_03699d4ce2eacbaeb5f493ae75332b586b09e1c0.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_f78ccd2ce53431b5968230165704ec6a0d3fc613.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_5c6341f7d80b424d962006d28e47e48b619203ac.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_99591f270f73a66d760f979b16809f4aee1e7827.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_e07d2a2dd627eb425dbb6322076c85324d94bbf1.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_4b7b47e2740ada408e2bf2e2bb7a88d61bd570c3.600x338.jpg?t=1667298527"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256681083/movie480.webm?t=1489152119", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Tactical RPG", "Turn-Based Strategy", "Strategy", "RPG"],
        },
        {
            "id": 24,
            "name": "Dead by Daylight",
            "description": "Dead by Daylight is a multiplayer (4vs1) horror game where one player takes on the role of the savage Killer, and the other four players play as Survivors, trying to escape the Killer and avoid being caught and killed.",
            "price": 21.99,
            "displayPicture": "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/440fd5430b47ea9e983fe3b3e7457265.png",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_659500624438a4aa77bfdf304cba3ecebcd92ed9.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_4075aac79adfe1a5b71665d2cc5ff7d52122650b.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_ca6b39f2fcac8feb75d23976b1be31290d58d159.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_430577c364a68dbe24e8a1d895bd678ea04b87d5.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_bd49ddb8318bf9d54cb185b57c7fccfe7cb609c0.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_6f14934aaec5f564c8092c85dca236e04935db9d.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_b20e7868e4a80f619fb2e4ef69f7228048a68e99.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_42f2866b00cf92cbe84bc8bb32c1fe65911c074c.600x338.jpg?t=1669150759"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256686761/movie480.webm?t=1635971432", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Horror", "Survival", "Multiplayer", "Online Co-op"],
        },
        {
            "id": 25,
            "name": "The Forest",
            "description": "As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first person survival horror simulator.",
            "price": 22.79,
            "displayPicture": "https://cdna.artstation.com/p/assets/images/images/003/008/272/large/arpizou-robin-theforest-05.jpg?1468428396",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_8ccb821c4df3fafdf4161d77f38635441a8157f2.600x338.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_53c615d49c4777144ed7359e4bf7c9eb6838cc8e.600x338.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_772eebf0ce7bdb51546055a36185e8ee46e8acac.600x338.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_233e1d0c71f1bc2d5cdeb96fa3f8974f0ab5e95d.600x338.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_a1a871918b4fa3dcc71f19f3aa4ea1fff3ab649b.600x338.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_e50b7c8bc2f4720859ba13aa32703661192f4d62.1920x1080.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_792069bbfdd795f3e0b139c5b4e5140f2e9ea70c.1920x1080.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_8b6ee5b52fa2b058c20447b57317f6d50ddb313c.1920x1080.jpg?t=1666811027"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256715589/movie480.webm?t=1525039057", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Survival", "Open World", "Horror", "Crafting"],
        },
        {
            "id": 26,
            "name": "Phasmophobia",
            "description": "Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and it’s up to you and your team to use all the ghost hunting equipment at your disposal in order to gather as much evidence as you can.",
            "price": 15.49,
            "displayPicture": "https://thumbnails.pcgamingwiki.com/b/b7/Phasmophobia_cover.jpg/300px-Phasmophobia_cover.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_91bca60a51dce60d680a8fb4efcdecf740b3a3d1.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_c9740361a95e60980b01bf122a1479536af10500.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_13dde9450dd7c7f70b31ccbaa16ac1f5d3822289.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_59023d418d1825e574ad75911da34f5814a6bb9d.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_096050f6d0c6cd42c10f319e8a16efabe7366747.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_d48dc33b2d49086841d8361c59752cb1bb3733ac.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_277778876e52adc03b3261213e45a06b2e8cd28c.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_9c7fe5b357b4e9fd07b07dfdc29f721876e41d2f.600x338.jpg?t=1667574170"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256906135/movie480_vp9.webm?t=1663254571", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Horror", "Online Co-op", "Multiplayer", "Co-op"],
        },
        {
            "id": 27,
            "name": "Need for Speed™ Heat",
            "description": "Hustle by day and risk it all at night in Need for Speed™ Heat Deluxe Edition, a white-knuckle street racer, where the lines of the law fade as the sun starts to set.",
            "price": 89.99,
            "displayPicture": "https://cdna.artstation.com/p/assets/images/images/020/080/120/large/mighoet-sundback-nsfh-pc-std-packart.jpg?1566284492",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_4127c58a6a10124b4ba28375ec937a977aba37fc.600x338.jpg?t=1667318479",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_6994870577a41882c458cd00d852d8092116c81c.600x338.jpg?t=1667318479",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_720840b2cb26c38d0e4ad32085afb5f46b2bb6c6.600x338.jpg?t=1667318479",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_4e3387eb370a80ca7c1e80309baa9d812a6caa8a.600x338.jpg?t=1667318479",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_1f752c037d7cbab2e1658f36d5c76d11e91e4fec.1920x1080.jpg?t=1667318479"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256823664/movie480_vp9.webm?t=1614187437", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Racing", "Open World", "Driving", "Multiplayer", "PvP"],
        },
        {
            "id": 28,
            "name": "NBA 2K23",
            "description": "Rise to the occasion in NBA 2K23. Showcase your talent in MyCAREER. Pair All-Stars with timeless legends in MyTEAM. Build your own dynasty in MyGM, or guide the NBA in a new direction with MyLEAGUE. Take on NBA or WNBA teams in PLAY NOW and feel true-to-life gameplay.",
            "price": 79.99,
            "displayPicture": "https://i0.wp.com/gaminglyfe.com/wp-content/uploads/2022/07/NBA-2K23-DIGITAL-DELUXE-EDITION-VERTICAL.jpg?ssl=1",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_6d2cd663d938ac1c1f55150bd6a922664d9b1b78.600x338.jpg?t=1666364639",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_17a92f289bb32a76ac114538e31a7137b15ce576.600x338.jpg?t=1666364639",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_3442b58f34663fb7e548eef0ed1d113d5ac9fb2b.600x338.jpg?t=1666364639",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_75b82770a268d1bcf98251e18646b823ea14bd08.600x338.jpg?t=1666364639",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_967a6e4318040094313e7c0cd02948fa428032a1.600x338.jpg?t=1666364639"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256904676/movie480_vp9.webm?t=1662696182", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Immersive Sim", "Sports", "Co-op", "Basketball"],
        },
        {
            "id": 29,
            "name": "EA SPORTS™ FIFA 23",
            "description": "Experience the excitement of the biggest tournament in football with EA SPORTS™ FIFA 23 and the men’s FIFA World Cup™ update, available on November 9 at no additional cost!",
            "price": 89.99,
            "displayPicture": "https://stadiahoy.com/wp-content/uploads/2022/07/edicion-estandar-fifa-23-mbape-vertical.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_55f92d533bc6acc5bf68020ee16a2f4740ffe31d.600x338.jpg?t=1668091575",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_b11ed2d9359cfce8e9c693c85c95b5e5ea12bcec.600x338.jpg?t=1668091575",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_a7952f00209d661a0f05899b6567a4ddc4c43deb.600x338.jpg?t=1668091575",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_69881245fb65f08d2a8024ea21286abc82745939.600x338.jpg?t=1668091575",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_cb923eeea4afb2865227625d0512c1a2d956cd43.1920x1080.jpg?t=1669311247",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_0b862667df14a47392a8602a643b45fe836274e0.1920x1080.jpg?t=1669311247",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_93965abb2b5c8cc0a93de1c1e9c3e75cad06fb80.1920x1080.jpg?t=1669311247",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_a69d3435ce31da724e24d30af98b0196ff7e55fd.600x338.jpg?t=1669311247"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256915486/movie480_vp9.webm?t=1668017731", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Sports", "Soccer", "Immersive Sim", "Football", "PvP"],
        },
        {
            "id": 30,
            "name": "Forza Horizon 5",
            "description": "Your Ultimate Horizon Adventure awaits! Explore the vibrant open world landscapes of Mexico with limitless, fun driving action in the world’s greatest cars. Blast off to Hot Wheels Park and experience the most extreme tracks ever devised. Requires Forza Horizon 5 game, expansion sold separately.",
            "price": 79.99,
            "displayPicture": "https://wallpaperaccess.com/full/6070333.jpg",
            "pictures":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_cf56e25a0290556ba83229eb0ab370d10be0407c.600x338.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_00f0090174380eeaf8753bd3d1028b6772c3aebf.600x338.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_b65236b365315ebb6da6114ce42cd74b59cab3c8.600x338.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_0a13a7ccd38e7c3e6a5f1720050732833b53b6a8.600x338.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_4f2da231c28c5cb6a1ed4f62aaad6f51ca4a5c05.1920x1080.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_af9712cbc5121307926cb3e7dfc7228d45940557.1920x1080.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_d26239d188301bb6f2475c6d323ae007195b7542.1920x1080.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_16be1ecc46e7c0a3aa68e646af904c66ea8e1c81.1920x1080.jpg?t=1668017884"
            ],
            "videos":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256875134/movie480_vp9.webm?t=1647525311", //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Racing", "Open World", "Driving", "Multiplayer", "PvP"],
        }
    ]
}
