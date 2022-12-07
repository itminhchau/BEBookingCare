import userApiService from '../services/userApiService'

let handleLoginUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    // check parameter input
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: "Missing input parameter"
        })
    }
    // get services
    let dataUser = await userApiService.loginUserService(email, password)

    return res.status(200).json({
        errCode: dataUser.errorCode,
        message: dataUser.errorMessage,
        user: dataUser ? dataUser.user : {}
    })
}


// get user
let handleGetUser = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "missing input parameter",
            user: []
        })
    }

    let dataUser = await userApiService.getUserService(id)
    return res.status(200).json({
        errCode: dataUser.errorCode,
        message: dataUser.errorMessage,
        user: dataUser ? dataUser.user : {}
    })
}
// create new user
let handleCreateUser = async (req, res) => {
    let dataUser = req.body
    if (!dataUser.email || !dataUser.password) {
        return res.status(200).json({
            errCode: 1,
            message: "required to enter email and password"
        })
    }
    let message = await userApiService.createUserService(dataUser)
    return res.status(200).json(message)
}
// update user
let handleUpdateUser = async (req, res) => {
    let dataUser = req.body
    if (!dataUser.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameter!"
        })
    }
    let message = await userApiService.updateUserService(dataUser)
    return res.status(200).json(message)
}


// delete user for id
let handleDeleteUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameter!"
        })
    }
    let message = await userApiService.deleteUserService(id)
    return res.status(200).json(message)
}

//get all code

let handleGetAllCode = async (req, res) => {
    try {

        let dataAllCode = await userApiService.getAllCodeService(req.query.type)

        return res.status(200).json({
            errCode: dataAllCode.errorCode,
            message: dataAllCode.errorMessage,
            data: dataAllCode ? dataAllCode.data : {}
        })
    } catch (e) {
        console.log("get all code error", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}
export default {
    handleLoginUser,
    handleGetUser,
    handleDeleteUser,
    handleCreateUser,
    handleUpdateUser,
    handleGetAllCode
}