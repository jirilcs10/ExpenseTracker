
const loginForm=document.getElementById("loginForm");

loginForm.addEventListener("submit",login);

async function login(e)
{  if(loginForm.checkValidity())
    {
    e.preventDefault();
    loginForm.classList.add('was-validated');
    const obj={
        email:null,
        password:null
    }
    obj.email=document.getElementById('email').value;
    obj.password=document.getElementById('password').value;
    try
    {
       const resp =await axios.post(`http://localhost:3000/user/login`,obj);

       console.log(resp);
       alert(resp.data);
    }
    catch(err){
          const error=JSON.stringify(err.message);
          
          if(error.includes(404))
          alert("User not Found");
          else if(error.includes(401))
          alert("Not Authorized, check you password and email");
          else
          {
            alert(error);
          }
    }
    
    document.getElementById('email').value="";
    document.getElementById('password').value="";
    loginForm.classList.remove('was-validated');
   }
   else
   {
    e.preventDefault();
   }
}

