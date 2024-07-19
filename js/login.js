const submitLoginForm = async (e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    if ((username && username !== '') && (password && password !== '')){

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
          if(response.ok){
            console.log("Login sucessfull")
          }

          let data= await response.json(); 

          console.log(data);

    }

}

