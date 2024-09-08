function main() {
    "use strict";

    const tabs = $(".tabs a span");

    tabs.toArray().forEach(function (element) {
        // create a click handler for this element
    
        // create a click handler for this element
        
        // create a click handler for this element
        $(element).on("click", function () {
            // since we're using the jquery version of element,
            // we'll go ahead and create a temporary variable
            // so we don't need to keep recreating it
            const $element = $(element); // Use const because $element isn't reassigned
            tabs.removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            // Check which tab was clicked
            if ($element.parent().is(":nth-child(1)")) {
                console.log("FIRST TAB CLICKED!");
            } else if ($element.parent().is(":nth-child(2)")) {
                console.log("SECOND TAB CLICKED!");
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("THIRD TAB CLICKED!");
            }

            return false;
        });
    });

}



$(document).ready(main); 