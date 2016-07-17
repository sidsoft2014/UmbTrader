// Owl Carousel - Home page ticker
$(document).ready(function () {
    if ($('.js-owl') === undefined)
        return;

    $(".js-owl").owlCarousel({
        //Basic Speeds
        slideSpeed: 200,
        paginationSpeed: 400,
        rewindSpeed: 1000,

        //Autoplay
        autoPlay: true,
        stopOnHover: true,

        // Navigation
        navigation: true,
        navigationText: ["&laquo;", "&raquo;"],
        rewindNav: true,
        scrollPerPage: false,

        //Pagination
        pagination: true,
        paginationNumbers: false,

        //JSON
        jsonPath: 'https://poloniex.com/public?command=returnTicker',
        jsonSuccess: populateOwl
    });

    function populateOwl(data) {
        var content = "";
        var keys = Object.keys(data);

        for (var i in keys) {

            var key = keys[i];
            var item = data[key];

            var last = item.last;
            var change = item.percentChange;
            var col = parseFloat(change) > 0 ? 'up' : 'down';

            var line = "<div class='ticker-item-owl'>"
                + "<h4 class='ticker-item-name'>" + key + "</h4>"
                + "<h5 class='ticker-item-price'><i class='fa fa-ambulance'></i>" + last + "</h5>"
                + "<h5 class='ticker-item-price-" + col + "'>" + change + "</h5>"
                + "</div>"

            content += line;
        }
        $(".js-owl").html(content);
    }

});