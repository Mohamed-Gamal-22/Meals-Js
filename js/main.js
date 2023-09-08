let row = document.getElementById("myRow");
let loader = document.getElementById("loader");
let content = document.getElementById("content");
let parent = document.getElementById("parent");

function showLoading() {
  content.classList.replace("d-flex", "d-none");
  loader.classList.replace("d-none", "d-flex");
  parent.classList.replace("d-none", "d-flex");
}

function removeLoading() {
  content.classList.replace("d-none", "d-flex");
  loader.classList.replace("d-flex", "d-none");
  parent.classList.replace("d-flex", "d-none");
}

async function getAllCategories() {
  showLoading();
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await res.json();
  // console.log(data.categories);
  displayCategory(data.categories);
  removeLoading()
}
getAllCategories();

function displayCategory(categories) {
  let cartona = "";

  categories.forEach((category) => {
    cartona += `
    <div class="col-lg-3 col-md-6" onclick="getMeals('${
      category.strCategory
    }')">
        <div class="item animate__fadeIn animate__animated position-relative overflow-hidden rounded bg-dark p-1">
            <img src="${category.strCategoryThumb}" class="w-100 " alt="meal" />
            <div
            class="layer position-absolute d-flex justify-content-center align-items-center flex-column"
            >
            <p class="fw-bold category">${category.strCategory}</p>
            <small class="p-2 text-center">${category.strCategoryDescription.slice(
              0,
              250
            )}</small>
            </div>
        </div>
    </div>`;
  });
  row.innerHTML = cartona;
}
//////////////////////////////////////////////////////////////////

async function getMeals(category) {
  showLoading()
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await res.json();

  console.log(data.meals);
  displayMeals(data.meals);
  removeLoading()
}

function displayMeals(meals) {
  let cartona = "";

  meals.forEach((meal) => {
    cartona += `
      <div class="col-lg-3 col-md-6 " onclick="mealDetails('${meal.idMeal}')">
          <div class="item position-relative overflow-hidden rounded bg-dark p-1">
              <img src="${meal.strMealThumb}" class="w-100 " alt="meal" />
              <div
              class="layer position-absolute d-flex justify-content-center align-items-center flex-column"
              >
              <p class="fw-bold">${meal.strMeal}</p>
              </div>
          </div>
      </div>`;
  });
  row.innerHTML = cartona;
}

//////////////////////////////////////////////////////////////////

async function mealDetails(mealId) {
  showLoading()
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let data = await res.json();

  console.log(data.meals[0]);
  displayDetails(data.meals[0]);
  removeLoading()
}

function displayDetails(meal) {
  // extract all ingrediants
  let all = [];
  for (let i = 0; i < 30; i++) {
    all.push(
      `${meal["strIngredient" + (i + 1)]} ${meal["strMeasure" + (i + 1)]}`
    );
  }
  all = all
    .filter((ingrediant) => ingrediant != undefined)
    .filter((e) => e != "")
    .filter((f) => f != " ")
    .filter((f) => f != "  ")
    .filter((f) => f != "undefined undefined");

  console.log(all);

  ////////////////////////////////////////////////////////

  cartona = "";
  console.log(meal);

  cartona += `
  <div class="col-lg-6">
    <div class="item text-center">
      <img src="${meal.strMealThumb}" class="w-75" alt="meal" />
    </div>
</div>
<div class="col-lg-6">
    <div class="item text-center mb-3">
      <h3>${meal.strMeal}<h2>
      <p class="lead">${meal.strInstructions
        .split(" ")
        .slice(0, 40)
        .join(" ")}</p>
        <div class="mt-5">
          <button class="btn btn-danger"><a target="_blank" href="${
            meal.strYoutube
          }">watch a video in youtube</a></button>
          <button class="btn btn-info"><a target="_blank" href="${
            meal.strSource
          }">watch a video in youtube</a></button>
        </div>
      <ul class="ing mt-5">
        ${all
          .map((e) => `<li>${e}</li>`)
          .toString()
          .replaceAll(",", "")}
      </ul>
    </div>
</div>`;

  row.innerHTML = cartona;
}
///////////////////////////////////////////////////////////////////

