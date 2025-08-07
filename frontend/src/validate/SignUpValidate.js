function signup_validate(name,email,ph_no,password,confirm_password){
    const regexName = /^[A-Za-z ]{2,30}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!name.trim() || !email.trim() || !ph_no.trim() || !password.trim() || !confirm_password.trim()){
        return "required all the fields"
    }
    if(!regexName.test(name)){
        return "Enter valid name"
    }
    if (!regexEmail.test(email)) {
        return "Invalid Email address"
    }
    if(ph_no.trim().length != 10){
        return "phone number should be 10 digits!"
    }
    if(password.trim().length < 7){
        return " password should be atleast 7 characters!"
    }
    if(password.trim() != confirm_password.trim()){
        return "match password with confirm password!"
    }
    return 
}

export default signup_validate