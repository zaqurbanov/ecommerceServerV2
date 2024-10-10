 

class Response {

    constructor(){

    }
 

    static success = (message, data=null,code=200,totalPage=null,page=null)=>{

        return {
            success:true,
            message,
            size:data ? data.length : "",
            data,
            totalPage:totalPage || 1,
            page: page ||1,
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