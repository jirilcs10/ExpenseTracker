


const form=document.getElementById("addForm");
let itli=document.getElementById("items");
let ldit=document.getElementById("lditems");
const lddiv=document.getElementById('leaderboard');
const dhdiv=document.getElementById('download');
const pagediv=document.getElementById('pagediv');

lddiv.style.display='none';
dhdiv.style.display='none';
form.addEventListener("submit",submitForm);
function storeRows(e){
    const rows=document.getElementById("noitems").value;
    localStorage.setItem("rows",rows);
    location.reload();
}

function parseJwt(token) {
        if (!token) {
          return;
        }
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
      
}
function checkPremium(){
    const token=localStorage.getItem('token');
    const user=parseJwt(token);
    if(user.isPremiumUser)
    {
       const div=document.getElementById('premiumdiv');
       const button=document.getElementById('rzp-premium');
       const ldbutton=document.createElement("button");
       ldbutton.id="leader";
       ldbutton.appendChild(document.createTextNode("Show LeaderBoard"));
       button.parentNode.removeChild(button);
       const span=document.createElement('span');
       span.appendChild(document.createTextNode("Premium User"));
       span.style.float="right";
       span.appendChild(ldbutton);
       div.appendChild(span);
       ldbutton.onclick=async function(e){
        const res=await axios.get('http://localhost:3000/user/leaderboard',{headers:{"Authorization":token}});
        ldit.replaceChildren(" ");
        for(var i=0;i<res.data.allExpense.length;i++)
        {
        console.log(res.data.allExpense[i]);
        showLeaderBoard(res.data.allExpense[i]);
        }
        lddiv.style.display="block";
       }
    }
}
function generateReport(){
    const token=localStorage.getItem('token');
    const user=parseJwt(token);
    if(user.isPremiumUser)
    {
        const div=document.getElementById("reportbuttondiv");
        const rpbutton=document.createElement("button");
        rpbutton.appendChild(document.createTextNode("Generate Report"));
        const dhbutton=document.createElement("button");
        dhbutton.appendChild(document.createTextNode("Download History"));
        const span=document.createElement('span');
        span.appendChild(rpbutton);
       span.appendChild(dhbutton);
       span.style.float="right";
        div.appendChild(span);
    
      
       rpbutton.onclick=async function(e){
        const resp=await axios.get('http://localhost:3000/user/report',{headers:{"Authorization":token}});
       console.log(resp);
       const a = document.createElement("a");
            a.href = resp.data.fileURL;
            a.download = 'expense.csv';
            a.click();
    }  
    dhbutton.onclick=async function(e){
        dhdiv.replaceChildren('');
        dhdiv.style.display="block";
        const resp=await axios.get('http://localhost:3000/user/reporthistory',{headers:{"Authorization":token}});
        dhdiv.appendChild(document.createTextNode("Download History"));
        for(let i=0;i<resp.data.history.length;i++)
        {
          console.log(resp.data.history[i]);
          const fileURL=resp.data.history[i].downloadURL;
          let fname=fileURL.split('/');
          fname=fname[fname.length-1];
          fname=fname.slice(0,24);
          const filename=fname.replaceAll("%", "").replaceAll('20','');
          console.log(filename);
          const date=resp.data.history[i].createdAt;
          const a = document.createElement("a");
            a.href = fileURL;
            a.download = 'expense.csv';
            a.appendChild(document.createTextNode("Expense"+resp.data.history[i].id+filename));
    const li=document.createElement("li");

    li.className="list-group-item";
    li.appendChild(document.createTextNode(date));
    li.appendChild(a);
    


    dhdiv.appendChild(li);
 }

}
}
    
}
function showLeaderBoard(appdata){
    const li=document.createElement("li");

    li.className="list-group-item";
    li.appendChild(document.createTextNode("Name: "));
    li.appendChild(document.createTextNode(appdata.name));
    li.appendChild(document.createTextNode(" Total Expense: "));
    li.appendChild(document.createTextNode(appdata.totalexpense));
    


    ldit.appendChild(li);
}
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
        const token=localStorage.getItem('token'); 
        console.log(token);
    await axios.post(`http://localhost:3000/user/addexpense`,obj,{headers:{"Authorization":token}}); 
    
    location.reload();
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
        const token=localStorage.getItem('token');
        checkPremium();
        generateReport();
        const page=1;
        const rows =localStorage.getItem('rows');
        console.log(rows);
        if(rows){
        document.getElementById('noitems').value=rows;}
    let res=await axios.get(`http://localhost:3000/user?page=${page}&rows=${rows}`,{headers:{"Authorization":token}});
        console.log(res);
        itli.replaceChildren('');
        for(let i=0;i<res.data.allExpense.length;i++)
        showOnScreen(res.data.allExpense[i]);


        showPage(res.data.pageData);
    }
    catch(err){
        document.body.innerHTML=document.body.innerHTML+"<h3 align='center'>something went wrong</h3>"
        console.log(err);
    }
});
async function getExpense(page){
    const token=localStorage.getItem('token');
    itli.replaceChildren('');
    const rows =localStorage.getItem('rows');
    
   const res=await axios.get(`http://localhost:3000/user?page=${page}&rows=${rows}`,{headers:{"Authorization":token}});
   for(var i=0;i<res.data.allExpense.length;i++)
        showOnScreen(res.data.allExpense[i]);

   showPage(res.data.pageData);

}

