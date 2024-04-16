const formSel = document.querySelector('#form-selection');
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
  .catch(function(){
    alert("You're Drunk Dumbass, Try Again");
  })
};


function printResults(data){
  for (let i=0; i<3; i++){
    const drinkCard = data[i]

    const nameEl = document.createElement('h3');
    nameEl.textContent = drinkCard.name;
    nameEl.setAttribute('class', 'col');

    const addressEl = document.createElement('p');
    addressEl.textContent = drinkCard.address_1;
    addressEl.setAttribute('class', 'col');

    const postalEl = document.createElement('p');
    postalEl.textContent = drinkCard.postal_code;
    postalEl.setAttribute('class', 'col');

    let formattedPhone = drinkCard.phone;
    if(drinkCard.phone !== null){
    const phoneEl = formattedPhone.split(''); 
    phoneEl.splice(0, 0, '(')
    phoneEl.splice(4, 0, ')')
    phoneEl.splice(5, 0, ' ')
    phoneEl.splice(9, 0, '-')
    formattedPhone = phoneEl.join('');
    } else {
    formattedPhone = 'Unavailable'
    }
    const phoneEl = document.createElement('div');
    phoneEl.textContent = formattedPhone;

    const urlEl = document.createElement('a');
    if(drinkCard.website_url !== null){
      urlEl.setAttribute('href', drinkCard.website_url);
      urlEl.textContent = '🍻 Visit Their Site 🍻'
      urlEl.setAttribute('class', 'col')
    } else{
      urlEl.textContent = 'Unavailable'
    }

    const card = document.createElement('p');
    card.setAttribute('style', 'background-image: url(./assets/images/wood-plank-unsplash.jpg); background-size: cover; background-repeat: no-repeat; background-position: center; display: inline-block; width: 32.2%; text-align: center; padding: 20px; border-radius: 50px; margin: 10px 10px;')

    card.appendChild(nameEl);
    card.appendChild(addressEl);
    card.appendChild(postalEl);
    card.appendChild(phoneEl);
    card.appendChild(urlEl);
    drinkCards.appendChild(card);
  }
  for (let i=3; i<5; i++){
    const drinkCard = data[i]

    const nameEl = document.createElement('h3');
    nameEl.textContent = drinkCard.name;
    nameEl.setAttribute('class', 'col');

    const addressEl = document.createElement('p');
    if(drinkCard.address_1 !== null){
      addressEl.textContent = drinkCard.address_1
      addressEl.setAttribute('class', 'col')
    } else{
      addressEl.textContent = 'Unavailable'
    }

    const postalEl = document.createElement('p');
    postalEl.textContent = drinkCard.postal_code;
    postalEl.setAttribute('class', 'col');

    let formattedPhone = drinkCard.phone;
    if(drinkCard.phone !== null){
    const phoneEl = formattedPhone.split(''); 
    phoneEl.splice(0, 0, '(')
    phoneEl.splice(4, 0, ')')
    phoneEl.splice(5, 0, ' ')
    phoneEl.splice(9, 0, '-')
    formattedPhone = phoneEl.join('');
    } else {
    formattedPhone = 'Unavailable'
    }
    const phoneEl = document.createElement('div');
    phoneEl.textContent = formattedPhone;

    const urlEl = document.createElement('a');
    if(drinkCard.website_url !== null){
      urlEl.setAttribute('href', drinkCard.website_url);
      urlEl.textContent = '🍻 Visit Their Site 🍻'
      urlEl.setAttribute('class', 'col')
    } else{
      urlEl.textContent = 'Unavailable'
    }

    const card = document.createElement('p');
    card.setAttribute('style', 'background-image: url(./assets/images/wood-plank-unsplash.jpg); background-size: 85%; background-repeat: no-repeat; background-position: center; display: inline-block; width: 50%; text-align: center; padding: 20px')

    card.appendChild(nameEl);
    card.appendChild(addressEl);
    card.appendChild(postalEl);
    card.appendChild(phoneEl);
    card.appendChild(urlEl);
    drinkCards.appendChild(card);
  }
  for (let i=5; i<8; i++){
    const drinkCard = data[i]

    const nameEl = document.createElement('h3');
    nameEl.textContent = drinkCard.name;
    nameEl.setAttribute('class', 'col');

    const addressEl = document.createElement('p');
    addressEl.textContent = drinkCard.address_1;
    addressEl.setAttribute('class', 'col');

    const postalEl = document.createElement('p');
    postalEl.textContent = drinkCard.postal_code;
    postalEl.setAttribute('class', 'col');

    let formattedPhone = drinkCard.phone;
    if(drinkCard.phone !== null){
    const phoneEl = formattedPhone.split(''); 
    phoneEl.splice(0, 0, '(')
    phoneEl.splice(4, 0, ')')
    phoneEl.splice(5, 0, ' ')
    phoneEl.splice(9, 0, '-')
    formattedPhone = phoneEl.join('');
    } else {
    formattedPhone = 'Unavailable'
    }
    const phoneEl = document.createElement('div');
    phoneEl.textContent = formattedPhone;

    const urlEl = document.createElement('a');
    if(drinkCard.website_url !== null){
      urlEl.setAttribute('href', drinkCard.website_url);
      urlEl.textContent = '🍻 Visit Their Site 🍻'
      urlEl.setAttribute('style', 'font-size: 14px')
    } else{
      urlEl.textContent = 'Unavailable'
    }

    const card = document.createElement('p');
    card.setAttribute('style', 'background-image: url(./assets/images/wood-plank-unsplash.jpg); background-size: 85%; background-repeat: no-repeat; background-position: center; display: inline-block; width: 33.33%; text-align: center; padding: 20px')

    card.appendChild(nameEl);
    card.appendChild(addressEl);
    card.appendChild(postalEl);
    card.appendChild(phoneEl);
    card.appendChild(urlEl);
    drinkCards.appendChild(card);
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