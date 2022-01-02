let users = [];

const passwordToggleBtn = document.querySelectorAll(".passwd-toggle")
const registerPassword = document.querySelector("#registerPassword")
const loginPassword = document.querySelector("#loginPassword")

function togglePasswordType(e, type){
    e.preventDefault();
    if (e.target.innerText === "Show Password") {           
        e.target.innerText = "Hide Password";  
        if(type === 'register') registerPassword.type = "text";
        else if(type === 'login') loginPassword.type = "text";

    } else {
        e.target.innerText = "Show Password";
        if (type === "register") registerPassword.type = "password";
        else if (type === "login") loginPassword.type = "password";
    }
}

function register(e){

    e.preventDefault()

    const newUser = {
        fullName: registerForm.elements['name'].value,
        email: registerForm.elements['registerEmail'].value,
        password: registerForm.elements['registerPassword'].value,
        phone: registerForm.elements['phone'].value,
    }

    let isValidPassword = false, isValidPhone = false;

    if(newUser.password.length >= 5) isValidPassword = true;
    if(newUser.phone.length === 10 && !isNaN(parseInt(newUser.phone))) isValidPhone = true;

    if(!(isValidPassword && isValidPhone)){
        let additionaMsg = createHTMLDom(`<div>Please Check</br>Password length is greater than equal to 5</br>Phone length is 10 and is a number</div>`)
        console.log(additionaMsg)
        showPopup('register', additionaMsg, 5000)
        cleanupForm("register");
        return;
    }

    users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
        users = [];
    }

    let doesExist = false;
    users.forEach(user => {
        if(user.email === newUser.email || user.phone === newUser.phone){
            doesExist = true;
            cleanupForm("register");
            return;
        }
    })
    if(doesExist){
        showPopup("register", "You are already registered. Please login!!!", 3000);
        return;
    }
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users))
    
    toggleForm()
    cleanupForm('register')
}

function login(e) {

    e.preventDefault();

    const loginUserInfo = {
        email: loginForm.elements["loginEmail"].value,
        password: loginForm.elements["loginPassword"].value
    };

    const users = JSON.parse(localStorage.getItem("users"));

    let doesExist = false, isDataValid = false, userName;
    users.forEach((user) => {
        if (user.email === loginUserInfo.email || user.password === loginUserInfo.password) {
            doesExist = true;
            if (
                user.email === loginUserInfo.email &&
                user.password === loginUserInfo.password
            ){
                isDataValid = true;
                userName = user.fullName;
                return;
            }
        }
    });
    if (!doesExist) {
        showPopup("login", "Account doesn't exist. Please register first!!!", 3000);
        return;
    }
    if(!isDataValid){
        showPopup("login", "Invalid Credentials!!!", 3000);
        return;
    }
    location.href = `videosList.html?user=${userName}&loggedIn=true`;
    cleanupForm('login')
}

function showPopup(type, additionaMsg, timeout){
    if(type === 'register'){
        let regMsg = document.getElementById("regMsg");

        regMsg.append(additionaMsg)
        regMsg.classList.toggle("d-none");
        
        setTimeout(() => {
            const regMsg = document.getElementById("regMsg")
            regMsg.innerHTML = ""
            regMsg.classList.toggle("d-none");
        }, timeout)
    }
    else if(type === 'login'){
        let loginMsg = document.getElementById("loginMsg");

        loginMsg.innerText = additionaMsg;
        loginMsg.classList.toggle("d-none");
        
        setTimeout(() => {
            let loginMsg = document.getElementById("loginMsg");
            loginMsg.innerHTML = ""
            loginMsg.classList.toggle("d-none");
        }, timeout);
    }
}


function createHTMLDom(elem){
    const temp = document.createElement('template')
    temp.innerHTML = elem;
    return temp.content.firstChild;
}

function toggleForm(){
    cleanupForm('register')
    cleanupForm('login')
    document.querySelector("#registerFormContainer").classList.toggle('d-none')
    document.querySelector("#loginFormContainer").classList.toggle('d-none')
}

function cleanupForm(type){
    if(type === 'register'){
        for(let i=0; i<registerForm.length-1; i++){
            registerForm[i].value = ""
        }
    }
    else if(type === 'login'){
        for (let i = 0; i < loginForm.length; i++) {
            loginForm[i].value = "";
        }
    }
}