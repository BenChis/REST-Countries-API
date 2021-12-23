//////////////////
// DOM ELEMENTS //
//////////////////

const cardContainer = document.querySelector('.country-container');
const searchInput = document.querySelector('.form__search-input');

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

const getSearchResults = function () {
  let searchResult = searchInput.value;
  //   console.log(searchResult);

  getCountryDataSearch(searchResult);
};

const renderCountryBorder = function (arr) {
  arr.forEach(borderCountry => {
    const borderHTML = `
    <p class="country__data--border">${borderCountry}</p>
         </div>`;

    console.log(borderHTML);

    document
      .querySelector('.country__data-border-container')
      .insertAdjacentHTML('beforeend', borderHTML);
  });
};

//////////////////
// AJAX CALLS   //
//////////////////

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      //   console.log(response);
      return response.json();
    })
    .then(function (data) {
      const [countryData] = data;
      console.log(countryData);
      renderCountryUi(countryData);
    });
};

const getCountryDataSearch = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      //   console.log(response);
      return response.json();
    })
    .then(function (data) {
      const [countryData] = data;
      //   console.log(Object.keys(countryData.currencies).at(0));
      console.log(...Object.values(countryData.languages));
      renderSearchResults(countryData);
    });
};

//////////////////
// DEFAULT COUNTRIES WHEN PAGE LOADS //
//////////////////

// getCountryData('germany');
// getCountryData('United States of America');
// getCountryData('brazil');
// getCountryData('iceland');
// getCountryData('afghanistan');
// getCountryData('spain');
// getCountryData('albania');
// getCountryData('algeria');

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
