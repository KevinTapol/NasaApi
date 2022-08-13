document.querySelector('button').addEventListener('click', getFetch)
//maybe add a function to refresh page to deal with toggle hidden issue or disable submit button at the end of the getFetch funcion and reenable when calender icon clicked
// require('dotenv').config()
// const api_keys = process.env.API_KEY

function getFetch(){
  const choice = document.querySelector('input').value
  
  console.log(choice)

  const url = `https://api.nasa.gov/planetary/apod?api_key=cQefIAyvLIcimT6OaQlIu5MenjqoJsCzFPfJA8AS&date=${choice}`

  // I used promises instead of async because at the time I didn't know async
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        
        // start with both image and iframe hidden then toggle hidden class for each outcome
        if( data.media_type === 'image' ){
          // show imgage
          document.querySelector('img').classList.remove('hidden')
          document.querySelector('img').src = data.hdurl
        }else if(data.media_type === 'video'){
          // show iframe
          document.querySelector('iframe').classList.remove('hidden')
          document.querySelector('iframe').src = data.url
        }
        // show explanation
        document.querySelector('h3').classList.remove('hidden')
        document.querySelector('h3').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

