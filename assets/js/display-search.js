const formSel = document.querySelector('.brickwall');
const resultTextEl = document.querySelector('#result-text');
const drinkCards = document.querySelector('#drink-cards');
const formResults = document.querySelector('.form-results-title');
const web0 = document.querySelector('.websiteLink0');
const web1 = document.querySelector('.websiteLink1');
const web2 = document.querySelector('.websiteLink2');
const web3 = document.querySelector('.websiteLink3');
const web4 = document.querySelector('.websiteLink4');
const web5 = document.querySelector('.websiteLink5');
const web6 = document.querySelector('.websiteLink6');
const web7 = document.querySelector('.websiteLink7');
const brew0 = document.querySelector('.card0')
const brew1 = document.querySelector('.card1')
const brew2 = document.querySelector('.card2')
const brew3 = document.querySelector('.card3')
const brew4 = document.querySelector('.card4')
const brew5 = document.querySelector('.card5')
const brew6 = document.querySelector('.card6')
const brew7 = document.querySelector('.card7')


function getParams(){
  const cityEl = localStorage.getItem('City');
  const postalEl = localStorage.getItem('Postal');
  const typeEl = localStorage.getItem('Type');
  
  searchApi(cityEl, postalEl, typeEl);
  // resultsFor(cityEl, postalEl, typeEl);
}

// Scrapped Idea
// function resultsFor(citySearch, postalSearch, typeSearch){

//   const cityElem = document.createElement('div');
//   cityElem.textContent = citySearch
//   console.log(cityElem)
//   const postalElem = document.createElement('div');
//   postalElem.textContent = postalSearch.postal_code;
//   const typeElem = document.createElement('div');
//   typeElem.textContent = typeSearch.brewery_type;
//   const resultingSearch = document.createElement('p');
//   resultingSearch.appendChild(cityElem);
//   resultingSearch.appendChild(postalElem);
//   resultingSearch.appendChild(typeElem);

// }

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
  data.forEach((drinkCard, i) => {
    printDrink(drinkCard, i);
  });
}


function printDrink(drinkCard, i){
  if (!drinkCard || !drinkCard.name || !drinkCard.address_1 || !drinkCard.postal_code || !drinkCard.phone || !drinkCard.website_url) {
    return;
  }
  
  const nameEl = document.createElement('h3');
  nameEl.textContent = drinkCard.name;
  nameEl.setAttribute('style', 'font-size: 16px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--alloy-orange)')
  
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
    urlEl.setAttribute('style', 'color: white; text-decoration: none')
  } else{
    urlEl.textContent = 'Unavailable'
  }

  const card = document.createElement('div');
  card.setAttribute('style', 'line-height: .5rem; padding: 5px; text-shadow: black 0 0 .3rem;')
  card.appendChild(nameEl) 
  card.appendChild(addressEl)
  card.appendChild(postalEl)
  card.appendChild(phoneEl)

  const breweryLink = document.querySelector(`.card${i}`);
  if (breweryLink) {
    breweryLink.prepend(card);
  }
  const webLink = document.querySelector(`.websiteLink${i}`);
  if (webLink) {
    webLink.appendChild(urlEl);
  } 
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

