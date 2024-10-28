
const pswdBtn= document.querySelector("#pswdBtn"); 
pswdBtn.addEventListener("click", function() {
    const pswdInput = document.getElementById("pword"); 
    const type = pswdInput.getAttribute("type"); 
    if (type == "password") {
        pswdInput.setAttribute("type", "text"); 
        pswdBtn.innerHTML = "Hide Password";
    } else {
        pswdInput.setAttribute("type", "password"); 
        pswdBtn.innerHTML="Show Password";
    }
});



const displayBtn= document.querySelector("#displayBtn"); 
pswdBtn.addEventListener("click", function() {
    const pswdInput = document.getElementById("displaypword"); 
    const type = pswdInput.getAttribute("type"); 
    if (type == "password") {
        pswdInput.setAttribute("type", "text"); 
        pswdBtn.innerHTML = "Hide Password";
    } else {
        pswdInput.setAttribute("type", "password"); 
        displayBtn.innerHTML="Show Password";
    }
});