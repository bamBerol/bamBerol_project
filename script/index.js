document.addEventListener("DOMContentLoaded", () => {
  const headerLogo = document.querySelector(".headerLogo");
  const loader = document.querySelector(".loader");
  const categories = document.querySelector(".categories");
  const welcomeDiv = document.querySelector(".welcome");
  const top = document.querySelector(".top");
  const mainView = document.querySelector(".mainView");
  const activitiesCategories = document.querySelector(".activitiesCategories");
  const activitiesSearch = document.querySelector(".activitiesSearch");
  const activities = document.querySelector(".activities");
  const mealRecipes = document.querySelector(".mealRecipes");
  const recipe = document.querySelector(".recipe");
  const instructionsDetail = document.querySelector(".instructionsDetail");
  const list = document.querySelector(".ingredientsList");
  const recipeTitle = document.querySelector(".recipeTitle");
  const searchTitle = document.querySelector(".searchTitle");
  const search = document.querySelector(".search");
  const inputDiv = document.querySelector(".inputDiv");
  const inputSearch = document.querySelector(".inputSearch");
  const inputHeader = document.querySelector(".inputHeader");
  const bgPhoto = document.querySelector(".backgroundPhoto");
  const errorMsg = document.querySelector(".error");
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
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsList.strMeal}`
      )
        .then((res) => res.json())
        .then((data) => {
          mealDetail(data.meals[0]);
        });
    });
  };

  //* SHOW MEALS LIST AFTER CHOOSE CATEGORY
  let chooseCategory = (category) => {
    categories.classList.remove("divOn");
    categories.classList.add("divOff");
    mealRecipes.classList.remove("divOff");
    mealRecipes.classList.add("divOn");

    if (mealRecipes.hasChildNodes()) {
      mealRecipes.innerHTML = "";
      loader.classList.remove("divOff");
      loader.classList.add("divOn");
      mealRecipes.appendChild(loader);
    } else {
      loader.classList.remove("divOff");
      loader.classList.add("divOn");
      mealRecipes.appendChild(loader);
    }

    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        loader.classList.remove("divOn");
        loader.classList.add("divOf");
        console.log(data.meals);
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
        let info =
          document.querySelector(".categoryCard").parentElement.classList[0];
        backButton(info);
      });
  };

  //* SHOW RECIPE DETAIL
  let mealDetail = (mealDetail) => {
    mealRecipes.classList.remove("divOn");
    mealRecipes.classList.add("divOff");
    recipe.classList.remove("divOff");
    recipe.classList.add("divOn");

    //bgPhoto.style.backgroundImage = `url(${mealDetail.strMealThumb})`;
    //bgPhoto.style.backgroundRepeat = "no-repeat";
    //bgPhoto.style.backgroundPosition = "center";
    //bgPhoto.alt = `${mealDetail.strMeal} photo`;

    let title = document.createElement("h2");
    title.innerHTML = `${mealDetail.strMeal}`;

    recipeTitle.appendChild(title);
    bgPhoto.appendChild(recipeTitle);

    showInstr(mealDetail);

    document.querySelector(".back").addEventListener("click", () => {
      backBtn();
    });
  };

  //* BACK TO MEALS LIST
  let backBtn = () => {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    while (instructionsDetail.firstChild) {
      instructionsDetail.removeChild(instructionsDetail.firstChild);
    }
    while (recipeTitle.firstChild) {
      recipeTitle.removeChild(recipeTitle.firstChild);
    }

    mealRecipes.classList.remove("divOff");
    mealRecipes.classList.add("divOn");
    recipe.classList.remove("divOn");
    recipe.classList.add("divOff");
  };

  //* BACK BUTTON
  let backButton = (infoParent) => {
    let backToCategory = document.createElement("div");
    backToCategory.classList.add("backBtn");
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-arrow-left", "fa-lg");

    backToCategory.appendChild(icon);

    console.log(infoParent);

    infoParent === "categories"
      ? backToCat(backToCategory)
      : infoParent === "activitiesOption"
      ? backToActv(backToCategory)
      : infoParent === "activitiesSearch"
      ? backToActive(backToCategory)
      : "";
  };

  let backToCat = (backToCategory) => {
    console.log("back to cat");
    mealRecipes.appendChild(backToCategory);
    backToCategory.addEventListener("click", () => {
      backToCategories();
    });
  };

  let backToCategories = () => {
    mealRecipes.innerHTML = "";
    mealRecipes.classList.remove("divOn");
    mealRecipes.classList.add("divOff");
    categories.classList.remove("divOff");
    categories.classList.add("divOn");

    while (mealRecipes.firstChild) {
      mealRecipes.removeChild(mealRecipes.firstChild);
    }
  };

  let backToActv = (backToCategory) => {
    console.log(backToCategory);
    categories.appendChild(backToCategory);
    backToCategory.addEventListener("click", () => {
      backToActivities();
    });
  };

  let backToActivities = () => {
    console.log("back");
    categories.innerHTML = "";
    categories.classList.remove("divOn");
    categories.classList.add("divOff");
    activities.classList.remove("divOff");
    activities.classList.add("divOn");
  };

  let backToActive = (backToCategory) => {
    console.log("back from search");
    search.appendChild(backToCategory);
    backToCategory.addEventListener("click", () => {
      backToActiv();
    });
  };

  let backToActiv = () => {
    search.removeChild(search.lastChild);
    search.classList.remove("divOn");
    search.classList.add("divOff");
    activities.classList.remove("divOff");
    activities.classList.add("divOn");
  };

  //*SHOW RECIPE INSTRUCTIONS
  let showInstr = (mealDetail) => {
    console.log("instr show", mealDetail);
    let instr = document.querySelector(".instructionsDetail");
    let prepTitle = document.createElement("h3");
    const regEx = /STEP|\r?\n|\r/g;

    prepTitle.innerHTML = "Preparation:";
    instr.appendChild(prepTitle);

    mealDetail.strInstructions.split(regEx).map((elmt) => {
      if (elmt !== "") {
        let p = document.createElement("p");

        p.innerHTML = elmt;
        instr.appendChild(p);
      }
    });

    ingredientsList(mealDetail);
  };

  //* SHOW INGREDIENTS LIST
  let ingredientsList = (mealDetail) => {
    let ingrListTitle = document.createElement("h3");
    ingrListTitle.innerHTML = "Ingredients:";

    let ingredients = Object.keys(mealDetail).filter((el) =>
      el.includes("Ingredient")
    );

    let filterIngredients = Object.keys(mealDetail)
      .filter((key) => ingredients.includes(key))
      .reduce((obj, key) => {
        obj[key] = mealDetail[key];
        return obj;
      }, {});

    let nameOfIngredient = Object.values(filterIngredients).filter(
      (n) => n !== ""
    );

    let measures = Object.keys(mealDetail).filter((el) =>
      el.includes("Measure")
    );

    let filterMeasure = Object.keys(mealDetail)
      .filter((key) => measures.includes(key))
      .reduce((obj, key) => {
        obj[key] = mealDetail[key];
        return obj;
      }, {});

    let quantity = Object.values(filterMeasure).filter(
      (q) => q !== " " && q !== null
    );

    let quantityOfIngredients = quantity.map((value, i) => {
      return nameOfIngredient[i] + " " + value;
    });

    quantityOfIngredients.splice(quantityOfIngredients.indexOf("null "));
    quantityOfIngredients.splice(quantityOfIngredients.indexOf("undefined "));

    list.appendChild(ingrListTitle);
    showMeasures(quantityOfIngredients);
  };

  //*SHOW MEASURES
  let showMeasures = (ingrMeas) => {
    console.log(ingrMeas);
    let ul = document.createElement("ul");
    if (ingrMeas !== "undefined ") {
      ingrMeas.forEach((elmt) => {
        let li = document.createElement("li");
        li.innerHTML = elmt;
        ul.appendChild(li);
      });
    }
    list.appendChild(ul);
  };

  //* RELOAD PAGE
  headerLogo.addEventListener(
    "click",
    (pageReload = () => {
      console.log("reload clicked");
      window.location.reload();
    })
  );

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
    categories.appendChild(loader);
    loader.classList.remove("divOff");
    loader.classList.add("divOn");
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        loader.classList.remove("divOn");
        loader.classList.add("divOff");
        data.categories.map((category) => {
          createCard(category);
        });
      });
    activities.classList.add("divOff");
    categories.classList.remove("divOff");
    categories.classList.add("divOn");

    let parentInfo = activitiesCategories.parentElement.classList[0];
    backButton(parentInfo);
  });

  //*SHOW SEARCH
  activitiesSearch.addEventListener("click", (e) => {
    let parentInfo = e.target.className;

    activities.classList.add("divOff");
    search.classList.remove("divOff");
    search.classList.add("divOn");

    backButton(parentInfo);
  });

  //*SEARCH RECIPE BY NAME
  inputSearch.addEventListener("keyup", (e) => {
    mealName = e.target.value;
    if (e.keyCode === 13 && inputSearch.value !== "") {
      inputHeader.appendChild(inputDiv);
      inputHeader.classList.remove("divOff");
      top.classList.add("topInput");
      mealRecipes.classList.remove("divOff");
      mealRecipes.classList.add("divOn");
      searchTitle.classList.add("divOff");
      search.classList.remove("divOn");
      search.classList.add("divOff");

      if (mealRecipes.hasChildNodes()) {
        mealRecipes.innerHTML = "";
        loader.classList.remove("divOff");
        loader.classList.add("divOn");
        mealRecipes.appendChild(loader);
      } else {
        loader.classList.remove("divOff");
        loader.classList.add("divOn");
        mealRecipes.appendChild(loader);
      }

      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then((res) => res.json())
        .then((data) => {
          loader.classList.remove("divOn");
          loader.classList.add("divOff");
          if (data.meals === null) {
            inputSearch.value = "";
            mealsList.shift();
            mealRecipes.innerHTML = "";
            console.log("recipe not found, try again");
            errorMsg.classList.remove("divOff");
            errorMsg.classList.add("divOn");
            mealRecipes.appendChild(errorMsg);
          } else if (mealsList === []) {
            mealsList.push(data.meals);
          } else {
            mealsList.shift();
            mealRecipes.innerHTML = "";
            mealsList.push(data.meals);
          }
          mealsList[0].map((meal) => {
            createCardMeal(meal);
            inputSearch.value = "";
          });
        });
    }
  });
});
