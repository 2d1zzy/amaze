function main() {
    "use strict";

    const tabs = $(".tabs a span");

    const toDos = [
        "Get Groceries",
        "Make up some new ToDos",
        "Coding is awesome",
        "Take Gracie to the park",
        "Coding is your future",
    ];

    tabs.toArray().forEach(function (element) {
        // create a click handler for this element
        $(element).on("click", function () {
            // since we're using the jquery version of element,
            // we'll go ahead and create a temporary variable
            // so we don't need to keep recreating it
            const $element = $(element);
            let $content; // Declare $content variable to hold content for the tabs
           
           // Remove the 'active' class from all tabs and add it to the clicked one
            tabs.removeClass("active");
            $element.addClass("active");
            
            // Empty the content area
            $("main .content").empty();

            // Check which tab was clicked
            if ($element.parent().is(":nth-child(1)")) {
                console.log("FIRST TAB CLICKED!");

                // Create a ul element for the first tab (newest to-do first)
                $content = $("<ul>");

                // loop backward through the toDos array
                for (let i = toDos.length -1; i >= 0; i--){
                    $content.append($("<li>").text(toDos[i]));
                }

                // Append the content to the main content area
                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(2)")) {
                console.log("SECOND TAB CLICKED!");

                // Create aa ul element for the second tab
                $content = $("<ul>");

                // Loop through the toDos to the main content area
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });

                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("THIRD TAB CLICKED!");
            }

            return false;
        });
    });

    $(".tab a:first-child span").trigger("click");
}



$(document).ready(main); 