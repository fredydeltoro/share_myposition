$(document).ready(function() {

	var lat;
	var	lng;
	var geocoder;
	var cords = {};
	var dir;
	window.io = io.connect();

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(positionSuccess);
	} else {
		error('not supported');
	}

	function positionSuccess(position) {

		geocoder = new google.maps.Geocoder();

		lat = position.coords.latitude;
		lng = position.coords.longitude;
		var acr = position.coords.accuracy;
		var latlng = new google.maps.LatLng(lat,lng);

		geocoder.geocode({'latLng': latlng}, function (results, status) {
		 	if (status == google.maps.GeocoderStatus.OK) {
		 		if (results[0]) {
		 			$('.lugar').text('Estas en '+results[0].formatted_address);
		 			dir = results[0].formatted_address;

		 			cords = {
						lat: lat,
						lng: lng,
						add: dir
					};

					io.emit('position', cords);
		 		}
		 		else {
		 			alert('No se encontraron resultados');
		 		}
		 	}
		 	else {
		 		alert('fallo por: ' + status);
		 	}
		 });
			
	};

	io.on('aver', function (data) {

		$('#cordenadas').append(
				'<li>'+
				  '<div class="top">'+
				    '<h2>'+data.user+'</h2>'+
				  '</div>'+
				    '<div class="bottom">'+
				    '<p><span>'+'Lugar: '+'</span>'+data.address+'</p>'+
				    '<p><span>'+'Latitud: '+'</span>'+data.latitude+'</p>'+
				    '<p><span>'+'Longitud: '+'</span>'+data.longitude+'</p>'+
				    '<div class="sign">'+
				    '<a href='+'/ruta?'+'latdest='+encodeURIComponent(data.latitude)+'&lngdest='+encodeURIComponent(data.longitude)+
				    '&latori='+encodeURIComponent(lat)+'&lngori='+encodeURIComponent(lng)+'&userdest='+encodeURIComponent(data.user)+'>'+
				    'Ir...</a>'+
				    '</div>'+
				  '</div>'+
				'</li>'
				);

	});

});

