import db from "../models";
import userService from "../services/userService"

let getHomePage = async (req, res) => {

    try {
        let users = await db.User.findAll()

        return res.render('listUser.ejs', { dataUsers: users })
    } catch (error) {
        console.log(">>>> unable connect db:", error);
    }
}

let getSignUpPage = async (req, res) => {

    return res.render("signUp.ejs")
}

let createUser = async (req, res) => {
    let messager = await userService.createUserService(req.body)
    console.log("message: ", messager);
    return res.redirect('/user')
}

let getAllUser = async (req, res) => {
    let dataUsers = await userService.getAllUserService()
    return res.render("getAllUser.ejs", { dataUsers: dataUsers })
}

let getEditUser = async (req, res) => {
    let idUser = req.query.id
    let dataUser = await userService.getUserService(idUser)
    return res.render("editUser.ejs", { dataUser: dataUser })
}
let editUser = async (req, res) => {
    let dataUser = req.body
    await userService.getEditUserService(dataUser)
    return res.redirect('/user')
}

let deleteUser = async (req, res) => {
    let idUser = req.body.id
    await userService.deleteUserService(idUser)
    return res.redirect('/user')
}

export default {
    getHomePage,
    getSignUpPage,
    createUser,
    getAllUser,
    getEditUser,
    editUser,
    deleteUser
}