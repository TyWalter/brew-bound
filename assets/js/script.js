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
    // if( !response.ok ) throw new Error("Bad Request");
    return response.json();
  })
  .then(function(data){
    printRandom(data);
  })
  .catch(function(){
    alert("You're Drunk Dumbass, Try Again");
  });
};

// Grabbing data retrieved from fetch call, grabbing a random brewery and creating a name/city/state/phone/website from that brewery and creating a card to append the information to as well as appending the website to a button
function printRandom(data){
  const random = data[Math.floor(Math.random()*data.length)]

  const nameEl = document.createElement('h3');
  nameEl.textContent = random.name;
  nameEl.setAttribute('style', 'line-height: 1rem; color: #644521; text-shadow: 1px 1px 20px black; text-align: center; font-weight: bold; font-size: 1rem; margin-left: .2rem; margin-right: .2rem; margin-bottom: -.5rem')

  const cityEl = document.createElement('div');
  cityEl.textContent = random.city;
  cityEl.setAttribute('class', 'col')
  cityEl.setAttribute('style', 'color: #644521; text-align: center; font-size: 14px')

  const stateEl = document.createElement('div');
  stateEl.textContent = random.state;
  stateEl.setAttribute('class', 'col')
  stateEl.setAttribute('style', 'color: #644521; text-align: center; font-size: 14px')

  let formattedPhone = random.phone;
  if(random.phone !== null){
    const phoneNumber = formattedPhone.split(''); 
    phoneNumber.splice(0, 0, '(')
    phoneNumber.splice(4, 0, ')')
    phoneNumber.splice(5, 0, ' ')
    phoneNumber.splice(9, 0, '-')
    formattedPhone = phoneNumber.join('');
  } else {
    formattedPhone = 'Unavailable'
  }
  

  const phoneEl = document.createElement('div');
  phoneEl.textContent = formattedPhone;
  phoneEl.setAttribute('class', 'col')
  phoneEl.setAttribute('style', 'color: #644521; text-align: center; font-size: 14px;');

  if(random.website_url !== null){
    siteLink.setAttribute('href', random.website_url);
    siteLink.textContent = '🍻 Visit Their Site 🍻'
    siteLink.setAttribute('style', 'font-size: 14px')
  } else{
    siteLink.textContent = 'Unavailable'
  }

  const card = document.createElement('p');

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

