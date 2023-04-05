document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelector(".categories");
  const welcomeDiv = document.querySelector(".welcome");
  const top = document.querySelector(".top");
  const mainView = document.querySelector(".mainView");
  const activitiesCategories = document.querySelector(".activitiesCategories");
  const activitiesSearch = document.querySelector(".activitiesSearch");
  const activities = document.querySelector(".activities");
  const mealRecipes = document.querySelector(".mealRecipes");
  const searchTitle = document.querySelector(".searchTitle");
  const search = document.querySelector(".search");
  const inputSearch = document.querySelector(".inputSearch");
  const inputHeader = document.querySelector(".inputHeader");
  const footerText = document.querySelector(".footerText");

  CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

  let mealsList = [];
  let categoryMeals = [];

  //* SET CURRENT YEAR
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
    categoryCard.classList.add("showCard");

    let categoryTitle = document.createElement("div");
    categoryTitle.classList.add("categoryTitle");
    categoryTitle.classList.add("centerFlex");
    let h2 = document.createElement("h2");
    h2.innerHTML = category.strCategory;

    let categoryPhoto = document.createElement("div");
    categoryPhoto.classList.add("categoryPhoto");
    categoryPhoto.style.backgroundImage = `url(${category.strCategoryThumb})`;
    categoryPhoto.style.backgroundPosition = "center";
    categoryPhoto.alt = `${category.strCategory} photo`;

    categoryCard.appendChild(categoryPhoto);
    categoryTitle.appendChild(h2);
    categoryCard.appendChild(categoryTitle);
    categories.appendChild(categoryCard);

    categoryCard.addEventListener("click", () => {
      chooseCategory(category);
    });
  };

  //* CREATE CARDS FOR MEALS
  let createCardMeal = (mealsList) => {
    //console.log(mealsList);
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
    mealPhoto.style.backgroundRepeat = "no-repeat";
    mealPhoto.style.backgroundPosition = "center";
    mealPhoto.style.backgroundSize = "90%";
    mealPhoto.alt = `${mealsList.strMeal} photo`;

    mealCard.appendChild(mealPhoto);
    mealTitle.appendChild(h2);
    mealCard.appendChild(mealTitle);
    mealRecipes.appendChild(mealCard);

    mealCard.addEventListener("click", () => {
      //console.log(mealsList);
      mealDetail(mealsList);
    });
  };

  //* SHOW MEALS LIST AFTER CHOOSE CATEGORY
  let chooseCategory = (category) => {
    //console.log(category.idCategory, category.strCategory);
    categories.classList.remove("divOn");
    categories.classList.add("divOff");
    mealRecipes.classList.remove("divOff");
    mealRecipes.classList.add("divOn");

    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (categoryMeals === []) {
          categoryMeals.push(data.meals);
        } else {
          categoryMeals.shift();
          mealRecipes.innerHTML = "";
          categoryMeals.push(data.meals);
        }
        categoryMeals[0].map((meal) => {
          createCardMeal(meal);
        });
      });
  };

  //* SHOW RECIPE DETAIL
  let mealDetail = (mealDetail) => {
    console.log(mealDetail);
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
          createCard(category);
        });
      });
    //console.log("categories clicked");
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
    if (e.keyCode === 13 && inputSearch.value !== "") {
      inputHeader.appendChild(inputSearch);
      inputHeader.classList.remove("divOff");
      top.classList.add("topInput");
      mealRecipes.classList.remove("divOff");
      mealRecipes.classList.add("divOn");
      searchTitle.classList.add("divOff");
      search.classList.remove("divOn");
      search.classList.add("divOff");
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.meals);
          if (mealsList === []) {
            mealsList.push(data.meals);
          } else {
            mealsList.shift();
            mealRecipes.innerHTML = "";
            mealsList.push(data.meals);
          }
          mealsList[0].map((meal) => {
            createCardMeal(meal);
            inputSearch.value = "";
            //console.log(mealsList);
          });
        });
    }
  });
});
