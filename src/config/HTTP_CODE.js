
const HTTP_CODE ={
    success:{
        ok:200,
        created:201,
        no_content:204,

    },
    client_error:{
        bad_request:400,
        forbidden:403,
        not_found:404,
        method_not_allowed:405,
        conflict:409,

    },
    server_error:{
        internal_server_error:500
    }

}

module.exports=HTTP_CODE