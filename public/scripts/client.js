// Fake data taken from initial-tweets.json
$(document).ready(function() {
  // xss prevention
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // after submitting tweet reload page
  $("form").on("submit", function (event) {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
    })
      .then(function() {
        loadTweets();
      });
      // refresh char counter and make empty
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val("140");
    })
  const createTweetElement = function (tweet) {
    let $tweet =
      $(`<article class="sampleTweet">
        <header class="sampleHeader">
          <div>
            <img src="${tweet.user.avatars}"></img>
            <p>${tweet.user.name}</p>
          </div>
          <p>${tweet.user.handle}</p>
        </header>
        <textarea name="text" class="sampleText">${escape(tweet.content.text)}</textarea>
        <footer class="sampleFooter">
          <p class="sampleLine">${timeago.format(tweet.created_at)}</p>
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
