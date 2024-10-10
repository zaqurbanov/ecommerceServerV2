

const generateResult = require('../helpers/resultGenerator')
const orderService = require('../Services/orderService')

const createNewOrder = async(req, res) => {
    
    const order = req.body
    
    const userId = req.user.id


    
    const result = await orderService.createOrder(order,userId)
   
    generateResult(res,result)
 
}

const changeOrderStatus =async (req,res)=>{
    
    const {id} = req.params
    const {status} = req.body 
   
    const result  = await orderService.changeOrderStatus(id,status)
    generateResult(res,result) 
}

 const getAllOrder = async (req,res)=>{
  
    const {status} = req.query
    
    const {search} = req.query
    const query={}
    if(status){
        query.status = status
    }
if(search){
    query.search = search
}

const result  = await orderService.getAllOrder(query)
generateResult(res,result)
}
const getOrderById = async (req,res)=>{
        const {id}  =req.params 

        const result = await orderService.getOrderById(id)
        generateResult(res,result)

}
module.exports = {
    createNewOrder,
    changeOrderStatus,
    getAllOrder,
    getOrderById
}  