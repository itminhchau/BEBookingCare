import express from 'express'
import userApiController from '../controllers/userApiController'
import doctorApiController from '../controllers/doctorApiController'
let router = express.Router()

const initAPIRouter = (app) => {
    // api login user
    router.post('/api/v1/login', userApiController.handleLoginUser)

    // get user
    router.get('/api/v1/user', userApiController.handleGetUser)

    //create new user
    router.post('/api/v1/create/user', userApiController.handleCreateUser)

    // update user
    router.put('/api/v1/update/user', userApiController.handleUpdateUser)

    // delete User
    router.delete('/api/v1/delete/user', userApiController.handleDeleteUser)

    //get all code 
    router.get('/api/v1/allcode', userApiController.handleGetAllCode)

    //get top doctor
    router.get('/api/v1/top/doctor', doctorApiController.handleGetTopDoctor)
    //get all doctor
    router.get('/api/v1/all/doctor', doctorApiController.handleGetAllDoctor)
    // create doctor infor
    router.post('/api/v1/create/doctor', doctorApiController.handleCreateDoctor)

    // get detail doctor 
    router.get('/api/v1/detail/doctor', doctorApiController.handleGetDetailDoctor)

    //get markdown doctor
    router.get('/api/v1/get/markdown', doctorApiController.handleGetMarkdown)

    // create shedule of dotor
    router.post('/api/v1/create/schedule/doctor', doctorApiController.handleCreateDoctorSchedule)

    app.use('/', router)
}

export default initAPIRouter