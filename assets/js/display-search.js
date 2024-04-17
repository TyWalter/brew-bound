const formSel = document.querySelector('.brickwall');
const resultTextEl = document.querySelector('#result-text');
const drinkCards = document.querySelector('#drink-cards');


function getParams(){
  const cityEl = localStorage.getItem('City');
  const postalEl = localStorage.getItem('Postal');
  const typeEl = localStorage.getItem('Type');
  
  searchApi(cityEl, postalEl, typeEl);
}


function searchApi(citySearch, postalSearch, typeSearch){
  const requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${citySearch}&by_postal=${postalSearch}&by_type=${typeSearch}&per_page=8`;
  fetch(requestUrl)
  .then(function (response){
    // if( !response.ok ) throw new Error("Bad Request");
    return response.json();
  })
  .then(function(data){
    printResults(data);
  })
  .catch(function(error){
    console.log(error)
    alert("You're Drunk Dumbass, Try Again");
  })
};


function printResults(data){
  for (let i=0; i<data.length; i++){
    printDrink(data[i])
  }
}


function printDrink(drinkCard){
  if (!drinkCard || !drinkCard.name || !drinkCard.address_1 || !drinkCard.postal_code || !drinkCard.phone || !drinkCard.website_url) {
    return;
  }
  const nameEl = document.createElement('h3');
  nameEl.textContent = drinkCard.name;
  
  const addressEl = document.createElement('p');
  addressEl.textContent = drinkCard.address_1;

  let longPostal = drinkCard.postal_code;
  let lPost = longPostal.toString();
  const lPost5 = lPost.substring(0, 5);
  const postalEl = document.createElement('p');
  postalEl.textContent = lPost5;
  
  let formattedPhone = drinkCard.phone;
  if(drinkCard.phone !== null){
  const phoneElem = formattedPhone.split(''); 
  phoneElem.splice(0, 0, '(')
  phoneElem.splice(4, 0, ')')
  phoneElem.splice(5, 0, ' ')
  phoneElem.splice(9, 0, '-')
  formattedPhone = phoneElem.join('');
  } else {
  formattedPhone = 'Unavailable'
  }
  const phoneEl = document.createElement('p');
  phoneEl.textContent = formattedPhone;

  const urlEl = document.createElement('a');
  if(drinkCard.website_url !== null){
    urlEl.setAttribute('href', drinkCard.website_url);
    urlEl.textContent = '🍻 Visit Their Site 🍻'

  } else{
    urlEl.textContent = 'Unavailable'
  }

  const card = document.createElement('p');

  card
    .appendChild(nameEl) 
    .appendChild(addressEl)
    .appendChild(postalEl)
    .appendChild(phoneEl)
    .appendChild(urlEl);
    
  drinkCards.appendChild(card);
}


function formSubmit(event) {
  event.preventDefault();

  const citySearch = document.querySelector('#cname').value;
  const postalSearch = document.querySelector('#zipcode').value;
  const typeSearch = document.querySelector('#type').value;

  if (!typeSearch) {
    console.error('You need to select a type of brewery!');
    return;
  } document.location.assign('search-results.html');
    localStorage.setItem('City', citySearch);
    localStorage.setItem('Postal', postalSearch);
    localStorage.setItem('Type', typeSearch);
};

formSel.addEventListener('submit', formSubmit);


getParams();

