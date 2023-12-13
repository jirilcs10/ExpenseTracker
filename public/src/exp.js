const form=document.getElementById("addForm");
let itli=document.getElementById("items");
form.addEventListener("submit",submitForm);


function showOnScreen(appdata){
    const li=document.createElement("li");
    const btn=document.createElement("button");
    const hid=document.createElement("P");
    hid.hidden=true;

    btn.className="btn btn-danger btn-sm float-right del";

    btn.appendChild(document.createTextNode("Delete"));
    hid.appendChild(document.createTextNode(appdata.id))

    li.className="list-group-item";
    
    li.appendChild(document.createTextNode(appdata.amount));
    li.appendChild(document.createTextNode("-"));
    li.appendChild(document.createTextNode(appdata.description));
    li.appendChild(document.createTextNode("-"));
    li.appendChild(document.createTextNode(appdata.category));
    li.appendChild(document.createTextNode(" "));

    li.appendChild(hid);
    li.appendChild(btn);

    itli.appendChild(li);
}

async function submitForm(e)
{  
    e.preventDefault();
   
    const obj={
        amount:5,
        description:"abc",
        category:"abc"
    }
    obj.amount=document.getElementById('exp').value;
    obj.description=document.getElementById('expdes').value;
    obj.category=document.getElementById('cat').value;
    let resp;
    try
    {
        
    resp =await axios.post(`http://localhost:3000/expense/add`,obj); 
    
    console.log(resp.data.newExpense);
    showOnScreen(resp.data.newExpense);
    }
    catch(err){
        
        document.body.innerHTML=document.body.innerHTML+"<h3 align='center'>something went wrong</h3>"
        console.log(err);
    }
    
    document.getElementById('exp').value="";
    document.getElementById('expdes').value="";
    document.getElementById('cat').value="";
   
}

window.addEventListener("DOMContentLoaded",async()=>{
    try{
    let res=await axios.get('http://localhost:3000/expense');
        console.log(res);
        for(var i=0;i<res.data.newExpense.length;i++)
        showOnScreen(res.data.newExpense[i]);
    }
    catch(err){
        document.body.innerHTML=document.body.innerHTML+"<h3 align='center'>something went wrong</h3>"
        console.log(err);
    }
});

itli.addEventListener("click", removeItem);
async function removeItem(e){
    e.preventDefault();

    form.classList.remove('was-validated')
    if(e.target.classList.contains('del'))
    {
           
            const li=e.target.parentElement;
            const id=li.childNodes[6].textContent;
            console.log(id);
            try{
            await axios.get(`http://localhost:3000/expense/delete/${id}`);
            itli.removeChild(li); 
            }
            catch(err)
            {
                document.body.innerHTML=document.body.innerHTML+"<h3 align='center'>something went wrong</h3>"
                console.log(err); 
            }
            
           

    }
   
}

