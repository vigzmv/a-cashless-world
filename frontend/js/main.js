(function () {
  var paymentFilters = [],
    poiFilters = [],
    BASE_URL = 'http://10.1.24.57:8001',
    pois;

  function setState(state) {
    var $footerIcon = document.getElementById('js-icon-add').children[0];
    var $appView = document.getElementById('js-app-view');
    var $mapView = document.getElementById('js-map-view');

    if (state === 'app-view') {
      $mapView.classList.add('hidden');
      $appView.classList.remove('hidden');

      $footerIcon.src = 'img/add-icon.svg';
    } else if (state === 'map-view') {
      $mapView.classList.remove('hidden');
      $appView.classList.add('hidden');

      $footerIcon.src = 'img/back-icon.svg';

      initMapView();
    }
  }

  function activatePaymentUtilities() {
    var payUty = document.getElementsByClassName('tile-box');

    for (var i = 0; i < payUty.length; ++i) {
      payUty[i].addEventListener('click', function (e) {

        this.classList.toggle('tile--active');

        if (this.classList.contains('tile--active')) {
          paymentFilters.push(this.dataset.pname);
        } else {
          paymentFilters.splice(paymentFilters.indexOf(this.dataset.pname), 1);
        }
      });
    }
  }

  function activatePOI() {
    var poi = document.getElementsByClassName('icon-box');

    for (var i = 0; i < poi.length; ++i) {
      poi[i].addEventListener('click', function (e) {
        this.classList.toggle('icon--active');

        if (this.classList.contains('icon--active')) {
          poiFilters.push(this.dataset.poiname);
        } else {
          poiFilters.splice(poiFilters.indexOf(this.dataset.poiname), 1);
        }
      });
    }
  }

  function getRating(rating) {
    var markup = '';

    for (var i = 1; i <= rating; ++i) {
      markup += '<span class="fa fa-star checked"></span>';
    }

    for (i; i <= 5; ++i) {
      markup += '<span class="fa fa-star"></span>';
    }

    return markup;
  }

  function displayResults(data) {
    var $cardWrapper = document.getElementById('js-card-wrapper');
    var markup = '';

    if (!data.stores.length) {
      $cardWrapper.innerHTML = '<p class="card-error">Whoops! No matching shops found 😒</p>';

      return;
    }

    for (var i = 0; i < data.stores.length - 1; ++i) {
      markup += `<div class="card-box">
                  <div class="card-text pos--relative">
                    <h1 class="card-head">${data.stores[i].name}</h1>
                    <p class="card-desc">${data.stores[i].description}</p>
                    <div class="card-misc pos--absolute">
                      <div class="card-rating">
                        ${getRating(data.stores[i].rating)}
                      </div>
                      <p class="card-dist">${data.stores[i].distance}</p>
                    </div>
                  </div>
                  <div class="card-img">
                    <img src="${data.stores[i].image_url}"/>
                  </div>
                </div>`;
    }

    markup += `<div class="card-box card-box--last">
                <div class="card-text pos--relative">
                  <h1 class="card-head">${data.stores[i].name}</h1>
                  <p class="card-desc">${data.stores[i].description}</p>
                  <div class="card-misc pos--absolute">
                    <div class="card-rating">
                      ${getRating(data.stores[i].rating)}
                    </div>
                    <p class="card-dist">${data.stores[i].distance}</p>
                  </div>
                </div>
                <div class="card-img">
                  <img src="${data.stores[i].image_url}"/>
                </div>
              </div>`;

    $cardWrapper.innerHTML = markup;
  }

  function getAllPOI() {
    return new Promise(function (resolve, reject) {
      const url = BASE_URL + '/stores';
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject();
        }
      };
      xhr.onerror = function () {
        reject();
      };
      xhr.send();
    });
  }

  function getPaymentFilter(payType) {
    return new Promise(function (resolve, reject) {
      const url = BASE_URL + '/stores?payment_type=' + payType;
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject();
        }
      };
      xhr.onerror = function () {
        reject();
      };
      xhr.send();
    });
  }

  function getDualFilter(payType, storeType) {
    return new Promise(function (resolve, reject) {
      const url = BASE_URL + '/stores?payment_type=' + payType + '&store_type=' + storeType;
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject();
        }
      };
      xhr.onerror = function () {
        reject();
      };
      xhr.send();
    });
  }

  function activateFooterButton() {
    var searchBtn = document.getElementById('js-icon-add');

    searchBtn.addEventListener('click', function (e) {
      if (searchBtn.children[0].src.indexOf('img/add-icon.svg') !== -1) {
        if (!paymentFilters.length && !poiFilters.length) {
          getAllPOI().then(function (response) {
            response = JSON.parse(response);

            pois = response.stores.map(e => {
              return [e.name, e.lat, e.long]
            });

            setState('map-view');

            displayResults(response);
          }, function () {
            console.error('Whoops! An error occured');
          });
        } else if (!!paymentFilters.length && !poiFilters.length) {
          getPaymentFilter(paymentFilters.join(',')).then(function (response) {
            response = JSON.parse(response);

            pois = response.stores.map(e => {
              return [e.name, e.lat, e.long]
            });

            setState('map-view');
            
            displayResults(response);
          }, function () {
            console.error('Whoops! An error occured');
          });
        }
        else if(!!paymentFilters.length && !!poiFilters.length) {
          getDualFilter(paymentFilters.join(','), poiFilters.join(',')).then(function (response) {
            response = JSON.parse(response);

            pois = response.stores.map(e => {
              return [e.name, e.lat, e.long]
            });

            setState('map-view');
            
            displayResults(response);
          }, function () {
            console.error('Whoops! An error occured');
          });
        }
      } else {
        setState('app-view');
      }
    });
  }

  function setMarkers(map) {
    for (var i = 0; i < pois.length; i++) {
      var poi = pois[i];

      var marker = new google.maps.Marker({
        position: {
          lat: +poi[1],
          lng: +poi[2]
        },
        map: map,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });
    }
  }

  function initMapView() {
    if (!document.getElementById('map').style.position) {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {
          lat: 12.9203455,
          lng: 77.6849276
        }
      });

      setMarkers(map);
    }
  }

  function init() {
    activatePOI();
    activatePaymentUtilities();
    activateFooterButton();

    setState('app-view');
  }

  init();
})();