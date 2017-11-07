

navigator.geolocation.getCurrentPosition(function (position){
	var Longitude = position.coords.longitude;
	var Latitude = position.coords.latitude;
	
	// ajax GET request to get weather information

	$.ajax({

		url : 'https://fcc-weather-api.glitch.me/api/current?lon='+Longitude+'&lat='+Latitude,
		type : 'GET',

		success : function(data) {


			updateUI(data);
		},
		error : function()
		{
			$('.infoWeather').text("Geolocation is not supported by this browser.")  ;
		},
		beforeSend: function () { $('.infoWeather').append('<img class="imgSpinner" src="images/imgSpinner.gif">').css("text-align","center"); },


		complete: function () { $('.imgSpinner').hide(); }
	});

    // Add data to html page
	function updateUI(data){
		
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
			
				$(".weatherIcon").attr("src","images/scatteredClouds.gif");
				break;
			case "sunny":
				
				$(".weatherIcon").attr("src","images/sunny.gif");
				break;
			case "thunderstorm":
			
				$(".weatherIcon").attr("src","images/thunderstorm.gif");
				break;
			case "rainy":
				
				$(".weatherIcon").attr("src","images/raining.gif");
				break;
			case "fews clouds":
				
				$(".weatherIcon").attr("src","images/cloudy.gif");
			break;
			case "light rain":
			
				$(".weatherIcon").attr("src","images/lightRain.gif");
				break;

			
		}

        // Change unity of temperature (°F,°C)
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
