import db from "../models";
import bcrypt from 'bcryptjs'
var salt = bcrypt.genSaltSync(10);
let loginUserService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //init dataUser
            let dataUser = {}
            // check email exist
            let checkUser = await checkIsExistUser(email)

            if (checkUser) {
                let user = await db.User.findOne({
                    where: {
                        email: email
                    },
                    attributes: ['email', 'roleid', 'password', 'firstName', 'lastName']
                })

                if (user) {
                    let checkPass = bcrypt.compareSync(password, user.password);
                    if (checkPass) {
                        dataUser.errorCode = 0
                        dataUser.errorMessage = "ok"
                        delete user.password
                        dataUser.user = user
                    } else {
                        dataUser.errorCode = 3
                        dataUser.errorMessage = "wrong password"
                    }
                } else {
                    dataUser.errorCode = 2
                    dataUser.errorMessage = "user not found"
                }

            } else {
                dataUser.errorCode = 1
                dataUser.errorMessage = `Your's email isn't in our system. pls check your's email`
            }

            resolve(dataUser)
        } catch (error) {
            reject(error)
        }
    })
}

let checkIsExistUser = (emailUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: emailUser,

                },

            })
            console.log("check user", user);
            user ? resolve(true) : resolve(false)
        } catch (error) {
            reject(error)
        }
    })
}


// get user from db to service

let getUserService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = {}
            if (idUser === 'ALL') {

                let user = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
                dataUser.errorCode = 0
                dataUser.errorMessage = "ok"
                dataUser.user = user
            }
            if (idUser && idUser !== 'ALL') {
                let user = await db.User.findOne({
                    where: { id: idUser },
                    attributes: {
                        exclude: ['password']
                    }
                })
                dataUser.errorCode = 0
                dataUser.errorMessage = "ok"
                dataUser.user = user
            }

            resolve(dataUser)
        } catch (error) {
            reject(error)
        }
    })
}
//service create user

let createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await checkIsExistUser(data.email)
            if (!checkUser) {
                let edPassWord = await hashPassWord(data.password)
                await db.User.create({
                    email: data.email,
                    password: edPassWord,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleid: data.roleid,
                    positionId: data.positionid,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    message: "create success"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "user existed"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}


let hashPassWord = (passWord) => {
    return new Promise(async (resolve, reject) => {
        try {
            var passWordHashed = await bcrypt.hashSync(passWord, salt);
            resolve(passWordHashed)
        } catch (error) {
            reject(error)
        }
    })
}
// service update user for id
let updateUserService = (dataUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: dataUser.id }
            })
            if (user) {
                await db.User.update({
                    firstName: dataUser.firstName,
                    lastName: dataUser.lastName,
                    address: dataUser.address,
                    phonenumber: dataUser.phonenumber,
                    gender: dataUser.gender,
                    roleid: dataUser.roleid,
                    positionId: dataUser.positionid,
                    image: dataUser.image
                }, {
                    where: { id: dataUser.id }
                })
                resolve({
                    errCode: 0,
                    message: " update success"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: " user not found"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

// service delete user for id
let deleteUserService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: idUser } })
            if (user) {
                await db.User.destroy({ where: { id: idUser } })
                resolve({
                    errCode: 0,
                    message: "delete success"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "user not found"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}



// get all code
let getAllCodeService = (inputType) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            if (!inputType) {
                res.errorCode = 1,
                    res.errorMessage = 'Missing prameter input type'
            } else {
                let allCode = await db.Allcode.findAll({
                    where: {
                        type: inputType
                    }
                })

                res.errorCode = 0
                res.errorMessage = "ok"
                res.data = allCode

            }
            resolve(res)

        } catch (error) {
            reject(error)
        }
    })
}
export default {
    loginUserService,
    getUserService,
    deleteUserService,
    createUserService,
    updateUserService,
    getAllCodeService
}