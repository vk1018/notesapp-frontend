

//base url
var BASE_URL = "http://localhost:5500";
// var BASE_URL = "http://localhost:5500/";

const submitLoginForm = async (e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    const errorTxt = document.getElementById('loginErrorTxt');

    
    if ((username && username !== '') && (password && password !== '')){
      errorTxt.style.display = 'none';
      errorTxt.textContent = 'Login Failed'



        let url="http://localhost:3000/login";

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
          if(response.ok){
            const userData = data.data;
            console.log(userData);
            localStorage.setItem('noteUnqUser',JSON.stringify(userData));
            window.location.replace(`${BASE_URL}`);
          }else{
            errorTxt.style.display = 'block';
            errorTxt.textContent = data.data.message;

            console.log("user login unsuccessfull")
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