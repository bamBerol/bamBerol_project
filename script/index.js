document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelector(".categories");
  const categoryCard = document.querySelector(".categoryCard");

  CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

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
    //console.log(categoryCard);
    categories.appendChild(categoryCard);
    cardTitle(category);

    //console.log(document.getElementsByClassName(".categories"));
  };

  let cardTitle = (category) => {
    console.log(category.strCategory);
    let categoryTitle = document.createElement("div");
    categoryTitle.classList.add("categoryTitle");
    let h2 = document.createElement("h2");
    h2.innerHTML = category.strCategory;

    console.log(categoryCard);
    /*categoryTitle.appendChild(h2);
    categoryCard.appendChild(cardTitle);
    console.log(cardTitle);
    */
  };
});
