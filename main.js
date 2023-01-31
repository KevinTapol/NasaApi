document.querySelector('button').addEventListener('click', getFetch)
require('dotenv').config()

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

function getFetch(){
  const choice = document.querySelector('input').value
  // user input of drop down calender does not come back in string format ex for 12/17/2022 date=2022-12-17
  // if I wanted to change the way the user inputs like a form tag then I would reassemble the inputs into the choice format of YYYY-MM-DD Month = December Day = 17 Year = 2022 then create an object key value pair of months with input month.toLowerCase() key with the value of number respresentation ex user types in December i add .toLowerCase() to that field {'december':12}and reassemble the user input year-month-day and set it equal to choice
  console.log(choice)
  
  
  //const key = process.env.API_KEY
  const API_KEY = 'cQefIAyvLIcimT6OaQlIu5MenjqoJsCzFPfJA8AS'

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${choice}`
 

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