function showPage(pageData){
    pagediv.replaceChildren('');
    if(pageData.hasPrevPage){
        const btn=document.createElement("button");
        btn.innerHTML=pageData.prevPage;
        btn.style.width='5%';
        btn.style.alignSelf="center";
        btn.addEventListener('click',()=>getExpense(pageData.prevPage));
        pagediv.appendChild(btn);
    }
    const btn=document.createElement("button");
        btn.innerHTML=pageData.currPage;
        btn.style.width='5%';
        btn.style.alignSelf="center";
        btn.addEventListener('click',()=>getExpense(pageData.currPage));
        pagediv.appendChild(btn);
    if(pageData.hasNextPage){
            const btn=document.createElement("button");
            btn.innerHTML=pageData.nextPage;
            btn.style.width='5%';
            btn.style.alignSelf="center";
            btn.addEventListener('click',()=>getExpense(pageData.nextPage));
            pagediv.appendChild(btn);
        } 
        if(pageData.lastPage>pageData.nextPage){
        const last=document.createElement("button");
        last.innerHTML=">>";
        last.style.width='5%';
        last.style.alignSelf="center";
        last.addEventListener('click',()=>getExpense(pageData.lastPage));
        pagediv.appendChild(last);  
        }
}

itli.addEventListener("click", removeItem);
async function removeItem(e){
    e.preventDefault();
    const token=localStorage.getItem('token'); 
    form.classList.remove('was-validated')
    if(e.target.classList.contains('del'))
    {
           
            const li=e.target.parentElement;
            const id=li.childNodes[6].textContent;
            console.log(id);
            try{
            await axios.get(`http://localhost:3000/user/deleteexpense/${id}`,{headers:{"Authorization":token}});
            itli.removeChild(li); 
            }
            catch(err)
            {
                document.body.innerHTML=document.body.innerHTML+"<h3 align='center'>something went wrong</h3>"
                console.log(err); 
            }
            
           

    }
   
}

document.getElementById('rzp-premium').onclick=async function(e){
    try{
    const token=localStorage.getItem('token');
    const res=await axios.get('http://localhost:3000/purchase/buypremium',{headers:{"Authorization":token}});
    console.log(res.data);
    let resp;
    var options={
        'key':res.data.key_id,
        'order_id':res.data.order.id,
        'handler':async function(response){
           resp = await axios.post('http://localhost:3000/purchase/updatetransactionstatus?success=true',{
                orderId:options.order_id,
                paymentId:response.razorpay_payment_id
            },{headers:{"Authorization":token}})
            localStorage.setItem('token',resp.data.token)
            checkPremium();
            alert("You are upgraded to premium");
        }
    }
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed',async function(res){
        console.log(res);
        await axios.post('http://localhost:3000/purchase/updatetransactionstatus?success=false',{
            orderId:options.order_id
        },{headers:{"Authorization":token}})
        alert('Something went wrong');
    })
}
catch(err)
{
    console.log(444);
    console.log(err);
}
}
