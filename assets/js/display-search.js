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
  .catch(function(error){
    console.log(error)
    alert("You're Drunk Dumbass, Try Again");
  })
};


function printDrink(drinkCard){
  const nameEl = document.createElement('h3');
  nameEl.textContent = drinkCard.name;
  console.log(drinkCard.name)
  


  const addressEl = document.createElement('p');
  addressEl.textContent = drinkCard.address_1;

  // let givenPostal = localStorage.getItem('Postal');
  let longPostal = drinkCard.postal_code;
  // let gPost = givenPostal.toString();
  let lPost = longPostal.toString();
  // const gPost5 = gPost.substring(0, 5);
  const lPost5 = lPost.substring(0, 5);
  // if(gPost5 === lPost5){
  //   return true
  // } else {
  //   console.log("The first 5 digits don't match")
  // }
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


function printResults(data){
  for (let i=0; i<3; i++){
    printDrink(data[i])
  }

  for (let i=3; i<5; i++){
    printDrink(data[i])
  }

  for (let i=5; i<8; i++){
    printDrink(data[i])
  }
}

getParams();
// function formSubmit(event) {
//   event.preventDefault();

//   const nameSearch = document.querySelector('#xxxxx').value;
//   const citySearch = document.querySelector('#xxxxx').value;
//   const postalSearch = document.querySelector('#xxxxx').value;
//   const typeSearch = document.querySelector('#xxxxx').value;

//   if (!citySearch) {
//     console.error('You need to enter a city!');
//     return;
//   } 
//   document.location.assign('search-results.html');
//   localStorage.setItem('Name', nameSearch);
//   localStorage.setItem('City', citySearch);
//   localStorage.setItem('Postal', postalSearch);
//   localStorage.setItem('Type', typeSearch);
// }


// formSel.addEventListener('submit', formSubmit);

// getParams();