
const resetForm=document.getElementById("resetForm");

resetForm.addEventListener("submit",resetPassword);

var url = window.location.href.split("/");
console.log(url);
async function resetPassword(e)
{  if(resetForm.checkValidity())
    {
    e.preventDefault();
    resetForm.classList.add('was-validated');
    const obj={
        password:null,
        uuid:null,
    }
    obj.uuid=url[url.length-1];
    obj.password=document.getElementById('password').value;
    console.log(obj);
    try
    {
       const resp =await axios.post(`http://localhost:3000/password/updatepassword`,obj);

       console.log(resp);
       alert("Password changed successfully");
      window.location.replace("http://localhost:3000/login.html");
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
