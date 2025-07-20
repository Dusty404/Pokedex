let pokemonNummber = 20;
let PokeIndex = 1;
let pokeLoadNumber = 0;
let allPokemon = [];
let currentPokemons = [];
let pokemonSpecies = [];
let currentPokemonArray = [];
let currentStats = [];


async function loadPokedex() {
    loadingAnimation();
    for (PokeIndex; PokeIndex <= pokemonNummber; PokeIndex++) {
        await renderAllPokemon(PokeIndex);
        await renderPokemonSpecies(PokeIndex);
    }
    loadingAnimationEnd();
    initRenderPokemon();
}


function loadingAnimation() {
    document.getElementById('loadMoreButton').innerHTML = 'Lade Pokemon...';
    document.getElementById('pokeballMore').classList.remove('rotate');
    document.getElementById('pokeballMore').classList.add('rotate360');
    document.getElementById('pokeballMore2').classList.remove('rotate');
    document.getElementById('pokeballMore2').classList.add('rotate360');
}


async function renderAllPokemon(PokeIndex) {
    let url = `https://pokeapi.co/api/v2/pokemon/${PokeIndex}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    allPokemon.push(currentPokemon);
}


async function renderPokemonSpecies(PokeIndex) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${PokeIndex}`;
    let response = await fetch(url);
    let species = await response.json();
    pokemonSpecies.push(species);
}


function loadingAnimationEnd() {
    document.getElementById('pokeballMore').classList.add('rotate');
    document.getElementById('pokeballMore').classList.remove('rotate360');
    document.getElementById('pokeballMore2').classList.add('rotate');
    document.getElementById('pokeballMore2').classList.remove('rotate360');
    document.getElementById('loadMoreButton').innerHTML = 'Mehr Pokemon anzeigen';
}


function initRenderPokemon() {
    document.getElementById('loadMoreDiv').classList.remove('d-none');
    document.getElementById('loadMoreDiv').classList.add('loadMore');
    currentPokemons = allPokemon;
    renderPokemon();
}


function renderPokemon() {
    for (let i = pokeLoadNumber; i < currentPokemons.length; i++) {
        const pokemonArrayData = currentPokemons[i];
        renderPokemonHTML(pokemonArrayData, i);
        renderpokemonName(pokemonArrayData);
        renderPokemonTypes(pokemonArrayData, `${pokemonArrayData['name']} types`, i);
        pickBackgroundColorElement(pokemonArrayData);
    }
}


function renderpokemonName(pokemonArrayData) {
    let name = pokemonArrayData['name'];
    let upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById(`${pokemonArrayData['name']}`).innerHTML = upperCaseName;
}


function renderPokemonTypes(pokemonArrayData, TargetHTML, nr) {
    for (let i = 0; i < pokemonArrayData['types'].length; i++) {
        let types = pokemonArrayData['types'][i]['type']['name'];
        let upperCaseTypes = types.charAt(0).toUpperCase() + types.slice(1);
        document.getElementById(`${TargetHTML}`).innerHTML += `
        <p id="${pokemonArrayData['name']} types ${types}${nr}" class="types">${upperCaseTypes}</p>
        `;
        setTypeColor(types, pokemonArrayData, nr);
    }
}


function setTypeColor(types, pokemonArrayData, nr) {
    let pokemontype = pokemonArrayData['types'][0]['type']['name'];
    let typeColor = document.getElementById(`${pokemonArrayData['name']} types ${types}${nr}`);
    for (let i = 0; i < TypeAndColercode.length; i++) {
        const type = TypeAndColercode[i]['type'];
        if(pokemontype === type) {
            typeColor.style.background = TypeAndColercode[i]['typeColor'];
        }
    }
}


function pickBackgroundColorElement(pokemonArrayData) {
    let pokemontype = pokemonArrayData['types'][0]['type']['name'];
    let bgColor = document.getElementById(`pokemon ${pokemonArrayData['name']}`);
    setBackgroundColor(pokemontype, bgColor)
}


function setBackgroundColor(pokemontype, bgColor) {
    for (let i = 0; i < TypeAndColercode.length; i++) {
        const type = TypeAndColercode[i]['type'];
        const elemtColorLight = TypeAndColercode[i]['lightColor'];
        if(pokemontype === type) {
            bgColor.style.background = elemtColorLight;
        }
    }
}


function backgroundchange(pokemonArrayDataName, pokemonArrayDataType) {
    let backgroundColor = document.getElementById(`pokemon ${pokemonArrayDataName}`);
    for (let i = 0; i < TypeAndColercode.length; i++) {
        const type = TypeAndColercode[i]['type'];
        const elemtColor = TypeAndColercode[i]['color'];
        const elemtColorLight = TypeAndColercode[i]['lightColor'];
        mousOverOutFunction(pokemonArrayDataType, backgroundColor, type, elemtColor, elemtColorLight);
    }
}


