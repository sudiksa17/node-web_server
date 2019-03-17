console.log("running.....")




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')


weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault()

   const location = search.value
msgOne.textContent = "Loading...."
   fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
     response.json().then((data)=>{
       if(data.error){
           msgTwo.textContent = data.error;
       }else{
         msgTwo.textContent = data.result;
     }
     })
   })

})
