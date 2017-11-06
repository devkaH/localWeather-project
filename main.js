

navigator.geolocation.getCurrentPosition(function (position){
	var Longitude = position.coords.longitude;
	var Latitude = position.coords.latitude;
	$.ajax({

		url : 'https://fcc-weather-api.glitch.me/api/current?lon='+Longitude+'&lat='+Latitude,
		type : 'GET',

		success : function(data) {


			updateData(data);
		},
		error : function()
		{
			$('.infoWeather').text("Geolocation is not supported by this browser.")  ;
		},
		beforeSend: function () { $('.infoWeather').append('<img class="imgSpinner" src="images/imgSpinner.gif">').css("text-align","center"); },


		complete: function () { $('.imgSpinner').hide(); }
	});


	function updateData(data){
		console.log(data);
		var city=data.name ;
		var state=data.sys.country;
		var temp=data.main.temp ;
		var weather=data.weather[0].description ;
		var time=new Date($.now());
		$('.dateTime').text(time.toString()).css({"color": "#ecd68b", "font-family": "'Lucida Sans Unicode', 'Lucida Grande', sans-serif","font-size" : "2rem"});
		
		$('.location').text(city + "," + state);
		
		$('.temp').text(temp + " °C");
		$('.weather').text(weather);

		switch (weather) {
			case "scattered clouds":
			$('.weatherBox').append('<img src="images/scatteredClouds.gif">').css("text-align","center");
			break;
			case "sunny":
			$('.weatherBox').append('<img src="images/sunny.gif">').css("text-align","center");
			break;
			case "thunderstorm":
			$('.weatherBox').append('<img src="images/thunderstorm.gif">').css("text-align","center");
			break;
			case "rainy":
			$('.weatherBox').append('<img src="images/raining.gif">').css("text-align","center");
			break;
			case "fews clouds":
			$('.weatherBox').append('<img src="images/cloudy.gif">').css("text-align","center");
			break;
			case "light rain":
			$('.weatherBox').append('<img src="images/lightRain.gif">').css("text-align","center");
			break;

			
		}


		$('.temp').on('click', function(){

			if ($(this).hasClass('celcius')) {
				$('.temp')
					.removeClass('celcius')
					.addClass('fahrenheit')
					.text(setCelcius());
			} else {
				$('.temp')
					.removeClass('fahrenheit')
					.addClass('celcius')
					.text(setFahrenheit());
			}

			// $('.temp').text(setCelcius());
		});

		function setCelcius(){
			var fah = (temp * 1.8) + 32 ;
			return fah.toFixed(2) + " °F";
		};

		function setFahrenheit(){
			return temp + " °C";
		};
	}





});
