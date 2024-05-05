// Function to fetch and display detailed information about a superhero
async function fetchSuperheroDetails() {
  //getting the id from search params
  const params = new URLSearchParams(window.location.search);
  const superheroId = params.get("id");

  let ts = Date.now();

  //public and private keys
  let publicKey = "88aab5aad13abc034b1ffce00eb96f02";
  let privateKey = "3b322d7e31238d9e23cafabf32576f204ec8807f";

  let hash = await fetch(
    `https://api.hashify.net/hash/md5/hex?value=${ts + privateKey + publicKey}`
  );
  let has = await hash.json();

  let result = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${superheroId}?&ts=${ts}&apikey=${publicKey}&hash=${has.Digest}`
  );
  let fetchedResult = await result.json();

  displaySuperheroDetails(fetchedResult.data.results[0]);
}

// Function to display superhero details
function displaySuperheroDetails(superhero) {
  const superheroDetails = document.getElementById("superheroDetails");
  superheroDetails.innerHTML = "";

  const superheroDiv = document.createElement("div");
  const superheroDiv2 = document.createElement("div");
  const comicsDiv = document.createElement("div");
  const eventsDiv = document.createElement("div");
  const seriesDiv = document.createElement("div");
  const storiesDiv = document.createElement("div");

  //superhero image
  const img = document.createElement("img");
  img.setAttribute("src", `${superhero.thumbnail.path}.jpg`);

  //Superhero name heading
  const superheroName = document.createElement("h1");
  superheroName.textContent = superhero.name;

  const superheroDesc = document.createElement("p");
  superheroDesc.textContent = superhero.description;

  //comics, events, series, stories
  const comicsHeading = document.createElement("h2");
  comicsHeading.textContent = "Comics";

  const eventsHeading = document.createElement("h2");
  eventsHeading.textContent = "Events";

  const seriesHeading = document.createElement("h2");
  seriesHeading.textContent = "Series";

  const storiesHeading = document.createElement("h2");
  storiesHeading.textContent = "Stories";

  comicsDiv.appendChild(comicsHeading);
  eventsDiv.appendChild(eventsHeading);
  seriesDiv.appendChild(seriesHeading);
  storiesDiv.appendChild(storiesHeading);

  //looping and appending items in comics, events, series and stories in their respective sections
  superhero.comics.items.forEach((comic) => {
    const comicItem = document.createElement("li");
    comicItem.textContent = comic.name;
    comicsDiv.appendChild(comicItem);
  });

  superhero.events.items.forEach((event) => {
    const eventItem = document.createElement("li");
    eventItem.textContent = event.name;
    eventsDiv.appendChild(eventItem);
  });

  superhero.series.items.forEach((series) => {
    const seriesItem = document.createElement("li");
    seriesItem.textContent = series.name;
    seriesDiv.appendChild(seriesItem);
  });

  superhero.stories.items.forEach((story) => {
    const storyItem = document.createElement("li");
    storyItem.textContent = story.name;
    storiesDiv.appendChild(storyItem);
  });

  superheroDiv.appendChild(img);

  superheroDiv2.appendChild(superheroName);
  superheroDiv2.appendChild(superheroDesc);
  superheroDiv2.appendChild(comicsDiv);
  superheroDiv2.appendChild(eventsDiv);
  superheroDiv2.appendChild(seriesDiv);
  superheroDiv2.appendChild(storiesDiv);

  //two separate divs for image and details
  superheroDetails.appendChild(superheroDiv);
  superheroDetails.appendChild(superheroDiv2);
}

fetchSuperheroDetails();
