//////////////////
// DOM ELEMENTS //
//////////////////

const cardContainer = document.querySelector('.country-container');
const searchInput = document.querySelector('.form__search-input');
const searchFilter = document.querySelector('.form__filter');
const searchIcon = document.querySelector('.search-icon');
const form = document.querySelector('.form');

const header = document.querySelector('header');
const body = document.querySelector('body');

const modeToggle = document.querySelector('.header__mode-container');
const moonIcon = document.querySelectorAll('.mode__moon');

//////////////////
//FUNCTIONS //
//////////////////

const renderCountryUi = function (data) {
  const html = `
  <article class="country-card">
    <div class="country__flag">
        <img src="${
          data.flags.png
        }" class="country-flag__img" alt="Data about ${data.name.common}" />
    </div>
    <div class="country__infos">
        <h2 class="country__name">${data.name.common}</h2>

        <p class="country__data">
        Population: <span class="country__data--population">${(
          +data.population / 1_000_000
        ).toFixed(1)} Mio</span>
        </p>

        <p class="country__data">
        Region: <span class="country__data--region">${data.region}</span>
        </p>

        <p class="country__data">
        Capital: <span class="country__data--capital">${data.capital.at(
          0
        )}</span>
        </p>
    </div>
   </article> 
    `;
  //   console.log(typeof html);

  cardContainer.insertAdjacentHTML('beforeend', html);
};

const renderSearchResults = function (data) {
  const html = `
    <button class="btn-back">&#8592; Back</button>
      <article class="search-result">
        <div class="country-flag-container">
          <img src="${data.flags.png}" class="country-flag__img" alt="Flag of ${
    data.name.common
  }" />
        </div>

        <div class="country__infos">
          <h2 class="country__name">${data.name.common}</h2>
          <div class="country__infos-container">
            <div class="country__infos-main">
              <p class="country__data">
                Native Name:
                <span class="country__data--native-name">${
                  data.name.common
                }</span>
              </p>

              <p class="country__data">
                Population:
                <span class="country__data--population">${(
                  data.population / 1_000_000
                ).toFixed(1)} mio</span>
              </p>

              <p class="country__data">
                Region: <span class="country__data--region">${
                  data.region
                }</span>
              </p>

              <p class="country__data">
                Sub Region:
                <span class="country__data--sub-region">${data.subregion}</span>
              </p>

              <p class="country__data u-margin-bottom">
                Capital: <span class="country__data--capital">${
                  data.capital[0]
                }</span>
              </p>
            </div>

            <div class="country__infos-side">
              <p class="country__data">
                Top Level Domain: <span class="country__data--domain">${data.tld.at(
                  0
                )}</span>
              </p>

              <p class="country__data">
                Currencies: <span class="country__data--currencies">${Object.keys(
                  data.currencies
                ).at(0)}</span>
              </p>

              <p class="country__data u-margin-bottom">
                Languages: <span class="country__data--languages">${[
                  Object.values(data.languages),
                ]}</span>
              </p>
              
            </div>
          </div>
          <h3 class="country__data country-data__border-heading u-margin-bottom-small">Border Countries:</h3>
          <div class="country__data-border-container u-padding-bottom-big">
        </div>
      </article>
    `;

  cardContainer.insertAdjacentHTML('beforeend', html);

  //   CALLING the function after the DOM el was created
  renderCountryBorder(data.borders);
};

// GET SEARCH RESULT
const getSearchResults = function () {
  let searchResult = searchInput.value;

  getCountryDataSearch(searchResult);
};

const renderCountryBorder = function (arr) {
  arr.forEach(borderCountry => {
    const borderHTML = `
    <p class="country__data--border">${borderCountry}</p>
         </div>`;

    // console.log(borderHTML);

    document
      .querySelector('.country__data-border-container')
      .insertAdjacentHTML('beforeend', borderHTML);
  });
};

