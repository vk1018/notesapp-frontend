

//base url
// var BASE_URL = "http://localhost:5500";
var BASE_URL = "https://vamsi-notes-app-1.netlify.app";


const submitSignupForm = async (e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    const errorTxt = document.getElementById('signUpErrorTxt');

    
    if ((username && username !== '') && (password && password !== '')){
      errorTxt.style.display = 'none'
      errorTxt.textContent = 'Sign Up Unsuccessfull'


        let url="http://localhost:3000/create";

        let userData={
            username,password
        }

        let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(userData)
          }; 

          let response= await fetch(url,options); 

          let data= await response.json(); 
          if (response.ok){
            const userData = data.data;
            console.log(userData);
            localStorage.setItem('noteUnqUser',JSON.stringify(userData));
            window.location.replace(`${BASE_URL}`);
           
          }else{
            errorTxt.style.display = 'block'
            errorTxt.textContent = data.data.message;
          }


    }

}

window.addEventListener("load",() => {
  const userKey = localStorage.getItem('noteUnqUser');
  console.log(userKey)
  if (userKey){
     // Simulate a mouse click:
      // window.location.href = "http://www.w3schools.com";

      // Simulate an HTTP redirect:
      window.location.replace(`${BASE_URL}`);
  }
})