const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    });
});

const createMeal = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }

  const newInnerHTML = `
		<div class="row">
			<div class="col-12 col-md-8 col-lg-3 container-fluid px-0">
				<img src="${meal.strMealThumb}" alt="Meal Image" class="img-fluid">
      </div>
      <div class="col-12 order-md-first m-1 text-center titulo">
        <h4>${meal.strMeal}</h4>
      </div>

      <div class="col-12 col-md-4 col-lg-4">
        <div class="col-12">
				${
          meal.strCategory
            ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
            : ''
        }
        </div>
        <div class="col-12">
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
        </div>
        <div class="col-12">
				${
          meal.strTags
            ? `<p><strong>Tags:</strong> ${meal.strTags
                .split(',')
                .join(', ')}</p>`
            : ''
        }
        </div>
      </div>
      <div class="col-12 col-lg-5 ingredientes">
				<h5 class="text-center text-md-left">Ingredients:</h5>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>

      </div>
			<div class="row">
        <div class="col-12 text-justify" >
          <h5 class="text-center text-md-left"> Instructions: </h5>
				  <p>${meal.strInstructions}</p>
			  </div>
      

      <div class="embed-responsive embed-responsive-16by9 col-12 col-md-10 col-lg-8 mx-auto">
      <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${meal.strYoutube.slice(
        -11
      )}"></iframe>
    </div>
    </div>
    
	`;

  meal_container.innerHTML = newInnerHTML;
};

/*
${meal.strYoutube ? `
<div class="row">
  <h5>Video Recipe</h5>
  <div class="videoWrapper">
    <iframe width="420" height="315"
    src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
    </iframe>
  </div>
</div>` : ''}*/
// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector(
  '.social-panel-container'
);

floating_btn.addEventListener('click', () => {
  social_panel_container.classList.toggle('visible');
});

close_btn.addEventListener('click', () => {
  social_panel_container.classList.remove('visible');
});
