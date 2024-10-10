const bcrypt = require('bcrypt')
const HTTP_CODE = require("../config/HTTP_CODE");
const messages = require("../config/Messages");
const jwt = require('jsonwebtoken')
const Response = require("../config/Response");
const getCatchError = require("../helpers/catchErrorGenerator");
const UserModel = require("../Models/UserModel");
const UserRoleModel = require("../Models/UserRoleModel");
const { JWT_SECRET_KEY } = require('../config/environment');
const generateToken = require('../config/generateToken');
const cloudinary = require('cloudinary').v2

// Bu kod sonradan role servisine kocurulecek
const createRoleModel = async () => {
    const userRole = await UserRoleModel.findOne({ role: 'user' })
    if (!userRole) {
        await UserRoleModel.create({ role: 'user' })
    }

}

const registerUser = async (name, username, password, email, next) => {

    const validationPattern = /^[A-Za-z][A-Za-z0-9]*$/; // stringle baslamali,bosluq olmamali, 
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/ // an azi bir eded boyukherf olmalidir. minimum 8simvol olmalidir
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    try {
        if (!validationPattern.test(name)) {
            return Response.error("Name Must be start String  and can not use empty value", null, HTTP_CODE.client_error.bad_request)
        }
        if (!validationPattern.test(username) || !username) {
            return Response.error("Username Must be string and can not use empty value", null, HTTP_CODE.client_error.bad_request)
        }

        if (!passwordPattern.test(password)) {
            return Response.error('Password must be minimum 8 simvol an includes least one uppercase string ', null, HTTP_CODE.client_error.bad_request)
        }

        if (!emailPattern.test(email)) {
            return Response.error('invalid Email Value ', null, HTTP_CODE.client_error.bad_request)
        }
        const isExistsForUserName = await UserModel.findOne({ username: username })
        const isExistsForEmail = await UserModel.findOne({ email: email })
        if (isExistsForUserName) {
            return Response.error("UserName already exists", null, HTTP_CODE.client_error.bad_request)
        }
        if (isExistsForEmail) {
            return Response.error("Email already exists", null, HTTP_CODE.client_error.bad_request)
        }
        await createRoleModel()

        const hashPassword = await bcrypt.hash(password, 10)

        const result = await UserModel.create({ name, username, password: hashPassword, email })
        if (!result) {
            return Response.error("User created Failed", null, HTTP_CODE.client_error.bad_request)
        }

        return Response.success("User created Successfully", { username, name }, HTTP_CODE.success.ok)


    } catch (error) {
        return getCatchError(error.message)

    }



}

const loginUser = async (username, password, res) => {
    try {
        const user = await UserModel.findOne({ username: username }).populate('role')
        if (!user) {
            return Response.error("User Not found", null, HTTP_CODE.client_error.bad_request)
        }
        const compareHash = await bcrypt.compare(password, user.password)
        if (!compareHash) {
            return Response.error("Please input Correct Password", null, HTTP_CODE.client_error.bad_request)
        }

        const token = generateToken(user)
        // res.cookie('token',token,{
        //     httpOnly:true,
        //     secure: false, 
        //     // process.env.NODE_ENV === 'production',
        //     maxAge: 3600000,
        //     sameSite: 'lax', // CSRF hücumlarından qorunmaq üçün
        //    })


        return Response.success('login success true', token, HTTP_CODE.success.ok)

    } catch (error) {

        return getCatchError(error.message)
    }
}

const verifyUser = async (user) => {
    try {
        const isAdmin = user.role.role == "admin" ? true : false
        if (!isAdmin)
            throw new Error("User is not admin");

        return Response.success("user is admin", isAdmin, HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)
    }
}
// const logoutUser =async ()=>{
//     try {
//             res.clearCookie('token')
//             return Response.success("Logout successfull",null,HTTP_CODE.success.ok)
//     } catch (error) {
//         return getCatchError(error.message)
//     }
// }

const updateUser = async (user, name, username, email, image) => {


    try {
        const getUser = await UserModel.findById(user.id).populate('role')

        if (!getUser)
            return Response.error("User Not Found", null, HTTP_CODE.client_error.forbidden)





        const updatedName = name ? name : getUser.name
        const updatedUsername = username ? username : getUser.username
        const updatedEmail = email ? email : getUser.email
        const updatedData = {
            name: updatedName,
            email: updatedEmail,
            username: updatedUsername,
        }
        if (image && !getUser.image_public_id) {
            const uploadImage = await cloudinary.uploader.upload(image.image.tempFilePath, {
                folder: 'ecommerce'
            })

            if (uploadImage) {
                const result = await UserModel.findByIdAndUpdate(user.id, {
                    ...updatedData,
                    image_public_id: uploadImage.public_id,
                    image: uploadImage.secure_url
                }, { new: true })
                return Response.success(messages.updated.success, result, HTTP_CODE.success.ok)
            }
            return Response.error(messages.updated.error, null, HTTP_CODE.client_error.bad_request)

        }
        if (!image) {
            const result = await UserModel.findByIdAndUpdate(user.id, {
                ...updatedData,
            }, { new: true })
            return Response.success(messages.updated.success, result, HTTP_CODE.success.ok)
        }
        if (image && getUser.image_public_id) {
            const deleteImg = await cloudinary.uploader.destroy(getUser.image_public_id)

            if (deleteImg.result !=="ok")
                return Response.error("Failed to delete previous image", null, HTTP_CODE.client_error.bad_request);
                

                await UserModel.findByIdAndUpdate(user.id, {
                    image: null,
                    image_public_id: null
                }, { new: true })
            

                if(image){

                    const uploadImage = await cloudinary.uploader.upload(image.image.tempFilePath, { folder: "ecommerce" })
                    if (!uploadImage) {
                        return Response.error("Failed to upload image", null, HTTP_CODE.client_error.bad_request);
                    }
                    updatedData.image_public_id = uploadImage.public_id;
            updatedData.image = uploadImage.secure_url;
                

                }
    const result = await UserModel.findByIdAndUpdate(user.id, {
                    ...updatedData,
                        
                    }, { new: true })
           
            return Response.success(messages.updated.success, result, HTTP_CODE.success.ok)





        }


    } catch (error) {
        console.log(error);

        return getCatchError(error.message)
    }




}


const getDeleteUserImage = async (user) => {
    try {
        const getUser = await UserModel.findById(user.id)
        if (!getUser)
            return Response.error("User Not Found", null, HTTP_CODE.client_error.forbidden)

        if (getUser.image_public_id == "") {
            return Response.error("Image not found", null, HTTP_CODE.client_error.forbidden)
        }

        await cloudinary.uploader.destroy(getUser.image_public_id)
        await UserModel.findByIdAndUpdate(user.id, {
            image: "",
            image_public_id: ""
        }, { new: true })

        return Response.success(messages.delete.success, null, HTTP_CODE.success.ok)

    } catch (error) {
        console.log(error);
        return getCatchError(error.message)
    }
}
const getUserById = async (user) => {
    try {


        const getUser = await UserModel.findById(user.id).populate('role')

        if (!getUser)
            return Response.error("User Not Found", null, HTTP_CODE.client_error.forbidden)

        return Response.success(messages.get.success, getUser, HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)
    }
}

const getAllUsers = async () => {
    try {
        const result = await UserModel.find().populate('role')
        return Response.success(messages.get.success, result, HTTP_CODE.success.ok)
    } catch (error) {
        return getCatchError(error.message)
    }
}
module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    verifyUser,
    updateUser,
    getUserById,
    getDeleteUserImage
} 