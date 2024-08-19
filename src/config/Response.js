

class Response {

    constructor(){

    }


    static success = (message,data=null,code=200)=>{

        return {
            success:true,
            message,
            data,
            code
        }
    }   

    static error = (message,error=null,code=404)=>{
        return{
            succces:false,
            message,
            error,
            code
        }
    }

}

module.exports = Response