var main = function (toDoObjects) {
    "use strict";

    var tabs = $(".tabs a span");

    // Extract descriptions from toDoObjects to populate initial toDos array
    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });

    tabs.toArray().forEach(function (element) {
        // create a click handler for this element
        $(element).on("click", function () {
            var $element = $(element);
            var $content;

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
                for (var i = toDos.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }

                // Append the content to the main content area
                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(2)")) {
                console.log("SECOND TAB CLICKED!");

                // Create a ul element for the second tab (oldest to-do first)
                $content = $("<ul>");

                // Loop through the toDos to the main content area
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });

                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("THIRD TAB CLICKED!");

                // Logic for the Tags tab
                var tags = [];

                // Loop through the toDoObjects to get the tags
                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag); // Push only unique tags
                        }
                    });
                });

                // Create a div for the tags
                $content = $("<div>");
                tags.forEach(function (tag) {
                    var $tag = $("<span>").text(tag + " "); // ADD a space for each tag
                    $content.append($tag);
                });

                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(4)")) {
                console.log("ADD TAB CLICKED!");

                // Create input and button elements for adding a new to-do
                var $input = $("<input>");
                var $button = $("<button>").text("+");

                // Add click event to the button
                $button.on("click", function () {
                    var newToDo = $input.val();
                    if (newToDo) {
                        toDos.push(newToDo);
                        // Add the new To-Do object
                        toDoObjects.push({ description: newToDo, tags: [] });
                    }
                    $input.val(""); // Clear the input
                });

                $content = $("<div>").append($input).append($button);
                $("main .content").append($content);
            }

            return false; // Prevent default anchor behavior
        });
    });

    // Trigger click on the first tab on page load
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("to-dos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});