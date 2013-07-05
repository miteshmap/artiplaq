(function ($) {
  Drupal.behaviors.storeLocator =  {
    attach: function(context, settings) {
        var url = settings.basePath+ 'list-store/json/' + settings.storelocator.cid;
        initialize(url);
        //google.maps.event.addDomListener(window, 'load', initialize);
    }
 } 
})(jQuery);


var geocoder;
var map;
var markersArray = new Array();
var infowindow = null;
var side_bar_html = ""; 

function initialize(url) {
  
  geocoder = new google.maps.Geocoder();

  var mapOptions = {
    zoom: 4,
    //center: new google.maps.LatLng(-25.363882, 131.044922),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  infowindow = new google.maps.InfoWindow({content: "loading..."});
  codeAddress(url);
  //document.getElementById("side_bar").innerHTML = side_bar_html;  
}

function codeAddress(url) {
    //Delete Existing Markers
    clearOverlays();
    deleteOverlays();
    
    jQuery.getJSON(url,function(data) {
      var items = [];
      jQuery.each(data, function(key, val) {
        jQuery.each(val, function(i, record) {
          //alert('<li id="' + i + '">' + record.node.address + '</li>');
          
          var address = record.node.address;
          //var address = "\n \n Dealer #1\n \n 1716 US 27 North Sebring, \n 33870\n Bradenton, FL\n United States\n \n \n";
          geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                //add the center marker
                var patientslocation =results[0].geometry.location;
                addMarker(patientslocation, record.node);
                //Zoom in on the Region.
                map.setZoom(10);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
          });
          
        });
      });
          
    });
}

function addMarker(location, desc) {
   console.log("Adding Marker: "+location);
   var htmlAddress = desc.address.replace(/\n\n/g, "<br />").replace(desc.title, "").replace(/ +(?= )/g,'');
   var marker = new google.maps.Marker({
        position: location,
        map: map,
        title:desc.title,
        html: htmlAddress
    });
    
   google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(this.title + '<br />'+this.html);
        infowindow.open(map, this);
    });
  markersArray.push(marker);
  
  var dealerhtml =  '<a href="javascript:dealerClick(' + (markersArray.length-1) + ')">' + desc.title + '<\/a><br>' +
                    '<p class="store_info">' +  desc.phone + '<br>' + htmlAddress + '<br>'+
                    '<a href="http://maps.google.com/maps?daddr=' + htmlAddress + '">Get Directions</a></p>'
  jQuery('#side_bar ul').append('<li>' + dealerhtml + '</li>');
}
//Clears the Markers from the map.
function clearOverlays() {
    console.log("Clearing Overlays");
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
    }
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
    console.log("Deleting Overlays");
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }
}

function dealerClick(i) {
  google.maps.event.trigger(markersArray[i], "click");
}