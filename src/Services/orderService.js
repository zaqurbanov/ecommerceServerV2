const HTTP_CODE = require("../config/HTTP_CODE");
const messages = require("../config/Messages");
const Response = require("../config/Response");
const getCatchError = require("../helpers/catchErrorGenerator");
const OrderModel = require("../Models/OrderModel");
const ProductModel = require("../Models/ProductModel");




const createOrder = async(order,userId) =>{

    let totalPrice = 0
    const products = []
        try {

            if(order.length <1){
                throw new Error("Order least one product");
                
            }
                for (const product of order) {
                        // Orderdeki  her bir productu tapiriq  
                    const isProduct = await ProductModel.findById(product.productId)
                        if(!isProduct){
                            throw new Error("Product Not Found");
                            
                        }


                        const orderProduct = {
                            productId:product.productId,
                            quantity:product.quantity,
                            price:isProduct.price
                        }
                        
                        totalPrice += isProduct.price*product.quantity
                        
 
                        products.push(orderProduct)
                }
                    
              const createOrder = await OrderModel.create({
                user:userId,
                products:products,
                totalPrice:totalPrice,

              })
              
              if(!createOrder){
                throw new Error("Product craeted Failed");
                
              }

              return Response.success("Order Now Pending Status",createOrder,200)
 

        } catch (error) {
            
           return  getCatchError(error.message)
        }
}
const changeOrderStatus = async(orderId,orderStatus)=>{

    try {
            const order =  await OrderModel.findById(orderId)
                
            if(!order)
                return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)
            
      
            const allowedStatuses = ['pending', 'completed', 'cancelled', 'archived'];
            if (!allowedStatuses.includes(orderStatus)) {
                return Response.error("Invalid status", null, HTTP_CODE.client_error.bad_request);
            }

            // if (order.status === 'completed' || order.status === 'cancelled') {
            //     return Response.error("You cannot change status of a completed or cancelled order", null, HTTP_CODE.client_error.bad_request);
            // }
            if(orderStatus =='completed'  && !order.stockUpdated){
                for (const orderProduct of order.products){
                    const product = await ProductModel.findById(orderProduct.productId)

                    if(!product){
                        return Response.error(`Product with ID ${orderProduct.productId} not found`, null, HTTP_CODE.client_error.not_found);
                    }
                    if(product.stock<orderProduct.quantity)
                        return Response.error(`Insufficient stock for product ${product.name}`, null, HTTP_CODE.client_error.bad_request);
                    product.stock -=orderProduct.quantity 
                    await product.save()
                }
            } else if(order.status ==='completed' && orderStatus !== 'completed' && order.stockUpdated){
                for (const orderProduct of order.products) {
                    const product = await ProductModel.findById(orderProduct.productId);
            
                    if (product) {
                      product.stock += orderProduct.quantity;
                      await product.save();
                    }
                  }
            
                  order.stockUpdated = false;
            }


            order.status = orderStatus;

            if (orderStatus === 'archived') {
                order.archivedAt = new Date();
            } 

          await order.save()

            return Response.success(messages.updated.success,order,HTTP_CODE.success.created)

    } catch (error) {
        return getCatchError(error.message)
    }

}

const getAllOrder = async(query)=>{
try {
    const result = await OrderModel.find(query).populate('user').populate({
        path:'products.productId',
        populate:[
            {path:'brand'},
            {path:'type'},
            {path:"category"},
            {path:'sizes'}
        ]
    })
    return Response.success(messages.get.success,result,HTTP_CODE.success.ok)
} catch (error) {
        return getCatchError(error.message)    
}
}
const getOrderById = async(id)=>{

    try {
        const result  = await OrderModel.findById(id)
        if(!result)
            return Response.error(messages.get.error,null,HTTP_CODE.client_error.not_found)

        return Response.success(messages.get.success,result,HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)
    }

}
module.exports={
    createOrder,
    changeOrderStatus,
    getAllOrder,
    getOrderById
}

