// open weather map api key
var ApiKey = '575d6a8a0eda57506aefa0a327af4b19';

$(document).ready(function() {

    var latitude, longitude, date;
    date = getFormattedDate();
    getLocation(function(lat, lon) {
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + ApiKey, function(json) {
            // var data = JSON.stringify(json);
            console.log(json);
            $('#date').html(date);
            $('#location').html(json.name);
            $('#temp-value').html(json.main.temp);
        });
    });


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
