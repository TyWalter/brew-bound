const formEl = document.querySelector('#xxxxx');
const nameSearch = document.querySelector('#xxxxx').value;
const citySearch = document.querySelector('#xxxxx').value;
const postalSearch = document.querySelector('#xxxxx').value;
const typeSearch = document.querySelector('#xxxxx').value;


function formSubmit(event) {
  event.preventDefault();

  if (!citySearch) {
    console.error('You need to enter a city!');
    return;
  } document.location.assign('search-results.html');
    localStorage.setItem('Name', nameSearch);
    localStorage.setItem('City', citySearch);
    localStorage.setItem('Postal', postalSearch);
    localStorage.setItem('Type', typeSearch);
  }


function getApi(){
  const requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${citySearch}&by_name=${nameSearch}&by_postal=${postalSearch}&by_type=${typeSearch}&sort=type,name:${sortSearch}&per_page=${perPageSearch}`;
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

getApi();

formEl.addEventListener('submit', formSubmit);