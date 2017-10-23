/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Function: calculate how long ago the tweet was created:
function parseHumanDate(timeCreated) {
  let created = new Date(timeCreated);
  let seconds = Math.floor((Date.now() - created) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
      return interval + ' years';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return interval + ' months';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return interval + ' days';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return interval + ' hours';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return interval + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}







// jQuery:
$(document).ready(function() {

// Function: a escape function to prevent Cross-Site Scripting:
function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


  // Function: take in a tweet object and return it in HTML:
  function createTweetElement(input) {
    return `
    <section class="all-tweets" id="tweets-hover">
      <header class="header">
        <img class="pic" src="${escape(input.user.avatars.small)}">
        <h2 class="tweets-h2">${escape(input.user.name)}</h2>
        <a class="tweeter-name">${escape(input.user.handle)}</a>
      </header>

      <article class="tweet">
        ${escape(input.content.text)}
      </article>

      <footer class="footer">
          ${escape(parseHumanDate(input.created_at))}
        <a class="icon">
          <i class="fa fa-flag" data-flag="${escape(input.user.tweetlike.flag)}" aria-hidden="true"></i>
          <i class="fa fa-retweet retweet" aria-hidden="true"></i>
          <i class="fa fa-heart heart" aria-hidden="true"></i>
        </a>
      </footer>

    </section>
    <br>`;
  }


// function createTweetElement1(input) {
//   const $section = $("<section>").addClass("all-tweets").attr("id", "tweets-hover");
//   const $header = $("<header>").addClass("header")
//     $header.append($("<img>").addClass("pic").attr("src", `${escape(input.user.avatars.small)}`));
//     $header.append($("<h2>").addClass("tweets-h2").text(`${escape(input.user.name)}`));
//     $header.append($("<a>").addClass("tweeter-name").text(`${escape(input.user.handle)}`));

//   const $article = $("<article>").addClass("tweet").text(`${escape(input.content.text)}`);

//   const $icon = $("<a>").addClass("icon")
//     $icon.append($(`<i class="fa fa-flag flag" data-flag="${escape(input.user.tweetlike.flag)}" aria-hidden="true"></i>`));
//     $icon.append($(`<i class="fa fa-retweet retweet" aria-hidden="true"></i>`));
//     $icon.append($(`<i class="fa fa-heart heart" aria-hidden="true"></i>`));

//   const $footer = $("<footer>").addClass("footer").text(`${escape(parseHumanDate(input.created_at))}`).append($icon);


//   $section.append($header).append($article).append($footer);


//   return $section;
// }


  // Function: taking in an array of tweet objects
  //           and appending each one to the #new-section in HTML
  function renderTweets(tweets) {
    $("#new-section").empty();
    tweets.forEach(function(tweet) {
      $('#new-section').prepend(createTweetElement(tweet));
   });
  }


  // Function: fetching tweets from /tweets page using /GET function in AJAX.
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      success: function (data) {
        renderTweets(data);
      }
    });
  }

  loadTweets();


  $("#toggle").click(function() {
    if($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideUp();
    } else {
      $(".new-tweet").slideDown(function() {
        $("textarea").focus();
      });
    }
  })




  let inputval = '';            // create a variable to save the input tweet.
  let countval = 0;             // create a variable to save the count characters in the tweet.

  $("textarea").keyup(function() {
    inputval = String(this.value);
    countval = (inputval.replace(/[\s\r]/g, "")).length;
    // .replace() use regular expression to delete all whitespace character (space, tap,
    // newline, etc.) before a non whitespace character, and count the length of it.
  });


  $("#post-tweet").submit(function(event) {
    event.preventDefault();                                 // prevent the default behaviour to leave the page
    if(countval >140) {                                     // verify if the input is over limit, >140 characters
      $(this).each(function() {
        alert("Sorry, the content is too long (>140)!!");
      });
    } else if (countval === 0) {                            // verify if the input is empty, or just whitespace characters
        $(this).each(function() {
          alert("Sorry, the content could not be empty!!");
        });
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: function(data) {
          loadTweets();
        }
      });
      $(this).trigger("reset");
      $(this).find(".counter").text('140');
    }
  });



});