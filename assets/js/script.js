const formSel = document.querySelector('#form-selection');
const bestBrew = document.querySelector('#best-brew');


function randomApi(){
  const requestUrl = 'https://api.openbrewerydb.org/v1/breweries?per_page=200';
  fetch(requestUrl)
  .then(function (response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
    printRandom(data)
  })
  .catch(function(error){
    console.log(error);
    alert('You done messed up, A-A-ron');
  })
};


function printRandom(data){
  const randomizer = data.sort(() => Math.random() - 0.5)
  const random = randomizer[0]

  
  const nameEl = document.createElement('h3')
  nameEl.textContent = random.name
  const cityEl = document.createElement('p')
  cityEl.textContent = random.city
  const stateEl = document.createElement('p')
  stateEl.textContent = random.state
  const phoneEl = document.createElement('p')
  phoneEl.textContent = random.phone
  const urlEl = document.createElement('a')
  urlEl.textContent = 'Visit Their Site'
  urlEl.setAttribute('href', random.website_url)
  const card = document.createElement('div')
  card.appendChild(nameEl)
  card.appendChild(cityEl)
  card.appendChild(stateEl)
  card.appendChild(phoneEl)
  card.appendChild(urlEl)
  bestBrew.appendChild(card)
}


function formSubmit(event) {
  event.preventDefault();

  const nameSearch = document.querySelector('#xxxxx').value;
  const citySearch = document.querySelector('#xxxxx').value;
  const postalSearch = document.querySelector('#xxxxx').value;
  const typeSearch = document.querySelector('#xxxxx').value;

  if (!typeSearch) {
    console.error('You need to select a type of brewery!');
    return;
  } document.location.assign('search-results.html');
    localStorage.setItem('Name', nameSearch);
    localStorage.setItem('City', citySearch);
    localStorage.setItem('Postal', postalSearch);
    localStorage.setItem('Type', typeSearch);
  }


randomApi();


formSel.addEventListener('submit', formSubmit);