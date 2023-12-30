
const passForm=document.getElementById("passForm");

passForm.addEventListener("submit",forgotPassword);

async function forgotPassword(e)
{  if(passForm.checkValidity())
    {
    e.preventDefault();
    passForm.classList.add('was-validated');
    const obj={
        email:null
    }
    obj.email=document.getElementById('email').value;
    try
    {
       const resp =await axios.post(`/password/forgotpassword`,obj);

       console.log(resp);
       alert("Reset Password Link send to your mail address");
      window.location.replace("/login");
    }
    catch(err){
         console.log(err);

    }
   }
   else
   {
    e.preventDefault();
   }
}

