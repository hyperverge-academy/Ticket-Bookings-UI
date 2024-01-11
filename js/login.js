document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("login-form");
    const output = document.getElementById("output");
  
    document.getElementById("submit-btn").addEventListener("click", async function (event) {
      event.preventDefault()
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
  
        const data = {
          mobileNumber : phone,
          password : password,
        }
        console.log(data);
  
        try {
            const res = await fetch(
                'http://localhost:3000/users/login',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
            
                },
              }
              );
  
            const resData = await res.json();
            console.log(resData);
  
            const responseStatusCode = document.getElementById("response-statuscode").innerHTML = resData.message.message;
            if ( resData.message.errorCode!== 200) {
            document.getElementById('response-statuscode').style.color = 'red';
            } 
            console.log(responseStatusCode)
            return responseStatusCode

  
        } catch (err) {
            console.log(err.message);
        }
    });
  
  });