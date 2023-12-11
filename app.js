const gifContainer = $('#gif-container');
const apiKey = 'JagTn8EityndMAlasyg4qImjLwt7UlrU';

$('#submit-btn').on('click', async (event) => {
  event.preventDefault();

  const formInput = $('#input-value').val();
  if (!formInput.trim()) {
    return;
  }
  
  const randomGif = await getGif(formInput);
  const gif = $(`<img loading="lazy" src=${randomGif}>`)
  gif.appendTo(gifContainer);
});

/**
 * @param {string} query user input argument for request 
 * @returns response from giphy api with data parameter selected
 */
async function getGif(query) {
  try {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', { params: { api_key: apiKey, q: query } });
    const results = res.data.data;
    return selectGif(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @param {Array} gifs from giphy API
 * @returns Randomly chosen gif from Array
 */
function selectGif(gifs) {
  const index = Math.floor(Math.random() * gifs.length);
  return gifs[index].images.fixed_height.url;
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
  $('img.selected').remove();
});