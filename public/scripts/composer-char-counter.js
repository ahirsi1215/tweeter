$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const charLength = $(this).val().length;
    const chars = $(this).parent();
    const counter = chars.parent().find(".counter");
    const charLengthFinal = 140 - charLength
    counter.text(charLengthFinal);

    if (charLengthFinal < 0) {
      counter.css("color", "red");
    } else{
      counter.css("color", "black");
    }
  });
}); 