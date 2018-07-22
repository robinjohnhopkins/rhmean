'use strict';

export function GeoService() {
  'ngInject';

  var currentPosition = {
      lat: 51.1,
      lon: -2.2
  }
  console.log("GeoService ctor");
  var geolocateCurrentUser = function (cb) {
    var vm = this;
    var handleLocationError = function (browserHasGeolocation, failure) {
      if (failure) {
        console.log(failure.message);
      }
      console.log('thought so - no location!!!!!' + browserHasGeolocation);
    }

    // Try HTML5 geolocation.Starting with Chrome 50, Chrome no longer 
    // supports obtaining the user's location using the HTML5 
    // Geolocation API from pages delivered by non-secure connections.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        currentPosition.lat = position.coords.latitude;
        currentPosition.lon = position.coords.longitude;
        console.log('geo service got location!!!!!' + JSON.stringify(currentPosition));
        if (cb) {
          cb(currentPosition)
        }
      }, function (failure) {
        handleLocationError(true, failure);
      }, {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, null);
    }
  }
  geolocateCurrentUser();

  var Geo = {
    /**
     * Gets already determined current position
     *
     * @return {Object}
     */
    getCurrentPositionSync() {
      return currentPosition;
    },

    /**
     * Gets current position
     * @cb callback called if lat lon determined
     * @return notDefined
     */
    getCurrentPosition(cb) {
      geolocateCurrentUser(cb);
    }
    

  };

  return Geo;
}
