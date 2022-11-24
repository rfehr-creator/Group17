function addGameToCart() {
    var gameId = document.getElementById('gameDetailsPage').data;

    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        const game = games[index];
        if (game.id === gameId) {
            game.inCart = true;
        }
    }
    storeGames(games);

    updateCartBadge();
}

function addGameToLikedList() {
    var gameId = document.getElementById('gameDetailsPage').data;

    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        const game = games[index];
        if (game.id === gameId) {
            game.liked = true;
        }
    }
    storeGames(games);
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

// return random games that are not disliked or liked
function getRandomGame() {
    const nonLikedGames = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].liked === false && games[index].disliked === false) {
            nonLikedGames.push(games[index]);
        }
    }

    return nonLikedGames;
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/header.jpg?t=1646763462",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256785837/movie480_vp9.webm?t=1589836574",
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg?t=1668017465",
            "pictures": [

            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["FPS", "Action", "Shooter", "Multiplayer", "Military"],
        },
        {
            "id": 3,
            "name": "Counter-Strike: Global Offensive",
            "description": "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
            "price": "0.00",
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1668125812",
            "pictures": [
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg?t=1666865208",
            "pictures": [
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/397540/header.jpg?t=1657214217",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256871049/movie480_vp9.webm?t=1643331503" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["RPG", "Action", "Looter Shooter", "FPS", "Multiplayer"],
        },
        {
            "id": 6,
            "name": "Left 4 Dead 2",
            "description": "Set in the zombie apocalypse, Left 4 Dead 2 (L4D2) is the highly anticipated sequel to the award-winning Left 4 Dead, the #1 co-op game of 2008. This co-operative action horror FPS takes you and your friends through the cities, swamps and cemeteries of the Deep South, from Savannah to New Orleans across five expansive campaigns.",
            "price": 12.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg?t=1666824129",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/5952/movie480.webm?t=1447353587" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Zombies", "Co-op", "FPS", "Multiplayer", "Shooter"],
        },
        {
            "id": 7,
            "name": "Stardew Valley",
            "description": "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
            "price": 16.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg?t=1666917466",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256660296/movie480.webm?t=1454099186" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Farming Sim", "Life Sim", "Pixel Graphics", "RPG"],
        },
        {
            "id": 8,
            "name": "New World",
            "description": "Explore a thrilling, open-world MMO filled with danger and opportunity where you'll forge a new destiny on the supernatural island of Aeternum.",
            "price": 49.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/header.jpg?t=1666108453",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256911386/movie480_vp9.webm?t=1666108429" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Massively Multiplayer", "Open World", "MMORPG"],
        },
        {
            "id": 9,
            "name": "FINAL FANTASY XIV Online",
            "description": "Take part in an epic and ever-changing FINAL FANTASY as you adventure and explore with friends from around the world.",
            "price": 24.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/header.jpg?t=1646695302",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/2029865/movie480.webm?t=1447359267" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["MMORPG", "RPG", "Massively Multiplayer", "Fantasy"],
        },
        {
            "id": 10,
            "name": "Lost Ark",
            "description": "Embark on an odyssey for the Lost Ark in a vast, vibrant world: explore new lands, seek out lost treasures, and test yourself in thrilling action combat in this action-packed free-to-play RPG.",
            "price": "0.00",
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1599340/header.jpg?t=1668553287",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256916251/movie480_vp9.webm?t=1668553272" // trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["MMORPG", "Free To Play", "Action RPG", "Multiplayer"],
        },
        {
            "id": 11,
            "name": "God of War",
            "description": "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.",
            "price": 59.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg?t=1650554420",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256864004/movie480_vp9.webm?t=1639001817" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Action", "Singleplayer", "Adventure", "Story Rich", "3D"],
        },
        {
            "id": 12,
            "name": "Cyberpunk 2077",
            "description": "Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.",
            "price": 79.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?t=1663663573",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256904407/movie480_vp9.webm?t=1662480414" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Cyberpunk", "Open World", "RPG", "Nudity", "Sci-fi"],
        },
        {
            "id": 13,
            "name": "The Witcher® 3: Wild Hunt",
            "description": "As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.",
            "price": 55.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg?t=1668443314",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256658589/movie480.webm?t=1528288687" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Open World", "RPG", "Story Rich", "Atmospheric"],
        },
        {
            "id": 14,
            "name": "TEKKEN 7",
            "description": "Discover the epic conclusion of the long-time clan warfare between members of the Mishima family. Powered by Unreal Engine 4, the legendary fighting game franchise fights back with stunning story-driven cinematic battles and intense duels that can be enjoyed with friends and rivals.",
            "price": 49.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/header.jpg?t=1666949098",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256864020/movie480_vp9.webm?t=1638994619" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fighting", "Action", "Multiplayer", "Competitive"],
        },
        {
            "id": 15,
            "name": "SOULCALIBUR VI",
            "description": "Bring more than your fists to the fight! Featuring all-new battle mechanics and characters, SOULCALIBUR VI marks a new era of the historic franchise. Welcome back to the stage of history!",
            "price": 79.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/header.jpg?t=1646956219",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256807455/movie480_vp9.webm?t=1604033038" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fighting", "Action", "Character Customization", "Arcade"],
        },
        {
            "id": 16,
            "name": "Mortal Kombat 11",
            "description": "Mortal Kombat is back and better than ever in the next evolution of the iconic franchise.",
            "price": 69.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/header.jpg?t=1654216426",
            "pictures": [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256813084/movie480_vp9.webm?t=1607567246" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fighting", "Gore", "Violent", "Multiplayer", "Blood"],
        }
    ]
}
