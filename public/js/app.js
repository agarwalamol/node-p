const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')



const search = document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''             //to remove second paragraph after new search

    //fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        fetch('/weather?address='+location).then((response)=>{  //removed localhost for deploying on heroku
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent =data.error
            messageTwo.textContent =''

        }

        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})
})