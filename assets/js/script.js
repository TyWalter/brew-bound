const formSel = document.querySelector('#form-selection');
const bestBrew = document.querySelector('#best-brew');
const siteLink = document.querySelector('.websiteLink');
const cName = document.querySelector('.cEl');
const sName = document.querySelector('.sEl');
const pName = document.querySelector('.pEl');


function randomApi(){
  const requestUrl = 'https://api.openbrewerydb.org/v1/breweries?per_page=200';
  fetch(requestUrl)
  .then(function (response){
    return response.json();
  })
  .then(function(data){
    printRandom(data);
  })
  .catch(function(error){
    console.log(error);
    alert('You done messed up, A-A-ron');
  });
};


function printRandom(data){
  const random = data[Math.floor(Math.random()*data.length)]

  const nameEl = document.createElement('h3');
  nameEl.textContent = random.name;
  nameEl.setAttribute('style', 'color: #644521; text-shadow: 1px 1px 15px black; text-align: center; font-weight: bold; font-size: 1rem; margin: .5rem')

  const cityEl = document.createElement('div');
  cityEl.textContent = random.city;
  cityEl.setAttribute('style', 'color: #644521; text-shadow: 1px 1px 15px black; text-align: center; font-size: 14px; display: inline-block; width: 65%')

  const stateEl = document.createElement('div');
  stateEl.textContent = random.state;
  stateEl.setAttribute('style', 'color: #644521; text-shadow: 1px 1px 15px black; text-align: center; font-size: 14px; display: inline-block; width: 65%')

  const phoneEl = document.createElement('div');
  phoneEl.textContent = random.phone;
  phoneEl.setAttribute('style', 'color: #644521; text-shadow: 1px 1px 15px black; text-align: center; font-size: 14px; display: inline-block; width: 65%');



  const card = document.createElement('p');
  siteLink.setAttribute('href', random.website_url);




  card.appendChild(nameEl);
  cName.appendChild(cityEl);
  sName.appendChild(stateEl);
  pName.appendChild(phoneEl);
  bestBrew.prepend(card);
};


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


randomApi();


formSel.addEventListener('submit', formSubmit);

