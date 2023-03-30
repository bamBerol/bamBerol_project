document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  const categories = document.querySelector(".categories");
  const welcomeDiv = document.querySelector(".welcome");
  const mainView = document.querySelector(".mainView");
  const activitiesCategories = document.querySelector(".activitiesCategories");
  const activitiesSearch = document.querySelector(".activitiesSearch");
  const activities = document.querySelector(".activities");
  const mealRecipes = document.querySelector(".mealRecipes");
  const searchTitle = document.querySelector(".searchTitle");
  const search = document.querySelector(".search");
  const inputSearch = document.querySelector(".inputSearch");
  const footerText = document.querySelector(".footerText");

  CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

  let mealsList;

  //* Set current year in footer
  const date = new Date();
  let year = date.getFullYear();
  footerText.innerHTML = `&copy; devTro ${year} All Rights Reserved.`;

  //* CREATE CARDS FOR CATEGORIES
  let createCard = (category) => {
    //console.log(category);
    let categoryCard = document.createElement("div");
    categoryCard.setAttribute("id", `${category.idCategory}`);
    categoryCard.classList.add("categoryCard");
    categoryCard.classList.add("centerFlex");

    let categoryTitle = document.createElement("div");
    categoryTitle.classList.add("categoryTitle");
    categoryTitle.classList.add("centerFlex");
    let h2 = document.createElement("h2");
    h2.innerHTML = category.strCategory;

    let categoryPhoto = document.createElement("div");
    categoryPhoto.classList.add("categoryPhoto");
    categoryPhoto.style.backgroundImage = `url(${category.strCategoryThumb})`;
    categoryPhoto.alt = `${category.strCategory} photo`;

    categoryCard.appendChild(categoryPhoto);
    categoryTitle.appendChild(h2);
    categoryCard.appendChild(categoryTitle);
    categories.appendChild(categoryCard);
    //console.log(catCard);
  };

  let createCardMeal = (mealsList) => {
    console.log(mealsList);
    let mealCard = document.createElement("div");
    mealCard.setAttribute("id", `${mealsList.idMeal}`);
    mealCard.classList.add("mealCard");
    mealCard.classList.add("centerFlex");

    let mealTitle = document.createElement("div");
    mealTitle.classList.add("mealTitle");
    mealTitle.classList.add("centerFlex");
    let h2 = document.createElement("h2");
    h2.innerHTML = mealsList.strMeal;

    let mealPhoto = document.createElement("div");
    mealPhoto.classList.add("mealPhoto");
    mealPhoto.style.backgroundImage = `url(${mealsList.strMealThumb})`;
    mealPhoto.alt = `${mealsList.strMeal} photo`;

    mealCard.appendChild(mealPhoto);
    mealTitle.appendChild(h2);
    mealCard.appendChild(mealTitle);
    mealRecipes.appendChild(mealCard);
  };

  //* HIDE WELCOME DIV
  welcomeDiv.addEventListener(
    "click",
    (showMainView = () => {
      console.log("welcome click, main view showed");
      console.log(welcomeDiv.classList.contains("divOff"));
      if (welcomeDiv.className !== "divOff") {
        welcomeDiv.classList.remove("divOn");
        welcomeDiv.classList.add("divOff");
        mainView.classList.remove("divOff");
        mainView.classList.add("divOn");
      } else {
      }
    })
  );

  //*SHOW CATEGORIES
  activitiesCategories.addEventListener("click", () => {
    //* DOWNLOADS CATEGORIES FROM API
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        data.categories.map((category) => {
          //console.log(category);
          createCard(category);
        });
      });
    console.log("categories clicked");
    activities.classList.add("divOff");
    categories.classList.remove("divOff");
    categories.classList.add("divOn");
  });

  //*SHOW SEARCH
  activitiesSearch.addEventListener("click", () => {
    console.log("search clicked");
    activities.classList.add("divOff");
    search.classList.remove("divOff");
    search.classList.add("divOn");
  });

  //*SEARCH RECIPE BY NAME
  inputSearch.addEventListener("keyup", (e) => {
    mealName = e.target.value;
    if (e.keyCode === 13 && inputSearch.value !== "")
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then((res) => res.json())
        .then((data) => {
          mealsList = data.meals;
          mealsList.map((meal) => {
            createCardMeal(meal);
          });
          inputSearch.value = "";
          searchTitle.classList.add("divOff");
          console.log(mealsList);
        });
  });
});
