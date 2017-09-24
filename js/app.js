// Create a map variable
// Create placemarkers array to use in multiple functions to have control
// over the number of places that show.
var placeMarkers = [];

var storeLocations = [
    {
      title: "Macys SFO",
      location: {lat: 37.786799, lng: -122.407396},
      streetAddress: "170 O'Farrell St",
      cityStateZipCode: "San Francisco, CA 94102",
      visible: ko.observable(true),
      id: "store0",
      showMarker: true
    },
    {
      title: "Macys Daly City",
      location: {lat: 37.673510, lng: -122.470751},
      streetAddress: "1 Serramonte Center",
      cityStateZipCode: "Daly City, CA 94015-2345",
      visible: ko.observable(true),
      id: "store1",
      showMarker: true
    },
    {
      title: "Macys San Mateo",
      location: {lat: 37.537462, lng: -122.299842},
      streetAddress: "301 E Sailer Dr",
      cityStateZipCode: "San Mateo, CA 94403",
      visible: ko.observable(true),
      id: 'store2',
      showMarker: true
    },
    {
      title: "Macys Palo Alto",
      location: {lat: 37.442198, lng: -122.171642},
      streetAddress: "300 Stanford Shopping Center",
      cityStateZipCode: "Palo Alto, CA 94304",
      visible: ko.observable(true),
      id: "store3",
      showMarker: true
    },
    {
      title: "Macys Sunnyvale",
      location: {lat: 37.375753, lng: -122.031632},
      streetAddress: "200 W Washington Ave",
      cityStateZipCode: "Sunnyvale, CA 94086",
      visible: ko.observable(true),
      id: "store4",
      showMarker: true
    },
    {
      title: "Macys Santa Clara",
      location: {lat: 37.324180, lng: -121.948368},
      streetAddress: "2801 Stevens Creek Blvd",
      cityStateZipCode: "Santa Clara, CA 95050",
      visible: ko.observable(true),
      id: "store5",
      showMarker: true
    },
    {
      title: "Macys San Jose",
      location: {lat: 37.253498, lng: -121.863317},
      streetAddress: "5411 Thornwood Dr",
      cityStateZipCode: "San Jose, CA 95123",
      visible: ko.observable(true),
      id: "store6",
      showMarker: true
    },
    {
      title: "Macys San Jose",
      location: {lat: 37.327784, lng: -121.817787},
      streetAddress: "2210 Tully Rd",
      cityStateZipCode: "San Jose, CA 95122",
      visible: ko.observable(true),
      id: "store7",
      showMarker: true
    },
    {
      title: "Macys Newark",
      location: {lat: 37.525462, lng: -122.001455},
      streetAddress: "200 Newpark Mall",
      cityStateZipCode: "Newark, CA 94560",
      visible: ko.observable(true),
      id: "store8",
      showMarker: true
    },
    {
      title: "Macys Hayward",
      location: {lat: 37.650172, lng: -122.104354},
      streetAddress: "800 Southland Mall Drive",
      cityStateZipCode: "Hayward, CA 94545",
      visible: ko.observable(true),
      id: "store9",
      showMarker: true
    },
    {
      title: "Macys San Leandro",
      location: {lat: 37.702945, lng: -122.125960},
      streetAddress: "15555 E. 14th Street",
      cityStateZipCode: "San Leandro, CA 94578",
      visible: ko.observable(true),
      id: "store10",
      showMarker: true
    },
    {
      title: "Macys Pleasanton",
      location: {lat: 37.693580, lng: -121.928217},
      streetAddress: "1300 Stoneridge Mall Rd",
      cityStateZipCode: "Pleasanton, CA 94588",
      visible: ko.observable(true),
      id: "store11",
      showMarker: true
    },
    {
      title: "Macys Walnut Creek",
      location: {lat: 37.895163, lng: -122.058294},
      streetAddress: "1301 Broadway Plaza",
      cityStateZipCode: "Walnut Creek, CA 94596",
      visible: ko.observable(true),
      id: "store12",
      showMarker: true
    },
    {
      title: "MAcys Antioch",
      location: {lat: 38.000083, lng: -121.841820},
      streetAddress: "2500 Somersville Rd",
      cityStateZipCode: "Antioch, CA 94509",
      visible: ko.observable(true),
      id: "store13",
      showMarker: true
    },
    {
      title: "Macys Tracy",
      location: {lat: 37.761864, lng: -121.458828},
      streetAddress: "3400 Naglee Road",
      cityStateZipCode: "Tracy, CA 95304",
      visible: ko.observable(true),
      id: "store14",
      showMarker: true
    }
];

