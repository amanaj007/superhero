let offsetPage = 0;

// Function to fetch superheroes from the Marvel API
async function fetchSuperheroes(pageNum) {
  let ts = Date.now();

  //public and private keys
  let publicKey = "88aab5aad13abc034b1ffce00eb96f02";
  let privateKey = "3b322d7e31238d9e23cafabf32576f204ec8807f";

  //creating the md5 hash using an api
  let hash = await fetch(
    `https://api.hashify.net/hash/md5/hex?value=${ts + privateKey + publicKey}`
  );
  let has = await hash.json();

  let result = await fetch(
    `https://gateway.marvel.com/v1/public/characters?offset=${pageNum}&ts=${ts}&apikey=${publicKey}&hash=${has.Digest}`
  );
  let fetchedresult = await result.json();

  displaySuperheroes(fetchedresult.data.results);
}

// function to display superheroes on the home page
function displaySuperheroes(superheroes) {
  const superheroesList = document.getElementById("superheroesList");
  superheroesList.innerHTML = "";

  //looping through the array of superheroes
  superheroes.forEach((superhero) => {
    const superheroItem = document.createElement("div");
    superheroItem.classList.add("superhero-item");

    const superheroLink = document.createElement("a");
    const superHeroh2 = document.createElement("h2");

    //link to the superhero page with superhero id as query parameter
    superheroLink.href = `superhero.html?id=${superhero.id}`;
    superHeroh2.textContent = superhero.name;

    const img = document.createElement("img");
    img.setAttribute("src", `${superhero.thumbnail.path}.jpg`);

    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Add to Favorites";
    favoriteButton.addEventListener("click", () => addToFavorites(superhero));

    superheroLink.appendChild(superHeroh2);
    superheroLink.appendChild(img);
    superheroItem.appendChild(superheroLink);
    superheroItem.appendChild(favoriteButton);
    superheroesList.appendChild(superheroItem);
  });
}

// function to add a superhero to favorites using localstorage
function addToFavorites(superhero) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the superhero already exists in the favorites list
  const isDuplicate = favorites.some((item) => item.id === superhero.id);
  if (!isDuplicate) {
    favorites.push(superhero);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Superhero added to favorites!");
  } else {
    alert("Superhero already exists in favorites!");
  }
}

let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", searchSuperHero);

//function to fetch the list of search results and display the superheroes
async function searchSuperHero(event) {
  const superheroesList = document.getElementById("superheroesList");
  superheroesList.innerHTML = "";
  let superheroName = event.target.value;
  let ts = Date.now();

  let publicKey = "88aab5aad13abc034b1ffce00eb96f02";
  let privateKey = "3b322d7e31238d9e23cafabf32576f204ec8807f";

  //creating the md5 hash using an api
  let hash = await fetch(
    `https://api.hashify.net/hash/md5/hex?value=${ts + privateKey + publicKey}`
  );
  let has = await hash.json();

  let result = await fetch(
    `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${superheroName}&ts=${ts}&apikey=${publicKey}&hash=${has.Digest}`
  );
  let fetchedResult = await result.json();
  displaySuperheroes(fetchedResult.data.results);
}

//functionalities of next button
let nextButton = document.getElementById("next");
nextButton.addEventListener("click", fetchNextPage);
function fetchNextPage() {
  if (offsetPage == 78) {
    offsetPage = 78;
  } else {
    offsetPage += 1;
  }
  fetchSuperheroes(offsetPage);
}

//functionalities of previous button
let prevButton = document.getElementById("previous");
prevButton.addEventListener("click", fetchPreviousPage);
function fetchPreviousPage() {
  if (offsetPage == 0) {
    offsetPage = 0;
  } else {
    offsetPage -= 1;
  }
  fetchSuperheroes(offsetPage);
}

fetchSuperheroes(offsetPage);
