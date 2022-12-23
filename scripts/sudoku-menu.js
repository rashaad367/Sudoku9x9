$(document).ready(function() {
    $("#custom").spectrum({
        showPaletteOnly: true,
        showPalette:true,
        color: 'whitesmoke',
        palette: [
            ['whitesmoke', 'lightgrey', 'blanchedalmond','lightslategrey', 'silver'],
            ['lightcoral', 'lightgoldenrodyellow', 'lightgreen', 'lightblue', 'burlywood']
        ]
    });


    // difficulty button selection notifier
    $(".diff").click(function() {
        // remove class from all difficulty buttons
        $(".diff").removeClass("selected");
        // adds class to difficulty button just clicked on
        $(this).addClass("selected");
    });

    // change color of board using cookies
    $(".chg-color-btn").click(function() {
        var color = $("#custom").spectrum("get");
        setCookie(color.toHexString(), "enabled", expDate);
        console.log(color.toHexString());
    });
});

// cookie setter
function setCookie(name, value, expirationDate) {
    document.cookie = name + "=" + value + "; expires=" + expirationDate.toUTCString();
}

// expiration date for cookies (one-day)
var expDate = new Date();
expDate.setDate(expDate.getDate() + 1);