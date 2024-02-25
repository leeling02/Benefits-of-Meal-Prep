const searchBtn = document.getElementById("search-btn");
const searchInpt = document.getElementById("search-input");
const mealList = document.querySelector(".meal-result");
const mealDetails = document.getElementById("meal-details-content");
const recipeBtn = document.getElementById("recipe-btn"); //dynamic data

searchBtn.addEventListener("click", function () {
  const searchTerm = searchInpt.value.trim();
  if (searchTerm !== "") {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      searchTerm
    )}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.meals) {
          mealList.innerHTML = "";
          data.meals.forEach((meal) => {
            const mealName = meal.strMeal;
            const mealImg = meal.strMealThumb;

            const mealElement = document.createElement("div");
            mealElement.classList.add("meal");

            const nameElement = document.createElement("h3");
            nameElement.textContent = mealName;
            const imgElement = document.createElement("img");
            imgElement.src = mealImg;

            const mealDiv = document.createElement("div");
            const getBtn = document.createElement("button");
            getBtn.classList.add("recipe-btn")
            getBtn.setAttribute("id", "recipe-btn");
            getBtn.textContent = "Get Recipe";

            mealElement.appendChild(imgElement);
            mealElement.appendChild(nameElement);
            mealDiv.appendChild(getBtn);
            mealElement.appendChild(mealDiv);
            mealList.appendChild(mealElement);
          });
        } else {
          const noResultElement = document.createElement("p");
          noResultElement.textContent = "No meals found";
          mealList.appendChild(noResultElement);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

searchInpt.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

mealList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.closest(".recipe-btn")) {
    const mealNames = document.querySelectorAll("h3");
    mealNames.forEach((mealName) => {
      const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName.textContent}`;
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
         
          if (data.meals) {
            mealDetails.innerHTML = "";
            data.meals.forEach((meal) => {

              const mealInstruct = meal.strInstructions;
             

              //RecipeTitle
              const recipeTitle = document.createElement("h2");
              recipeTitle.classList.add("recipe-title");
              recipeTitle.textContent = meal.strMeal;
            

              const recipeInstructDiv = document.createElement("div");
              recipeInstructDiv.classList.add("recipe-instruct");
              const instructHeading = document.createElement("h4");
              instructHeading.textContent = "Instructions";
              const instructContents = document.createElement("p");
              instructContents.textContent = mealInstruct;

              //append recipetitle
              mealDetails.appendChild(recipeTitle);
              recipeInstructDiv.appendChild(instructHeading);
              recipeInstructDiv.appendChild(instructContents);
              mealDetails.appendChild(recipeInstructDiv);
            });
          }
        });
    });
  }
});
