

function createCourseValidation( course_name,img,duration,price,mode) {
 
    if(!course_name.trim() || !img.trim() || !duration.trim() || !price.trim() || !mode.trim() ){
        return "required all the fields"
    }
    if(course_name.trim().length>30){
        return "Course name should be less than 30 characters !"
    }
    if (duration.trim().length>2) {
        return "Duration should be less than 99 months !"
    }
    if(price.trim().length>6){
        return "Your course length is more Expensive"
    }
    if(mode.trim().length==0){
        return " Please select the mode "
    }
    return 
}

export default createCourseValidation