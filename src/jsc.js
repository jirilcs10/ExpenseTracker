const form=document.getElementById("signupForm");
form.addEventListener("submit",submitForm);

const obj={
    name:"abc",
    email:"abc",
    password:"abc"
}
async function submitForm(e)
{  if(form.checkValidity())
    {
    e.preventDefault();
    form.classList.add('was-validated');
    obj.name=document.getElementById('name').value;
    obj.email=document.getElementById('email').value;
    obj.password=document.getElementById('password').value;
    try
    {
       const resp =await axios.post(`http://localhost:3000/user/signup`,obj);
       console.log(resp);
    }
    catch(err){
        
        console.log(err);
    }
    
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('password').value="";
    form.classList.remove('was-validated');
   }
}

