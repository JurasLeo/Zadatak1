document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const hiddenText = card.querySelector('.card-text.d-none');
        const previewText = card.querySelector('.card-text:not(.d-none)');

        if (hiddenText.classList.contains('d-none')) {
            // Expand the card
            hiddenText.classList.remove('d-none');
            previewText.classList.add('d-none');
            card.classList.add('card-expanded');
            button.textContent = 'Read Less';
        } else {
            // Collapse the card
            hiddenText.classList.add('d-none');
            previewText.classList.remove('d-none');
            card.classList.remove('card-expanded');
            button.textContent = 'Read More';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const recipes = {
        "lasagna": {
            title: "Homemade Lasagna",
            content: "This lasagna recipe includes layers of rich tomato sauce, creamy bechamel, and plenty of mozzarella cheese."
        },
        "chicken-curry": {
            title: "Chicken Curry",
            content: "This chicken curry features tender chicken pieces simmered in a spicy, aromatic sauce."
        },
        "vegetarian-pasta": {
            title: "Vegetarian Pasta",
            content: "Fresh vegetables and a light tomato sauce make this pasta dish a healthy delight."
        }
    };

    const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
    document.querySelectorAll('.view-recipe-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const recipeKey = btn.getAttribute('data-recipe');
            const recipe = recipes[recipeKey];

            document.getElementById('recipeModalLabel').textContent = recipe.title;
            document.getElementById('recipeModalBody').textContent = recipe.content;

            modal.show();
        });
    });
});



////RECENZIJE

 // Elements
 const reviewsContainer = document.querySelector('.reviews-container');
 const reviewForm = document.querySelector('form');
 const reviewName = document.getElementById('reviewName');
 const reviewText = document.getElementById('reviewText');
 const reviewRating = document.getElementById('reviewRating');

 // Load reviews from localStorage
 function loadReviews() {
     const reviews = JSON.parse(localStorage.getItem('recenzije')) || [];
     reviews.forEach(addReviewToDOM);
 }

 // Save a new review to localStorage
 function saveReviewToLocalStorage(review) {
     const reviews = JSON.parse(localStorage.getItem('recenzije')) || [];
     reviews.push(review);
     localStorage.setItem('reviews', JSON.stringify(reviews));
 }

 // Add review to DOM
 function addReviewToDOM({ name, text, rating }) {
     const newReview = `
         <div class="col-md-4 mb-4">
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">${name}</h5>
                     <p class="card-text">"${text}"</p>
                     <p class="text-warning">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
                     <p class="card-text text-muted">- ${name}</p>
                 </div>
             </div>
         </div>
     `;
     reviewsContainer.insertAdjacentHTML('beforeend', newReview);
 }

 // Handle form submission
 reviewForm.addEventListener('submit', (event) => {
     event.preventDefault(); // Prevent page reload

     // Collect form data
     const name = reviewName.value;
     const text = reviewText.value;
     const rating = reviewRating.value;

     // Validate form data
     if (!name || !text || !rating) {
         alert("Please fill out all fields!");
         return;
     }

     // Create review object
     const review = { name, text, rating };

     // Add review to localStorage
     saveReviewToLocalStorage(review);

     // Add review to DOM
     addReviewToDOM(review);

     // Reset form
     reviewForm.reset();
 });

 // Initial load of reviews
 loadReviews();
 ///////////////////