// REMOVING ALL DEFAULTS ON THE PAGE
const removeSearchFilterEl = function () {
  form.style.display = 'none';

  const allCards = document.querySelectorAll('.country-card');
  allCards.forEach(country => (country.style.display = 'none'));
};

// REMOVING ALL SEARCH RESULTS AND RENDER ALL DEFAULTS
const resetSeachResults = function () {
  form.style.display = 'block';
  document.querySelector('.search-result').remove();
  document.querySelector('.btn-back').remove();

  const allCards = document.querySelectorAll('.country-card');
  allCards.forEach(country => (country.style.display = 'block'));
};

// MODE TOGGLES
const nightMode = function () {
  moonIcon.forEach(icon => icon.classList.toggle('mode__moon--hidden'));

  body.classList.toggle('u-day-colors-body');
  searchInput.classList.toggle('u-day-colors-bk-txt');
  searchFilter.classList.toggle('u-day-colors-bk-txt');
  header.classList.toggle('u-day-colors-bk');
  searchIcon.classList.toggle('u-day-colors-txt');

  document
    .querySelectorAll('.country-card')
    .forEach(country => country.classList.toggle('u-day-colors-bk'));
};

const filterCountries = function (arr, filter) {
  arr.filter(el => (el.region = filter));
};

//////////////////
// AJAX CALLS   //
//////////////////

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      if (response.ok === false) {
        throw new Error(
          '💥Country not found. Please check spelling, or try another country'
        );
      }

      return response.json();
    })
    .then(function (data) {
      const [countryData] = data;
      //   console.log(countryData);
      renderCountryUi(countryData);
    })
    .catch(err => console.log(`💥 Something went wrong -> ${err}`));
};

const getCountryDataSearch = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);

      if (response.ok === false) {
        throw new Error(
          '💥Country not found. Please check spelling, or try another country'
        );
      }

      return response.json();
    })
    .then(function (data) {
      const [countryData] = data;
      removeSearchFilterEl();
      renderSearchResults(countryData);
    })
    .catch(err => alert(err));
};

//////////////////
// DEFAULT COUNTRIES WHEN PAGE LOADS //
//////////////////

getCountryData('germany');
getCountryData('United States of America');
getCountryData('brazil');
getCountryData('iceland');
getCountryData('afghanistan');
getCountryData('spain');
getCountryData('albania');
getCountryData('algeria');

//////////////////
// EVENT LISTENERS //
//////////////////

searchInput.addEventListener('keydown', function (e) {
  // if the form receives a enter key
  if (e.key === 'Enter') {
    getSearchResults();
    // Clearing the input field
    searchInput.value = '';
  }
});

cardContainer.addEventListener('click', function (e) {
  if (e.target === e.target.closest('.btn-back')) {
    // Reset Search Results
    resetSeachResults();
  }
});

//////////////////
//NIGHT MODE FUNCTIONALITY //
//////////////////

modeToggle.addEventListener('click', function (e) {
  // APPLY IT ON LANDING PAGE
  nightMode();

  // APPLY IT ON SEARCH RESULTS
  if (!body.classList.contains('u-day-colors-body')) {
    document
      .querySelectorAll('.country__data--border')
      .forEach(country => country.classList.add('u-day-colors-bk'));

    document.querySelector('.btn-back').classList.add('u-day-colors-bk-txt');
  } else {
    document
      .querySelectorAll('.country__data--border')
      .forEach(country => country.classList.remove('u-day-colors-bk'));

    document.querySelector('.btn-back').classList.remove('u-day-colors-bk-txt');
  }

  //     (body.style.backgroundColor = 'var(--color-light-mode-bk)' === true)
  //   );
  //   console.log(modeToggle.firstElementChild);
  //   console.log(
  //     !modeToggle.firstElementChild.classList.contains('mode__mood--hidden')
  //   );
  //   if (!modeToggle.firstElementChild.classList.contains('mode__mood--hidden'))
  //     nightMode();
  //   else window.location.reload();
});
