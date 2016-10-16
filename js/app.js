// open weather map api key
var ApiKey = '575d6a8a0eda57506aefa0a327af4b19';

$(document).ready(function() {

    var latitude, longitude, date, tempUnitLabels, locationHTML, dateHTML, tempHTML, tempUnitHTML;
    // pull html elements to be updated
    locationHTML = $('#location');
    dateHTML = $('#date');
    tempHTML = $('#temp-value');
    tempUnitHTML = $('#temp-unit');

    // temperatures units labels object
    tempUnitLabels = {
        celsius: '°C',
        farenheit: '°F'
    };

    // actual formatted date
    date = getFormattedDate();

    getLocation(getWeatherData);

    // fetch the open weather map api
    function getWeatherData(lat, lon) {
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&APPID=' + ApiKey, function(json) {
            tempUnitHTML.html(tempUnitLabels.celsius);
            dateHTML.html(date);
            locationHTML.html(json.name);
            tempHTML.html(json.main.temp.toFixed(1));
            handleTempUnitChange();
        });
    }

    // handle radio button change 
    function handleTempUnitChange() {
        $('#celsius').prop('checked', true);
        var actualVal = tempHTML.html();
        $('input[name="temp-unit"]').change(function() {
            console.log('changed');
            if ($('input[name="temp-unit"]:checked').val() === 'celsius') {
                $('#temp-value').html(actualVal);
                tempUnitHTML.html(tempUnitLabels.celsius);
            } else {
                $('#temp-value').html(celsiusToFarenheit(actualVal).toFixed(1));
                tempUnitHTML.html(tempUnitLabels.farenheit);
            }
        });
    }

    // convert celsius to farenheit
    function celsiusToFarenheit(celsius) {
        return (celsius * 5 / 9) + 32;
    }

    // format date
    function getFormattedDate() {
        var date = new Date();
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        return day + ' ' + months[month] + ' ' + year;
    }

    // retrieve the geolocation from the browser
    function getLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                callback(position.coords.latitude, position.coords.longitude);
            });
        } else {
            throw new Error('Your browser doesnt support geolocation');
        }
    }
});
