const form = document.querySelector('.signup');
const username = document.querySelector('.signup__username');
const email = document.querySelector('.signup__email');
const phoneno = document.querySelector('.signup__phoneno');
const password = document.querySelector('.signup__password');
const confirmPassword = document.querySelector('.signup__confirm-password');
// const btn = document.querySelector('.signup__btn');

var strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
  };
  var password1 = document.querySelector('.signup__password');
  var meter = document.getElementById('password-strength-meter');
  var text = document.getElementById('password-strength-text');
  
  password.addEventListener('input', function() {
    var val = password1.value;
    var result = zxcvbn(val);
  
    // Update the password strength meter
    meter.value = result.score;
  
    // Update the text indicator
    if (val !== "") {
      text.innerHTML = "Strength: " + strength[result.score]; 
    } else {
      text.innerHTML = "";
    }
  });

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateForm();
    clearForm();

});

function validateForm() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phonenoValue = phoneno.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if(usernameValue === '') {
        showError(username, 'Username cannot be blank');
    } else {
        showSuccess(username);
    }

    if(emailValue === '') {
        showError(email, 'Email cannot be blank');
        
    } else if(!validEmail(emailValue)) {
        showError(email, 'Email format invalid');
    } else {
        showSuccess(email);
    }

    if(!validPhoneNo(phonenoValue)) {
        showError(phoneno, 'Length of phone number should be 10 and should consist of only numbers');
    } else {
        showSuccess(phoneno);
    }


    if(passwordValue === '') {
        showError(password, 'Password cannot be blank');

    } else if(!validPassword(passwordValue)) {
        showError(password, 'Password is not Valid');
        
    } else {
        showSuccess(password);
    }

    if(confirmPasswordValue === '') {
        showError(confirmPassword, 'Password cannot be blank');
    } else if(passwordValue !== confirmPasswordValue) {
        showError(confirmPassword, 'Password does not match');

    } else {
        if(!validPassword(passwordValue)) {
            showError(password, 'Password is not Valid');
            
        }
        else {
            showSuccess(confirmPassword);
        }
    }

}

function clearForm() {
    username.value = '';
    email.value = '';
    phoneno.value = '';
    password.value = '';
    confirmPassword.value = '';

}

function showError(element, message) {
    const formControl = element.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;
    
    formControl.className = "form-control error";
    
    
}

function showSuccess(element) {
    const formControl = element.parentElement;
    
    formControl.className = "form-control success";
}

function validEmail(mail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());

}

function validPassword(pass) {
    const re = /(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
    return re.test(pass);
}

function validPhoneNo(number) {
    const re = /^\d{10}$/;
    return re.test(number);
}
