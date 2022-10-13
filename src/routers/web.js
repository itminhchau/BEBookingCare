import express from 'express'
import homeController from '../controllers/homeController.js'

let router = express.Router()
const initWebRouter = (app) => {
    // Get to home page
    router.get('/', homeController.getHomePage)
    // get to signUp page
    router.get('/signup', homeController.getSignUpPage)
    // create User
    router.post('/create/user', homeController.createUser)
    // get all user
    router.get('/user', homeController.getAllUser)

    //get edit user
    router.get('/get/edit/user', homeController.getEditUser)
    // edit user
    router.post('/edit/user', homeController.editUser)
    // delete user
    router.post('/get/delete/user', homeController.deleteUser)
    app.use('/', router)
}

export default initWebRouter