const cardContainer = document.querySelector('.card-container');

const renderCountryUi = function (data) {
  const html = `
  <div class="card">
    <div class="card__flag">
        <img src="${data.flags.png}" class="flag__img" alt="Data about ${
    data.name.common
  }" />
    </div>
    <div class="card__infos">
        <h2 class="card__name">${data.name.common}</h2>

        <p class="card__data">
        Population: <span class="card__data--population">${
          data.population
        }</span>
        </p>

        <p class="card__data">
        Region: <span class="card__data--region">${data.region}</span>
        </p>

        <p class="card__data">
        Capital: <span class="card__data--capital">${data.capital.at(0)}</span>
        </p>
    </div>
   </div> 
    `;

  //   console.log(typeof html);

  cardContainer.insertAdjacentHTML('beforeend', html);
};

// const getCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   //   console.log(request);

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     // console.log(data);
//   });
// };

// getCountry('germany');

// const request = new XMLHttpRequest();
// console.log(request);

// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      //   console.log(response);
      return response.json();
    })
    .then(function (data) {
      const [countryData] = data;
      renderCountryUi(countryData);
    });
};

getCountryData('germany');
getCountryData('United States of America');
getCountryData('brazil');
getCountryData('iceland');
getCountryData('afghanistan');
getCountryData('aland islands');
getCountryData('albania');
getCountryData('alegeria');
getCountryData('colombia');
getCountryData('chile');
