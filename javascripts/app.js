var main = function (toDoObjects) {
  "use strict";

  var organizeByTags = function (toDoObjects) {
    var tags = [];
    toDoObjects.forEach(function (toDo) {
      toDo.tags.forEach(function (tag) {
        if (tags.indexOf(tag) === -1) {
          tags.push(tag);
        }
      });
    });
    var tagObjects = tags.map(function (tag) {
      var toDosWithTag = [];
      toDoObjects.forEach(function (toDo) {
        if (toDo.tags.indexOf(tag) !== -1) {
          toDosWithTag.push(toDo.description);
        }
      });
      return { name: tag, toDos: toDosWithTag };
    });
    return tagObjects;
  };

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
        console.log("TAGS TAB CLICKED!");

        // Call the organizeByTags function to get the organized data
        var organizedByTag = organizeByTags(toDoObjects);

        // Now render the UI based on the organizedByTag data
        organizedByTag.forEach(function (tag) {
          var $tagName = $("<h3>").text(tag.name),
            $content = $("<ul>");

          tag.toDos.forEach(function (description) {
            var $li = $("<li>").text(description);
            $content.append($li);
          });

          $("main .content").append($tagName);
          $("main .content").append($content);
        });
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
