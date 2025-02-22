// Fake data taken from initial-tweets.json
$(document).ready(function() {
  const $error = $(".error");
        $error.hide();
  // xss prevention
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
    
  };
  // after submitting tweet reload page
  const $form = $('#tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const text = $('#tweet-text').val();
    if (text.length > 140){
   return $error.slideDown(1500), 
       $error.slideUp(5000);
    }
   else if (text === "" || text.length === 0){
    return $error.slideDown(1500), 
    $error.slideUp(5000);
   } else{
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
    })
      .then(function() {
        loadTweets();
        $error.slideUp(200);
      })
    }
    $(this).find("#tweet-text").val("");
    $(this).find(".counter").val("140");
    })
  const createTweetElement = function (tweet) {
    let $tweet =
      $(`<article class="newTweet">
        <header class="newHeader">
          <div>
            <img src="${tweet.user.avatars}"></img>
            <p>${tweet.user.name}</p>
          </div>
          <p>${tweet.user.handle}</p>
        </header>
        <text name="text" class="newText">${escape(tweet.content.text)}</text>
        <footer class="newFooter">
          <p class="newLine">${timeago.format(tweet.created_at)}</p>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`);
    return $tweet;
  }
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $sumbitTweet = createTweetElement(tweet);
      $(".tweets-container").prepend($sumbitTweet);
    }
}

// load tweets to page
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
    .then((tweets) => {
      renderTweets(tweets)
    });
};
loadTweets();
})
