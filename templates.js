function renderPokemonHTML(pokemonArrayData, i) {
    document.getElementById('pokeDex').innerHTML += `
    <div id="pokemon ${pokemonArrayData['name']}" class="pokemon" onclick="pokemonBigPicture('${i}')" onmouseover="backgroundchange('${pokemonArrayData['name']}', '${pokemonArrayData['types'][0]['type']['name']}')">
        <div class="pokemonId">
            <p id="${pokemonArrayData['id']}">#${pokemonArrayData['id']}</p>
        </div>
        <p id="${pokemonArrayData['name']}" class="pokemonName"><b></b></p>
        <div class="pokemonSmallInfo">
            <div id="${pokemonArrayData['name']} types" class="type"></div>
            <img class="pokemonImg" src="${pokemonArrayData['sprites']['other']['official-artwork']['front_default']}" onmouseover="backgroundchange('${pokemonArrayData['name']}', '${pokemonArrayData['types'][0]['type']['name']}')">
        </div>
    </div>
    `;
}


function renderBigPicturePokemonTopCard(pokemonArrayData, i) {
    let pokeName = pokemonArrayData['name'];
    let TargetHTML = 'bigPictureTypes';
    document.getElementById('pokemonBigPictureTopCard').innerHTML = `
        <div id="bigPictureTopCard" class="bigPictureTopCardInfo">
            <div class="bigPictureNameAndType">
                <h1>${pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}</h1>
                <p id="${pokemonArrayData['id']}" class="pokemonId">#${pokemonArrayData['id']}</p>
            </div>
            <div id="bigPictureTypes" class="bigPictureTypes"></div>
        </div>
    `;
    renderPokemonTypes(pokemonArrayData, TargetHTML, i);
}


function renderBigPicturePokemonDetailInfo(pokemonArrayData, i) {
    currentPokemonArray = pokemonArrayData;
    setPokemonAbilities();
    let pokeImg = currentPokemonArray['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonBigPictureBottomCard').innerHTML = `
    <div class="bigPictureMenu">
        <img id="nextArrowLeft" class="nextArrowLeft" src="./img/arrow-left-solid.svg" onclick="previousPokemon(${i})">
        <img id="close" class="close" src="./img/xmark-solid.svg" onclick="closeBigPicture()">
        <img id="nextArrowRight" class="nextArrowRight" src="./img/arrow-right-solid.svg" onclick="nextPokemon(${i})">
    </div>
    <div class="bigPictureImg">
        <img src="${pokeImg}" class="pokeImg">
    </div>
    <div id="navbar" class="navbar">
        <p id="about" class="marked" onclick="pickPokemonSpecies(), markAbout()">About</p>
        <p id="baseStats" onclick="loadBaseStats(), markBaseStats()">Base-Stats</p>
        <p id="moves" onclick="loadMoves(), markMoves()">Moves</p>
    </div>
    <div id="renderNavbarPick" class="renderNavbarPick"></div>
    `;
    pickPokemonSpecies();
}


function loadAbout(spiciesArrayData) {
    document.getElementById('renderNavbarPick').innerHTML = `
    <div class="aboutMain">
        <div class="aboutTop">
            <div class="Left">
                <p class="aboutInfo">Species</p>
                <p class="aboutInfo">Height</p>
                <p class="aboutInfo">Weight</p>
                <p class="aboutInfo">Abilities</p>
            </div>
            <div class="Right">
                <p>${spiciesArrayData['genera']['7']['genus']}</p>
                <p>${currentPokemonArray['height'] / 10}m</p>
                <p>${currentPokemonArray['weight'] / 10}kg</p>
                <p class="abilities" id="abilities"></p>
            </div>
        </div>
        <div class="aboutBottom">
            <div class="Left">
                <p class="aboutInfo">Base Happiness</p>
                <p class="aboutInfo">Capture Rate</p>
                <p class="aboutInfo">Growth Rate</p>
                <p class="aboutInfo">Habitat</p>
            </div>
            <div class="Right">
                <p>${spiciesArrayData['base_happiness']}</p>
                <p>${spiciesArrayData['capture_rate']}</p>
                <p>${spiciesArrayData['growth_rate']['name']}</p>
                <p>${spiciesArrayData['habitat']['name'].charAt(0).toUpperCase() + spiciesArrayData['habitat']['name'].slice(1)}</p>
            </div>
        </div>
    </div>
    `;
    pickPokemonAbilities();
}


function markAbout() {
    document.getElementById('about').classList.add('marked');
    document.getElementById('baseStats').classList.remove('marked');
    document.getElementById('moves').classList.remove('marked');
}


function markBaseStats() {
    document.getElementById('baseStats').classList.add('marked');
    document.getElementById('about').classList.remove('marked');
    document.getElementById('moves').classList.remove('marked');
}


function markMoves() {
    document.getElementById('moves').classList.add('marked');
    document.getElementById('baseStats').classList.remove('marked');
    document.getElementById('about').classList.remove('marked');
}