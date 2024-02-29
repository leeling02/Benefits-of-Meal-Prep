const searchBtn = document.getElementById("search-btn");
const searchInpt = document.getElementById("search-input");
const mealList = document.querySelector(".meal-result");
const mealDetails = document.getElementById("meal-details");
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
            const mealInstruct = meal.strInstructions;

            const getBtn = document.createElement("button");
            getBtn.classList.add("recipe-btn");
            getBtn.setAttribute("id", "recipe-btn");
            getBtn.textContent = "Get Recipe";
            getBtn.onclick = "toggleShowRecipe()";

            const instructElement = document.createElement("p");
            instructElement.classList.add("recipe-instruct");
            instructElement.textContent = mealInstruct;

            const mealElement = document.createElement("div");
            mealElement.classList.add("meal");
            mealElement.setAttribute("id", "meal");

            const nameElement = document.createElement("h3");
            nameElement.textContent = mealName;
            const imgElement = document.createElement("img");
            imgElement.src = mealImg;

            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("instruct-elemt");
            recipeDiv.setAttribute("id", "instruct-elemt");

            mealElement.appendChild(imgElement);
            mealElement.appendChild(nameElement);
            mealElement.appendChild(getBtn);
            mealElement.appendChild(recipeDiv);
            recipeDiv.appendChild(instructElement);
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

mealList.addEventListener("click", function (event) {
  // Check if the clicked element matches a specific selector
  if (event.target.tagName === "BUTTON") {
    const mealElement = event.target.closest(".meal");
    if (mealElement) {
      const mealInstruct =
        mealElement.querySelector(".recipe-instruct").innerHTML;
      alert(mealInstruct);
    }
  }
});
