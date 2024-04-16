const formSel = document.querySelector('#form-selection');
const resultTextEl = document.querySelector('#result-text');
const drinkCards = document.querySelector('#drink-cards');


function getParams(){
  const cityEl = localStorage.getItem('City');
  const postalEl = localStorage.getItem('Postal');
  const typeEl = localStorage.getItem('Type');
  
  searchApi(cityEl, postalEl, typeEl);
}


function searchApi(cityEl, postalEl, typeEl){
  const requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityEl}&by_postal=${postalEl}&by_type=${typeEl}&per_page=8`;
  fetch(requestUrl)
  .then(function (response){
    return response.json();
  })
  .then(function(data){
    printResults(data);
  })
  .catch(function(error){
    console.log(error);
    alert('You done messed up, A-A-ron');
  })
};


function printResults(data){
  for (let i=0; i<data.length; i++){
    const drinkCard = data[i]
    const nameEl = document.createElement('h3')
    nameEl.textContent = drinkCard.name

    const addressEl = document.createElement('p')
    addressEl.textContent = drinkCard.address_1

    const postalEl = document.createElement('p')
    postalEl.textContent = drinkCard.postal_code

    const phoneEl = document.createElement('p')
    phoneEl.textContent = drinkCard.phone

    const urlEl = document.createElement('a')
    urlEl.textContent = 'Read More'
    urlEl.setAttribute('href', drinkCard.url)

    const card = document.createElement('div')
    card.appendChild(nameEl)
    card.appendChild(addressEl)
    card.appendChild(postalEl)
    card.appendChild(phoneEl)
    card.appendChild(urlEl)
    drinkCards.appendChild(card)
  }
}


function formSubmit(event) {
  event.preventDefault();

  const nameSearch = document.querySelector('#xxxxx').value;
  const citySearch = document.querySelector('#xxxxx').value;
  const postalSearch = document.querySelector('#xxxxx').value;
  const typeSearch = document.querySelector('#xxxxx').value;

  if (!citySearch) {
    console.error('You need to enter a city!');
    return;
  } document.location.assign('search-results.html');
    localStorage.setItem('Name', nameSearch);
    localStorage.setItem('City', citySearch);
    localStorage.setItem('Postal', postalSearch);
    localStorage.setItem('Type', typeSearch);
  }


// formSel.addEventListener('submit', formSubmit);

getParams();