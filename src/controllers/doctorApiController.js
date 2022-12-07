import doctorApiService from "../services/doctorApiService";
const handleGetTopDoctor = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10
    try {
        let data = await doctorApiService.getTopDoctorService(+limit)
        return res.status(200).json(data)
    } catch (error) {
        console.log("error form sever", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error form sever"
        })
    }
}

let handleGetAllDoctor = async (req, res) => {
    try {
        let data = await doctorApiService.getAllDoctorService()
        return res.status(200).json(data)
    } catch (e) {
        console.log("error from server", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "err form server ..."
        })
    }
}

let handleCreateDoctor = async (req, res) => {
    try {
        let data = await doctorApiService.createDoctorService(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log("error from server", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error form server"
        })
    }
}

let handleGetDetailDoctor = async (req, res) => {
    try {
        let data = await doctorApiService.getDetailDoctorService(req.query.id)
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

let handleGetMarkdown = async (req, res) => {
    try {
        let data = await doctorApiService.getMarkdownService(req.query.id)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}
let handleCreateDoctorSchedule = async (req, res) => {
    try {
        let data = await doctorApiService.createDoctorScheduleService(req.body)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}
export default {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateDoctor,
    handleGetDetailDoctor,
    handleGetMarkdown,
    handleCreateDoctorSchedule
}