// Function to initialize the map within the map div
function initMap() {

    var locations = [];
    for (var idx = 0; idx < storeLocations.length; idx++) {
        var item = storeLocations[idx];
        item.id = "store" + idx;
        locations.push(item);
    }

    var uluru = {lat: 37.5483, lng: -121.9886};

    var infowindow = new google.maps.InfoWindow();

    var mapOptions = {
      center: uluru,
      zoom: 10,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER
        },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
       disableDefaultUI: true
    };

    if ($(window).width() <= 1080) {
      mapOptions.zoom = 10;
    }

    if ($(window).width() < 850) {
        mapOptions.zoom = 10;
        hideNav();
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    createMarkers(locations);

    setUpMap();

    //Reset map on click handler and
    //when window resize conditionals are met
    function resetMap() {
        var windowWidth = $(window).width();
        if (infowindow) {
              infowindow.close();
            }
        if (windowWidth > 1080) {
            map.setZoom(10);
            map.setCenter(mapOptions.center);
        } else if(windowWidth <= 1080) {
            map.setZoom(10);
            map.setCenter(mapOptions.center);
        } else if(windowWidth < 850) {
            map.setZoom(10);
            map.setCenter(mapOptions.center);
        }
    }

    $("#reset").click(function() {
        resetMap();
    });

    $(window).resize(function() {
        resetMap();
    });

    // This function populates the infowindow when the marker is clicked.
    // We'll only allow one infowindow which will open at the marker that
    // is clicked, and populate based on that markers position.

    function setUpMap() {
      for (var i = 0; i < locations.length; i++) {
        if(locations[i].showMarker === true) {
          locations[i].positionMarker.setMap(map);
        } else {
          locations[i].positionMarker.setMap(null);
        }
      }
    }

    function createMarkers(locations) {

        for(i=0; i<locations.length; i++) {

          locations[i].positionMarker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].location.lat,
              locations[i].location.lng),
            map: map,
            title: locations[i].title,
            streetAddress: locations[i].streetAddress,
            cityStateZipCode: locations[i].cityStateZipCode,
            animation: google.maps.Animation.DROP,
            icon: {
              url: 'image/marker.png',
              size: new google.maps.Size(25, 40),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(12.5, 40)
            }
          });

          //Click marker to view infoWindow
          //zoom in and center location on click

          new google.maps.event.addListener(locations[i].positionMarker,
                    'click', createInfoWindow(locations[i].positionMarker));
          //Click nav element to view infoWindow
          //zoom in and center location on click
        } // end of for

    } // end of createMarkers

    //Get Google Street View Image for each inidividual marker
    //Passed lat and lng to get each image location
    function createInfoWindow(marker) {
      return function() {
        if (infowindow) {
          infowindow.close();
        }
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        populateInfoWindow(marker, infowindow);
        infowindow.open(map, marker);
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(13);
        } else if(windowWidth > 1080) {
            map.setZoom(13);
        }
        map.setCenter(marker.getPosition());
        marker.picshowMarker = true;
        google.maps.event.addListener(infowindow,'closeclick',function(){
          marker.setAnimation(google.maps.Animation.drop);
          resetMap();
        });
      };
    }

    function populateInfoWindow(marker, infowindow) {

      if (infowindow.marker != marker) {
        infowindow.setContent('');
        infowindow.marker = marker;
        infowindow.addListener('closeclick', function() {
          infowindow.marker = null;
        });

        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
        var temp_f;
        var icon_url;
        var icon;
        var url = "http://api.wunderground.com/api/4609de5ed8f9692d/geolookup/conditions/q/" +
                  marker.position.lat() + "," + marker.position.lng() + ".json";

        var getStreetView = function (data, status) {
          if (status == google.maps.StreetViewStatus.OK) {
            contentString = '<div id="pano"></div><br><hr style="margin-bottom: 5px"><strong>' +
                            marker.title +
                            '</strong><br><p>' +
                            marker.streetAddress +
                            '<br>' + marker.cityStateZipCode + '<br></p>' +
                            '<ul style="padding: 0; margin: 0"><li style="padding: 0">' +
                            'Temp: ' + temp_f +
                            '° F <img style="width: 25px" src=' +
                            icon_url + '>' + icon +
                            '<img style="" src=image/wundergroundLogo_4c.jpg>' +
                            '</li></ul>';
            var nearStreetViewLocation = data.location.latLng;
            var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position
            );
            infowindow.setContent(contentString);

            var panoramaOptions = {
                position: nearStreetViewLocation,
                pov: {
                    heading: 20,
                    pitch: 20
                }
            };

            new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions
            );

          } else {
            infowindow.setContent('<div>' + marker.title + '</div>' +
              '<div>No Street View Found</div>' +
              '<ul style="padding: 0; margin: 0"><li style="padding: 0">' +
              'Temp: ' + temp_f + '° F <img style="width: 25px" src=' +
              icon_url + '>' + icon +
              '<img style="" src=image/wundergroundLogo_4c.jpg>' +
              '</li></ul>');
          }
        };

        // getting data from weather underground API
        $.getJSON(url, function(data) {
          temp_f = data.current_observation.temp_f;
          icon_url = data.current_observation.icon_url;
          icon = data.current_observation.icon;
          //function to place google street view images within info windows
          streetViewService.getPanoramaByLocation(marker.position,
            radius, getStreetView);
        }).fail(function(e){
          alert("Data from Weather Undergorund API cannot be load");
        });
      }
    }

    var viewModel = {
        query: ko.observable('')
    };

    viewModel.locations = ko.dependentObservable(function() {
        var self = this;
        var search = self.query().toLowerCase();
        return ko.utils.arrayFilter(locations, function(location) {
            if (location.title.toLowerCase().indexOf(search) >= 0) {
                location.showMarker = true;
                return location.visible(true);
            } else {
                location.showMarker = false;
                setUpMap();
                return location.visible(false);
            }
        });
    }, viewModel);

    ko.applyBindings(viewModel);


    $("#input").keyup(function() {
        setUpMap();
    });

//show and hide markers in sync with nav
    var isNavVisible = true;
    function hideNav() {
      $(".options-box").animate({
          height: 0
      }, 500);
      setTimeout(function() {
          $(".options-box").hide();
      }, 500);
      isNavVisible = false;
    }

    function showNav() {
      $(".options-box").show();
      var scrollerHeight = $("#place-list").height() + 55;
      if($(window).height() < 600) {
        $(".options-box").animate({
          height: scrollerHeight - 100,
        }, 500, function() {
        $(this).css('height','auto').css("max-height", 439);
        });
      } else {
        $(".options-box").animate({
          height: scrollerHeight,
        }, 500, function() {
          $(this).css('height','auto').css("max-height", 549);
        });
      }
      isNavVisible = true;
    }

    function navState() {
      if(isNavVisible === true) {
        hideNav();
      } else {
        showNav();
      }
    }

    $(".hamburger-container").click(navState);


    for (var i = 0; i < locations.length; i++) {
      var searchNav = $('#store' + i);
      searchNav.click(createInfoWindow(locations[i].positionMarker));
    }
}

