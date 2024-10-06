const cl=console.log;

const stdForm=document.getElementById("stdForm");
const fnameControl=document.getElementById("fname");
const lnameControl=document.getElementById("lname");
const emailControl=document.getElementById("email");
const contactControl=document.getElementById("contact");
const stdContainer=document.getElementById("stdContainer");
const info=document.getElementById("info");
const card=document.getElementById("card");

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let stdArr=JSON.parse(localStorage.getItem("stdArr")) || [];

const onMsgData=()=>{
    if(stdArr.length===0){
        info.classList.remove("d-none");
        card.classList.add("d-none");
    }else{
        info.classList.add("d-none");
        card.classList.remove("d-none");
    }
}

onMsgData();

const tempStd=(arr)=>{
    let result=arr.map((obj,i)=>{
        return`
                <tr id="${obj.stdId}">
                    <td>${i+1}</td>
                    <td>${obj.fname}</td>
                    <td>${obj.lname}</td>
                    <td>${obj.email}</td>
                    <td>${obj.contact}</td>
                </tr>
        
        
        `
    }).join("");

    stdContainer.innerHTML=result;
}

if(stdArr.length > 0){
    tempStd(stdArr);
}


const newStd=(obj)=>{
    let tr=document.createElement("tr");
    tr.id=obj.stdId;
    tr.innerHTML=`
                    <td>${stdArr.length}</td>
                    <td>${obj.fname}</td>
                    <td>${obj.lname}</td>
                    <td>${obj.email}</td>
                    <td>${obj.contact}</td>
    
    
    `

    stdContainer.append(tr);
}

const onStdForm=(ele)=>{
    ele.preventDefault();

    let stdObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:parseInt(contactControl.value),
        stdId:uuid(),
    }

    stdArr.push(stdObj);

    cl(stdArr);
    
    newStd(stdObj);

    localStorage.setItem("stdArr", JSON.stringify(stdArr));

    onMsgData();

    ele.target.reset();
}






stdForm.addEventListener("submit", onStdForm);