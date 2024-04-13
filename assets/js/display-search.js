const formSel = document.querySelector('#form-selection');
const resultTextEl = document.querySelector('#result-text');


function getParams(){
  const nameEl = localStorage.getItem('name');
  const cityEl = localStorage.getItem('city');
  const postalEl = localStorage.getItem('postal');
  const typeEl = localStorage.getItem('type');

  resultTextEl.textContent = `${cityEl}`;

  searchApi(nameEl, cityEl, postalEl, typeEl);
}


function searchApi(nameSearch, citySearch, postalSearch, typeSearch){
  const requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${citySearch}&by_name=${nameSearch}&by_postal=${postalSearch}&by_type=${typeSearch}&per_page=10`;
  fetch(requestUrl)
  .then(function (response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
  })
  .catch(function(error){
    console.log(error);
    alert('You done messed up, A-A-ron');
  })
};


function printResults(data){
  for (let i=0; i<data.length; i++){
    const article = data[i]
    const titleEl = document.createElement('h3')
    titleEl.textContent = article.title
    const descEl = document.createElement('p')
    descEl.textContent = article.description
    const urlEl = document.createElement('a')
    urlEl.textContent = 'Read More'
    urlEl.setAttribute('href', article.url)
    const card = document.createElement('div')
    card.appendChild(titleEl)
    card.appendChild(descEl)
    card.appendChild(urlEl)
    resultContentEl.appendChild(card)
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


formSel.addEventListener('submit', formSubmit);

getParams();