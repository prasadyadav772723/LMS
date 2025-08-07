

 function userUpdateValidation(name,email,ph_no,university_name) {
     const regexName = /^[A-Za-z ]{2,30}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     if(!name.trim() || !email.trim() || !ph_no.trim() || !university_name.trim() ){
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
    if(university_name.trim().length >30){
        return "university name shouldn't be more then 30 characters"
    }
  
}

export default userUpdateValidation
   

   
    
    
    
