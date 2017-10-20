/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function calculateSince(datetime)
{
  var tTime=new Date(datetime);
  var cTime=new Date();
  var sinceMin=Math.round((cTime-tTime)/60000);
  if(sinceMin==0)
  {
      var sinceSec=Math.round((cTime-tTime)/1000);
      if(sinceSec<10)
        var since='less than 10 seconds ago';
      else if(sinceSec<20)
        var since='less than 20 seconds ago';
      else
        var since='half a minute ago';
  }
  else if(sinceMin==1)
  {
      var sinceSec=Math.round((cTime-tTime)/1000);
      if(sinceSec==30)
        var since='half a minute ago';
      else if(sinceSec<60)
        var since='less than a minute ago';
      else
        var since='1 minute ago';
  }
  else if(sinceMin<45)
      var since=sinceMin+' minutes ago';
  else if(sinceMin>44&&sinceMin<60)
      var since='about 1 hour ago';
  else if(sinceMin<1440){
      var sinceHr=Math.round(sinceMin/60);
  if(sinceHr==1)
    var since='about 1 hour ago';
  else
    var since='about '+sinceHr+' hours ago';
  }
  else if(sinceMin>1439&&sinceMin<2880)
      var since='1 day ago';
  else
  {
      var sinceDay=Math.round(sinceMin/1440);
      var since=sinceDay+' days ago';
  }
  return since;
};

// Fake data taken from tweets.json
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

$(document).ready(function() {

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      success: function (data) {
        renderTweets(data);
        // console.log("success");
      }
    });
  }

  loadTweets();



function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  $("#new-section").empty();
  tweets.forEach(function(tweet) {
    $('#new-section').prepend(createTweetElement(tweet));
 });

}

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
          ${escape(calculateSince(input.created_at))}
        <a class="icon">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </a>
      </footer>

    </section>
    <br>
  `;
  }

}