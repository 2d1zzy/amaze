const main = function () {
    "use strict";

    const tabs = $(".tabs span");

    tabs.toArray().forEach(function (element) {
        // create a click handler for this element
        $(element).on("click", function () { 
            tabs.removeClass("active"); // use the cached variable
            $("main .content").empty();
            return false;
        });
    });
};

$(document).ready(main);
