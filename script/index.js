document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  const categories = document.querySelector(".categories");
  const welcomeDiv = document.querySelector(".welcome");
  const mainView = document.querySelector(".mainView");
  const activitiesCategories = document.querySelector(".activitiesCategories");
  const activitiesSearch = document.querySelector(".activitiesSearch");
  const footerText = document.querySelector(".footerText");

  CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

  const date = new Date();
  let year = date.getFullYear();
  footerText.innerHTML = `&copy; devTro ${year} All Rights Reserved.`;

  //* DOWNLOADS CATEGORIES FROM API

  fetch(CATEGORIES_URL)
    .then((res) => res.json())
    .then((data) => {
      data.categories.map((category) => {
        //console.log(category);
        createCard(category);
      });
    });

  //* CREATE CARD FOR EVERY CATEGORY

  let createCard = (category) => {
    //console.log(category);
    let categoryCard = document.createElement("div");
    categoryCard.setAttribute("id", `${category.idCategory}`);
    categoryCard.classList.add("categoryCard");

    let categoryTitle = document.createElement("div");
    categoryTitle.classList.add("categoryTitle");
    let h2 = document.createElement("h2");
    h2.innerHTML = category.strCategory;

    let categoryPhoto = document.createElement("div");
    categoryPhoto.classList.add("categoryPhoto");

    let categoryImg = document.createElement("img");
    categoryImg.src = `${category.strCategoryThumb}`;
    categoryImg.alt = `${category.strCategory} photo`;

    categoryPhoto.appendChild(categoryImg);

    categoryCard.appendChild(categoryPhoto);
    categoryTitle.appendChild(h2);
    categoryCard.appendChild(categoryTitle);
    categories.appendChild(categoryCard);
    //console.log(categoryCard);
  };

  //* Hide welcome div

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

  activitiesCategories.addEventListener("click", () => {
    console.log("categories clicked");
  });
  activitiesSearch.addEventListener("click", () => {
    console.log("search clicked");
  });
});
