// Function to display favorite superheroes
function displayFavorites() {
  const favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = "";

  //getting the items from localstorage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach((superhero) => {
    const superheroItem = document.createElement("div");
    superheroItem.classList.add("superhero-item");

    const superheroLink = document.createElement("a");
    superheroLink.href = `superhero.html?id=${superhero.id}`;

    const img = document.createElement("img");
    img.setAttribute("src", `${superhero.thumbnail.path}.jpg`);

    const superheroName = document.createElement("h2");
    superheroName.textContent = superhero.name;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove from Favorites";
    removeButton.addEventListener("click", () =>
      removeFromFavorites(superhero)
    );

    superheroLink.appendChild(superheroName);
    superheroLink.appendChild(img);
    superheroItem.appendChild(superheroLink);
    superheroItem.appendChild(removeButton);
    favoritesList.appendChild(superheroItem);
  });
}

// Function to remove a superhero from favorites
function removeFromFavorites(superhero) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((item) => item.id !== superhero.id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

displayFavorites();
