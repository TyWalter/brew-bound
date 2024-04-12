const searchFormEl = document.querySelector('#xxxxx');
const citySearch = document.querySelector('#xxxxx').value;
const nameSearch = document.querySelector('#xxxxx').value;
const postalSearch = document.querySelector('#xxxxx').value;
const typeSearch = document.querySelector('#xxxxx').value;
const sortSearch = document.querySelector('#xxxxx').value;
const perPageSearch = document.querySelector('#xxxxx').value;

function formSubmit(event) {
  event.preventDefault();

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  } document.location.assign('search-results.html');
    localStorage.setItem('input', searchInputVal);
    localStorage.setItem('format', formatInputVal);
}


function getApi(){
  const requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${citySearch}&by_name=${nameSearch}&by_postal=${postalSearch}&by_type=${typeSearch}&sort=type,name:${sortSearch}&per_page=${perPageSearch}`;
  fetch(requestUrl)
    .then(function (response){
    return response.json();
  })
  .then(function(data){
    console.log(data)
  })
  .catch(function(error){
    console.log(error)
    alert('You done messed up, A-A-ron')
  })
};

getApi();

searchFormEl.addEventListener('submit', formSubmit);