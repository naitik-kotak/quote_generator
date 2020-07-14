$('button').click(getQuotes);

function randomNumber(upperLimit = 200) {
  return Math.floor(Math.random() * upperLimit + 1);
}

function getQuotes(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://type.fit/api/quotes`, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      const quoteToDisplay = response.filter((quote) => {
        return e.target.value === quote.author;
      });

      let output = '';

      if (quoteToDisplay.length !== 0) {
        const authorQuoteNumber = randomNumber(quoteToDisplay.length);
        output += `<h2>${quoteToDisplay[authorQuoteNumber].text}</h2><br>~${quoteToDisplay[authorQuoteNumber].author}`;
      } else {
        const quoteNumber = randomNumber();
        output += `<h2>${response[quoteNumber].text}</h2><br>~${response[quoteNumber].author}`;
      }

      $('.quote-here').html(output);
    }
  };

  xhr.send();

  e.preventDefault();
}
