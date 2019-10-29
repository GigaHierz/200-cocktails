function createCocktailCard(name, URL, id) {
   var card = document.createElement('div');
   card.classList.add ("card");

   var imgURL = document.createElement('img');
   imgURL.src = URL;
   card.appendChild(imgURL);

   var cardHead = document.createElement('h3');
   cardHead.textContent = name;
   card.appendChild(cardHead);

   card.addEventListener('click', function(){
      var spotlight = createCocktailSpotlight(name, URL, id);
      document.body.appendChild(spotlight);   
   });
   return card;
}

function createCocktailSpotlight(name, imgURL, id) {
   var spotlight = document.createElement('div');
   spotlight.id = "spotlight"

   var spotlightCard = document.createElement('div');
   spotlightCard.id = "spotlight-card";

   var image = document.createElement('img');
   image.src = imgURL;
   spotlightCard.appendChild(image);

   var cardHead = document.createElement('h1');
   cardHead.textContent = name;
   spotlightCard.appendChild(cardHead);

   var p = document.createElement('p');
   p.textContent = "Instructions";
   spotlightCard.appendChild(p);

   spotlight.appendChild(spotlightCard);

   var promise = fetchJSON('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id);
   
   promise.then(function(apiResponse) {
      // Extract drink rom object response
      var drink = apiResponse.drinks[0];

      // Extract instrcutions from drink
      var instructions = drink.strInstructions;

      // Reset paragraph in spotlight card
      p.textContent = instructions;
   });

   spotlight.addEventListener('click', function(){
      spotlight.remove();
   });

   return spotlight;
}

function fetchJSON(url) {
   return new Promise(function(resolve, reject) {
      // Constructor
      var request = new XMLHttpRequest();

      // Configuration
      request.open('GET', url);

      // Event Listener
      request.addEventListener('load', function(){ // Response is ready
         if (request.status != 200) {
            reject();
         }

         //Parse the response
         var response = JSON.parse(request.response);

         // Fulfill the Promise
         resolve(response);
      });

      // Invoking the request
      request.send();
   });
}

var promise = fetchJSON('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka');

promise.then(function(apiResponse){

   var cocktailList = document.querySelector ('#cocktail-list');

   var drinks = apiResponse.drinks;

   for (var i = 0; i < drinks.length; i++) {
      let drink = drinks[i];

      let imgURL = drink.strDrinkThumb;
      let name = drink.strDrink;
      let id = drink.idDrink;

      let cocktailCard = createCocktailCard(name, imgURL, id);
      cocktailList.appendChild(cocktailCard);
   }
});
