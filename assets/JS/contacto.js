function initMap() {
    const uluru = { lat: -34.327040405791585, lng: -58.7930389 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }