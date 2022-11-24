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
            "picutres":[
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
            "picutres":[

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
            "price": 0.00,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1668125812",
            "picutres":[
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
            "picutres":[
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
            "picutres":[
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
            "picutres":[
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/header.jpg?t=1666108453",
            "picutres":[
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/39210/header.jpg?t=1646695302",
            "picutres":[
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1599340/header.jpg?t=1668553287",
            "picutres":[
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/header.jpg?t=1669235984",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256897088/movie480_vp9.webm?t=1658233223", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_ecb8cb71b127f9f6eea9bcdadddabd5b6d8f734f.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_f367fad018a2cc92530e3b8fc7dc8541dd21b71e.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_840ff7c3bd4209f2a35ba98fc19561089dce3f89.600x338.jpg?t=1669235984",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/ss_93dcd15dc501062b3f6e2b1575d278133d457e59.600x338.jpg?t=1669235984"
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg?t=1650554420",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256864004/movie480_vp9.webm?t=1639001817" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Action", "Singleplayer", "Adventure", "Story Rich", "3D"],
        },
        {
            "id": 12,
            "name": "ELDEN RING",
            "description": "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
            "price": 79.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg?t=1668042166",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256889452/movie480_vp9.webm?t=1654109247", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.600x338.jpg?t=1668042166",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_c372274833ae6e5437b952fa1979430546a43ad9.600x338.jpg?t=1668042166"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Souls-like", "Dark Fantasy", "RPG", "Difficult", "Action"],
        },
        {
            "id": 13,
            "name": "The Elder Scrolls V: Skyrim Special Edition",
            "description": "Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space reflections, and more.",
            "price": 53.49,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg?t=1650909796",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256672927/movie480.webm?t=1476991615", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_73c1a0bb7e1720c8a1847186c3ddd837d3ca7a8d.600x338.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_d64b646612ab1402bdda8e400672aa0dbcb352ea.600x338.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_921ccea650df936a0b14ebd5dd4ecc73c1d2a12d.600x338.jpg?t=1650909796",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/ss_5d19c69d33abca6f6271d75f371d4241c0d6b2d1.600x338.jpg?t=1650909796"
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?t=1663663573",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256904407/movie480_vp9.webm?t=1662480414" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Cyberpunk", "Open World", "RPG", "Nudity", "Sci-fi"],
        },
        {
            "id": 15,
            "name": "The Witcher® 3: Wild Hunt",
            "description": "As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.",
            "price": 55.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg?t=1668443314",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256658589/movie480.webm?t=1528288687" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Open World", "RPG", "Story Rich", "Atmospheric"],
        },
        {
            "id": 16,
            "name": "TEKKEN 7",
            "description": "Discover the epic conclusion of the long-time clan warfare between members of the Mishima family. Powered by Unreal Engine 4, the legendary fighting game franchise fights back with stunning story-driven cinematic battles and intense duels that can be enjoyed with friends and rivals.",
            "price": 49.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/header.jpg?t=1666949098",
            "picutres":[
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/544750/header.jpg?t=1646956219",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256807455/movie480_vp9.webm?t=1604033038" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fighting", "Action", "Character Customization", "Arcade"],
        },
        {
            "id": 18,
            "name": "Mortal Kombat 11",
            "description": "Mortal Kombat is back and better than ever in the next evolution of the iconic franchise.",
            "price": 69.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/976310/header.jpg?t=1654216426",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256813084/movie480_vp9.webm?t=1607567246" //trailer
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Fighting", "Gore", "Violent", "Multiplayer", "Blood"],
        }, //NEW 23-11
        {
            "id": 19,
            "name": "Warframe",
            "description": "Awaken as an unstoppable warrior and battle alongside your friends in this story-driven free-to-play online action game",
            "price": 0.00,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/header.jpg?t=1669152840",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256904810/movie480_vp9.webm?t=1662572584", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_2e4077f215eccde84171a4b8e0f2bc8a3264c776.600x338.jpg?t=1669152840",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_0a541a8bf59e212870ea8d82260ac1b3ae2d0354.600x338.jpg?t=1669152840",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_e1d1bfebe225c85ea284ffecfe279c2695ddf3a5.600x338.jpg?t=1669152840",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_b06620c448c51d2bc5b71144a184da9ba37b703e.600x338.jpg?t=1669152840"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Free To Play", "Action RPG", "Looter Shooter", "RPG"],
        },
        {
            "id": 20,
            "name": "Sid Meier’s Civilization® VI",
            "description": "Civilization VI is the newest installment in the award winning Civilization Franchise. Expand your empire, advance your culture and go head-to-head against history’s greatest leaders. Will your civilization stand the test of time?",
            "price": 79.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg?t=1669055236",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256672694/movie480.webm?t=1476736935", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_12cc6e1f4084de5bc0f66bfdbe3aaf3e59388b53.600x338.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_6c4a3cfb61f1a9677cf2ac549c2816a4e651f741.600x338.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_b2bf12299c38214fe520af0f724a6349d17ed330.600x338.jpg?t=1669055236",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/ss_36c63ebeb006b246cb740fdafeb41bb20e3b330d.600x338.jpg?t=1669055236"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Strategy", "Turn-Based Strategy", "Historical", "4X"],
        },
        {
            "id": 21,
            "name": "Divinity: Original Sin 2 - Definitive Edition",
            "description": "The critically acclaimed RPG that raised the bar, from the creators of Baldur's Gate 3. Gather your party. Master deep, tactical combat. Venture as a party of up to four - but know that only one of you will have the chance to become a God.",
            "price": 54.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/header.jpg?t=1668591196",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256694830/movie480.webm?t=1561485484", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_b59e5889726cab2cf01a93d0c0d192d25928952a.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_34a428cdd26113e8645b77331d9fc82fcc50a4a2.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_66d58326ebea7154d7f3d89e02f13913452caef7.600x338.jpg?t=1668591196",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/ss_d51d3ccb39019124c45bf851bbe6a76e2461fab3.600x338.jpg?t=1668591196"
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/header.jpg?t=1646157374",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256660485/movie480.webm?t=1454648692", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_a95cdbe487dbabf6621962fc92f438e26c5fdfd3.600x338.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_ca76303e136d2ea500b8e6546d4319502ae8862a.600x338.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_c42d24a1bd8a9d9d50cbda9772ca3aae5348ce0e.600x338.jpg?t=1646157374",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268500/ss_3aca7c3d18a0a99c49658fc939edd27235d17e5f.600x338.jpg?t=1646157374"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Strategy", "Turn-Based", "Turn-Based Strategy", "Sci-fi"],
        },
        {
            "id": 23,
            "name": "Battle Brothers",
            "description": "Battle Brothers is a turn based tactical RPG which has you leading a mercenary company in a gritty, low-power, medieval fantasy world. You decide where to go, whom to hire or to fight, what contracts to take and how to train and equip your men in a procedurally generated open world campaign.",
            "price": 32.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/header.jpg?t=1667298527",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256681083/movie480.webm?t=1489152119", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_2ed5eff851e0562800376e4903e9bf3a2dcdde76.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_c03600b98e321733a1cc9184f3e7150cfac8dffc.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_03699d4ce2eacbaeb5f493ae75332b586b09e1c0.600x338.jpg?t=1667298527",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/365360/ss_f78ccd2ce53431b5968230165704ec6a0d3fc613.600x338.jpg?t=1667298527"
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/header.jpg?t=1669150759",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256686761/movie480.webm?t=1635971432", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_659500624438a4aa77bfdf304cba3ecebcd92ed9.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_4075aac79adfe1a5b71665d2cc5ff7d52122650b.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_ca6b39f2fcac8feb75d23976b1be31290d58d159.600x338.jpg?t=1669150759",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/ss_430577c364a68dbe24e8a1d895bd678ea04b87d5.600x338.jpg?t=1669150759"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Horror", "Survival Horror", "Multiplayer", "Online Co-op", "Survival"],
        },
        {
            "id": 25,
            "name": "The Forest",
            "description": "As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first person survival horror simulator.",
            "price": 22.79,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/header.jpg?t=1666811027",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256715589/movie480.webm?t=1525039057", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_8ccb821c4df3fafdf4161d77f38635441a8157f2.600x338.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_53c615d49c4777144ed7359e4bf7c9eb6838cc8e.600x338.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_772eebf0ce7bdb51546055a36185e8ee46e8acac.600x338.jpg?t=1666811027",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/ss_233e1d0c71f1bc2d5cdeb96fa3f8974f0ab5e95d.600x338.jpg?t=1666811027"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Open World Survival Craft", "Survival", "Open World", "Horror", "Crafting"],
        },
        {
            "id": 26,
            "name": "Phasmophobia",
            "description": "Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and it’s up to you and your team to use all the ghost hunting equipment at your disposal in order to gather as much evidence as you can.",
            "price": 15.49,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg?t=1667574170",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256906135/movie480_vp9.webm?t=1663254571", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_91bca60a51dce60d680a8fb4efcdecf740b3a3d1.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_c9740361a95e60980b01bf122a1479536af10500.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_13dde9450dd7c7f70b31ccbaa16ac1f5d3822289.600x338.jpg?t=1667574170",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_59023d418d1825e574ad75911da34f5814a6bb9d.600x338.jpg?t=1667574170"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Horror", "Online Co-op", "Multiplayer", "Co-op", "VR"],
        },
        {
            "id": 27,
            "name": "Need for Speed™ Heat",
            "description": "Hustle by day and risk it all at night in Need for Speed™ Heat Deluxe Edition, a white-knuckle street racer, where the lines of the law fade as the sun starts to set.",
            "price": 89.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/header.jpg?t=1667318479",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256823664/movie480_vp9.webm?t=1614187437", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_4127c58a6a10124b4ba28375ec937a977aba37fc.600x338.jpg?t=1667318479",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_6994870577a41882c458cd00d852d8092116c81c.600x338.jpg?t=1667318479",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_720840b2cb26c38d0e4ad32085afb5f46b2bb6c6.600x338.jpg?t=1667318479",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/ss_4e3387eb370a80ca7c1e80309baa9d812a6caa8a.600x338.jpg?t=1667318479"
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/header.jpg?t=1666364639",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256904676/movie480_vp9.webm?t=1662696182", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_6d2cd663d938ac1c1f55150bd6a922664d9b1b78.600x338.jpg?t=1666364639",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_17a92f289bb32a76ac114538e31a7137b15ce576.600x338.jpg?t=1666364639",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_3442b58f34663fb7e548eef0ed1d113d5ac9fb2b.600x338.jpg?t=1666364639",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/ss_75b82770a268d1bcf98251e18646b823ea14bd08.600x338.jpg?t=1666364639"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Immersive Sim", "Sports", "Simulation", "Basketball"],
        },
        {
            "id": 29,
            "name": "EA SPORTS™ FIFA 23",
            "description": "Experience the excitement of the biggest tournament in football with EA SPORTS™ FIFA 23 and the men’s FIFA World Cup™ update, available on November 9 at no additional cost!",
            "price": 89.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header_alt_assets_0.jpg?t=1668091575",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256915486/movie480_vp9.webm?t=1668017731", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_55f92d533bc6acc5bf68020ee16a2f4740ffe31d.600x338.jpg?t=1668091575",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_b11ed2d9359cfce8e9c693c85c95b5e5ea12bcec.600x338.jpg?t=1668091575",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_a7952f00209d661a0f05899b6567a4ddc4c43deb.600x338.jpg?t=1668091575",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/ss_69881245fb65f08d2a8024ea21286abc82745939.600x338.jpg?t=1668091575"
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
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg?t=1668017884",
            "picutres":[
                "https://cdn.cloudflare.steamstatic.com/steam/apps/256875134/movie480_vp9.webm?t=1647525311", //trailer
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_cf56e25a0290556ba83229eb0ab370d10be0407c.600x338.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_00f0090174380eeaf8753bd3d1028b6772c3aebf.600x338.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_b65236b365315ebb6da6114ce42cd74b59cab3c8.600x338.jpg?t=1668017884",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_0a13a7ccd38e7c3e6a5f1720050732833b53b6a8.600x338.jpg?t=1668017884"
            ],
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["Racing", "Open World", "Driving", "Multiplayer", "PvP"],
        }
    ]
}
