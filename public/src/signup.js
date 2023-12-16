const signupForm=document.getElementById("signupForm");

signupForm.addEventListener("submit",signup);


async function signup(e)
{  if(signupForm.checkValidity())
    {
    e.preventDefault();
    const obj={
        name:"abc",
        email:"abc",
        password:"abc"
    }
    signupForm.classList.add('was-validated');
    obj.name=document.getElementById('name').value;
    obj.email=document.getElementById('email').value;
    obj.password=document.getElementById('password').value;
    let resp;
    try
    {
       resp =await axios.post(`http://localhost:3000/user/signup`,obj);
       console.log(resp);
    }
    catch(err){
        
          const message=document.createTextNode("Email must be unique");
          document.getElementById('err').appendChild(message);
    }
    
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('password').value="";
    signupForm.classList.remove('was-validated');
   }
}
