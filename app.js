const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

let apiQuotes = [];

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error here
  }
}

const newQuote = () => {
  loading();
  // Pick a random quote from API
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Removing Type.fit from the author
  if (quote.author.includes("type.fit")) {
    quote.author = quote.author.replace("type.fit", "");
  }

  // Checking if author is unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check if the text quote is too long.
  if (quote.text.length > 20) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = `${quote.text} - ${quote.author}`;
  complete();
}

// Show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
}






// Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
 // Event Listeners
 newQuoteBtn.addEventListener("click", newQuote);
 twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
