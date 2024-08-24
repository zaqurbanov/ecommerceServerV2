

class Response {

    constructor(){

    }
 

    static success = (message,data=null,code=200)=>{

        return {
            success:true,
            message,
            size:data.length,
            data,
            code
        }
    }   

    static error = (message,error=null,code=404)=>{
        return{
            success:false,
            message,
            error,
            code
        }
    }

}

module.exports = Response