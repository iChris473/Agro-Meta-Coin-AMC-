document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
  }, false);

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

const navContainer = document.querySelector('.nav');
const toggleClick = document.getElementById("check");
const hamContainer = document.querySelector(".hamburger--container")
let check = false;

const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#reg");
const airDrop = document.querySelector("#airdropBtn");
const loginBtn_D = document.querySelector("#login-d");
const signupBtn_D = document.querySelector("#reg-d");

if(user){
    loginBtn.innerHTML = "wallet"
    loginBtn_D.innerHTML = "wallet"
    signupBtn.style.display = 'none'
    signupBtn_D.style.display = 'none'
} 


function toggle(){
    if(!check){
        navContainer.classList.add('open')
        hamContainer.style.position = "fixed"
        check = true
    }
    else{
        navContainer.classList.remove('open')
        hamContainer.style.position = "relative"
        check = false
    }
}
toggleClick.addEventListener("click", toggle)

function redirect(e){
    const {id} = e.target;
    if(id === "login"){
        window.location.href = "/login"
    }
    else if(id === "signup"){
        window.location.href = "/register"
    }
    
    else{
        window.location.href = "/dashboard"
    }
}

loginBtn.addEventListener("click", redirect)
signupBtn.addEventListener("click", redirect)

loginBtn_D.addEventListener("click", redirect)
signupBtn_D.addEventListener("click", redirect)

airDrop.addEventListener("click", redirect)


// Copy function

const copyBtn = document.getElementById("copy-btn");
function copyAddress(){
    const address = document.getElementById("address");

    address.select();
    address.setSelectionRange(0, 999999);
    
    navigator.clipboard.writeText(address.value);
    alert("Copied!")
}
copyBtn.addEventListener("click", copyAddress);