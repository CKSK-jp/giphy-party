const gifContainer = $('#gif-container');
const apiKey = 'JagTn8EityndMAlasyg4qImjLwt7UlrU';

// handle user input, use input for request, and append to screen
$('#submit-btn').on('click', async (event) => {
  event.preventDefault();
  const formInput = $('#input-value').val();
  const results = await getGif(formInput);
  const randomGif = selectGif(results);

  const gif = $(`<img loading="lazy" src=${randomGif.url}>`)
  gif.appendTo(gifContainer);
});

// get response data and save to results
async function getGif(query) {
  try {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', { params: { api_key: apiKey, q: query } });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

// randomly select a gif from the results
function selectGif(gifs) {
  const index = Math.floor(Math.random() * gifs.length);
  return gifs[index].images.fixed_height;
}

$('#remove-btn').on('click', (event) => {
  event.preventDefault();
  gifContainer.empty();
});

$('#gif-container').on('click', 'img', function() {
  $(this).toggleClass('selected');
});

$('#remove-selected-btn').on('click', (event) => {
  event.preventDefault();
  $('img').each(function() {
    if ($(this).hasClass('selected')) {
      $(this).remove();
    }
  });
});