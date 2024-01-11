document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("registration-form");
  const output = document.getElementById("output");

  document.getElementById("submit-btn").addEventListener("click", async function (event) {
    event.preventDefault()
      const fullName = document.getElementById("fullName").value;
      const phone = document.getElementById("phone").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      const data = {
        fullName : fullName,
        mobileNumber : phone,
        password : password,
        confirmPassword : confirmPassword
      }
      console.log(data);

      try {
          const res = await fetch(
              'http://localhost:3000/users/registration',
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

          else{
            window.location.replace('../html/login.html')
          }


      } catch (err) {
          console.log(err.message);
      }
  });


  });