import db from "../models"
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);

let createUserService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let edPassWord = await hashPassWord(data.passWord)
            await db.User.create({
                email: data.email,
                password: edPassWord,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleid: data.roleid,
            })
            resolve("exc success create user")
        } catch (error) {
            reject(error)
        }
    })
}

let hashPassWord = (passWord) => {
    return new Promise(async (resolve, reject) => {
        try {
            var passWordHashed = await bcrypt.hashSync(`${passWord}`, salt);
            resolve(passWordHashed)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = await db.User.findAll({
                raw: true
            })
            resolve(dataUser)
        } catch (error) {
            reject(error)
        }
    })
}

let getUserService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUser = await db.User.findOne({ where: { id: idUser }, raw: true })
            resolve(dataUser)
        } catch (error) {
            reject(error)
        }
    })

}

let getEditUserService = (dataUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUserUpdated = await db.User.update({
                firstName: dataUser.firstName,
                lastName: dataUser.lastName,
                address: dataUser.address
            }, { where: { id: dataUser.id } })
            console.log("check data update", dataUserUpdated);
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUserService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({ where: { id: idUser } })
            resolve()
        } catch (error) {
            reject(error)
        }

    })

}

export default {
    createUserService,
    getAllUserService,
    getUserService,
    getEditUserService,
    deleteUserService
}