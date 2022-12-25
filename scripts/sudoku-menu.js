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
        setCookie(this.innerText, "enabled", expDate);
        console.log(this.innerText) // REMOVE EVENTUALLY
    });

    // change color of board using cookies
    $(".chg-color-btn").click(function() {
        var color = $("#custom").spectrum("get");
        // resets cookies, so that the most recent cookie will determine the color of the board
        deleteAllCookies();  
        setCookie(color.toHexString(), "enabled", expDate);
        console.log(color.toHexString()); // REMOVE EVENTUALLY
    });
});

// cookie setter
function setCookie(name, value, expirationDate) {
    document.cookie = name + "=" + value + "; expires=" + expirationDate.toUTCString();
}

// expiration date for cookies (one-day)
var expDate = new Date();
expDate.setDate(expDate.getDate() + 1);

function deleteAllCookies() {
    // gets all cookies
    var cookies = document.cookie.split(";");

    // iterate through all cookies and delete each of them
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i]; // each particular cookie
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