// by FirstName input

document.querySelector("#name").addEventListener("keyup", async function () {
  let word = this.value;
  // console.log(this.value);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
  );
  let data = await res.json();

  console.log(data);
  let cartona = "";
  data.meals.forEach((meal) => {
    cartona += `
      <div class="col-lg-3 col-md-6" onclick="mealDetails('${meal.idMeal}')">
          <div class="item position-relative overflow-hidden rounded bg-dark p-1">
              <img src="${meal.strMealThumb}" class="w-100 " alt="meal" />
              <div
              class="layer position-absolute d-flex justify-content-center align-items-center flex-column"
              >
              <p class="fw-bold">${meal.strMeal}</p>
              </div>
          </div>
      </div>`;
  });
  row.innerHTML = cartona;
});

// by first letter

document.querySelector("#letter").addEventListener("keyup", async function () {
  let word = this.value;
  console.log(this.value);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${word}`
  );
  let data = await res.json();

  console.log(data);
  let cartona = "";
  data.meals.forEach((meal) => {
    cartona += `
      <div class="col-lg-3 col-md-6" onclick="mealDetails('${meal.idMeal}')">
          <div class="item position-relative overflow-hidden rounded bg-dark p-1">
              <img src="${meal.strMealThumb}" class="w-100 " alt="meal" />
              <div
              class="layer position-absolute d-flex justify-content-center align-items-center flex-column"
              >
              <p class="fw-bold">${meal.strMeal}</p>
              </div>
          </div>
      </div>`;
  });
  row.innerHTML = cartona;
});

///////////////////////////////////////////////////////////////////////

// start area category

async function getAreas() {
  showLoading()
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let areas = await res.json();

  console.log(areas.meals);
  displayAreas(areas.meals);
  removeLoading()
}

function displayAreas(areas) {
  let cartona = "";

  areas.forEach((area) => {
    cartona += `
    <div class="col-md-3 col-sm-6"> 
      <div class="area p-3 d-flex flex-column justify-content-center align-items-center bg-dark" onclick="getAreaMeals('${area.strArea}')">
        <i class="text-warning fa-solid fa-house-chimney fs-1"></i>
        <p class="text-white mt-2 fw-bold">${area.strArea}</p>
      </div>
    </div>
  `;
  });

  row.innerHTML = cartona;
}

// www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

async function getAreaMeals(area) {
  showLoading()
  console.log(area);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  let meals = await res.json();
  displayAreaMeals(meals.meals);
  removeLoading()
}

function displayAreaMeals(meals) {
  displayMeals(meals);
}
//////////////////////////////////////////////////////////////////////////////

// start ingrediants

async function getAllIngrediant() {
  showLoading()
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let ingrediants = await res.json();
  console.log(ingrediants.meals.slice(0, 20));

  displayIngrediants(ingrediants.meals.slice(0, 20));
  removeLoading()
}

function displayIngrediants(ingrediants) {
  let cartona = "";

  ingrediants.forEach((ing) => {
    cartona += `
    <div class="col-lg-3 col-md-4" > 
      <div class="area p-3 d-flex flex-column justify-content-center align-items-center bg-dark" onclick="getMealsOfIngrediant('${
        ing.strIngredient
      }')">
        <i class="text-warning fa-solid fa-drumstick-bite fs-1"></i>
        <p class="text-white mt-2 fw-bold">${ing.strIngredient}</p>
        <p class="text-white text-center">${ing.strDescription
          .split(" ")
          .slice(0, 15)
          .join(" ")}</p>
      </div>
    </div>
  `;
  });

  row.innerHTML = cartona;
}

///////////////////////////////////////////////////////////////////////////////

async function getMealsOfIngrediant(name) {
  showLoading()
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  let meals = await res.json();

  displayMeals(meals.meals);
  removeLoading()
}
//////////////////////////////////////////////////////////////////////////

// loading
