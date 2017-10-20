$(document).ready(function() {
  $("textarea").keyup(function() {
    const count = 140 - Number(this.value.length);
    $(this).siblings('.counter').text(count).toggleClass("reach-limit", count < 0);
  });
});



// // // $(document).ready(function () {

// // //   let count = 140;


// // //   $('textarea').keyup(function() {
// // //     var tweetCount = count - Number(this.value.length);
// // //     var color = (tweetCount < 0) ? "red" : "black";

// // //     $(this).siblings(".counter")
// // //       .text(tweetCount)
// // //       .css("color", color);
// // //   });
// // // });