function mousOverOutFunction(pokemonArrayDataType, backgroundColor, type, elemtColor, elemtColorLight) {
    if(pokemonArrayDataType === type) {
        let mouseOverFunction = function () {
            backgroundColor.style.background = elemtColor;
        }
        backgroundColor.onmouseover = mouseOverFunction;
        let mouseOutFunction = function () {
            backgroundColor.style.background = elemtColorLight;
        }
        backgroundColor.onmouseout = mouseOutFunction; 
    }
}


function pokemonBigPicture(i) {
    let background = document.querySelector(".bigPictureBackground");
    let nonclickevent = document.querySelector(".bigPictureBackgroundCardContainer");
    pokemonArrayData = currentPokemons[i];
    document.getElementById('body').classList.add('overflow-hidden');
    document.getElementById('pokemonBigPicture').classList.remove('d-none');
    background.addEventListener("click", closeBigPicture, false);
    nonclickevent.addEventListener("click", function(closeBigPicture){closeBigPicture.stopPropagation();}, false);
    renderPokemonBigPicture(pokemonArrayData);
    renderBigPicturePokemonDetailInfo(pokemonArrayData, i);
}


function renderPokemonBigPicture(pokemonArrayData, i) {
    let pokemontype = pokemonArrayData['types'][0]['type']['name'];
    let bgColor = document.getElementById('pokemonBigPictureTopCard');
    setBackgroundColor(pokemontype, bgColor);
    renderBigPicturePokemonTopCard(pokemonArrayData, i);
}


function pickPokemonAbilities() {
    let abilitiesArray = currentPokemonArray['abilities'];
    for (let i = 0; i < abilitiesArray.length; i++) {
        const abilities = abilitiesArray[i];
        if (i < abilitiesArray.length - 1) {
            document.getElementById('abilities').innerHTML += `
            ${abilities['ability']['name'].charAt(0).toUpperCase() + abilities['ability']['name'].slice(1)},
            `;
        } else {
            document.getElementById('abilities').innerHTML += `
             ${abilities['ability']['name'].charAt(0).toUpperCase() + abilities['ability']['name'].slice(1)}
            `;
        }
    }
}


function setPokemonAbilities() {
    currentStats = [];
    let statsArray = currentPokemonArray['stats'];
    for (let i = 0; i < statsArray.length; i++) {
        const stats = statsArray[i]['base_stat'];
        currentStats.push(stats);
    }
}


async function pickPokemonSpecies() {
    for (let i = 0; i < pokemonSpecies.length; i++) {
        spiciesArrayData = pokemonSpecies[i];
        if (currentPokemonArray['name'] === spiciesArrayData['name']) {
            loadAbout(spiciesArrayData);
        }
    }
}


function loadBaseStats() {
    document.getElementById('renderNavbarPick').innerHTML =`
    <canvas id="myChart"></canvas>
    `;
    renderStats();
}


function loadMoves() {
    console.log(currentPokemonArray)
    document.getElementById('renderNavbarPick').innerHTML = '<ol id="list"></ol>';
    for (let i = 0; i < currentPokemonArray['moves'].length && i < 30; i++) {
        const move = currentPokemonArray['moves'][i]['move']['name'];
        document.getElementById('list').innerHTML +=`
        <li>${move}</li>
        `;
    }
}


function previousPokemon(i) {
    if (i === 0) {
        i = allPokemon.length - 1;
    } else if (i > 0){
        i = i - 1;
    }
    pokemonBigPicture(i);
}


function nextPokemon(i) {
    if (i === allPokemon.length - 1) {
        i = 0;
    } else if (i < allPokemon.length - 1) {
        i = i + 1;
    }
    pokemonBigPicture(i);
}


function closeBigPicture() {
    document.getElementById('body').classList.remove('overflow-hidden');
    document.getElementById('pokemonBigPicture').classList.add('d-none');    
}


async function renderMore() {
    let button = document.getElementById("loadMoreButton");
    button.disabled = true;
    pokeLoadNumber = PokeIndex -1;
    PokeIndex = pokemonNummber +1;
    pokemonNummber = pokemonNummber + 10;
    await loadPokedex();
    button.disabled = false;
}


function filterPokemon() {
    pokeLoadNumber = 0;
    currentPokemons = [];
    let input = document.getElementById('searchBar').value;
    input = input.toLowerCase();
    loadMoreDisable();
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemonArrayData = allPokemon[i]['name'];
        if (pokemonArrayData.includes(input)) {
            currentPokemons.push(allPokemon[i]);
        }
    }
    document.getElementById('pokeDex').innerHTML = '';
    renderPokemon();
}


function resetFilter() {
    document.getElementById('loadMoreDiv').classList.remove('d-none');
    document.getElementById('loadMoreDiv').classList.add('loadMore');
    document.getElementById('pokeDex').innerHTML = '';
    document.getElementById('searchBar').value = '';
    initRenderPokemon()
}


function loadMoreDisable() {
    let input = document.getElementById('searchBar').value;
    if (input === '') {
        document.getElementById('loadMoreDiv').classList.remove('d-none');
        document.getElementById('loadMoreDiv').classList.add('loadMore');
    } else {
        document.getElementById('loadMoreDiv').classList.add('d-none');
        document.getElementById('loadMoreDiv').classList.remove('loadMore');
    }
}