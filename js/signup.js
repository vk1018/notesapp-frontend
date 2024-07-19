const submitSignupForm = async (e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    if ((username && username !== '') && (password && password !== '')){

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

          console.log(data);

    }

}

