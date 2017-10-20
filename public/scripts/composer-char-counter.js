// this code count characters in the input form:

$(document).ready(function() {
  $("textarea").keyup(function() {

    const count = 140 - Number(this.value.length);
      // count is a variable count the number of characters that could be typed in the form

    $(this).siblings('.counter').text(count).toggleClass("reach-limit", count < 0);
      // .text(count) using jQuery to update the count number in HTML
      // .toggleCalss() will add a class "reach-limit" to textarea in HTML if if reach the limit
  });
});
