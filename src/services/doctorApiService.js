import db from "../models";
import _ from "lodash";
const getTopDoctorService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleid: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                where: { roleid: "R2" },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            if (user && user.length > 0) {
                resolve({
                    errCode: 0,
                    data: user
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let createDoctorService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput.contentHTML || !dataInput.contentMarkDown || !dataInput.discription) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
                return;
            } else {
                let inforMarkdown = await db.Markdown.findOne({
                    where: { doctorId: dataInput.doctorId }
                })
                if (!inforMarkdown) {
                    await db.Markdown.create({
                        contentHTML: dataInput.contentHTML,
                        contentMarkDown: dataInput.contentMarkDown,
                        discription: dataInput.discription,
                        doctorId: dataInput.doctorId,
                        clinicId: dataInput.clinicId,
                        specialtyId: dataInput.specialtyId,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: "create success"
                    })
                } else {
                    await db.Markdown.update({
                        contentHTML: dataInput.contentHTML,
                        contentMarkDown: dataInput.contentMarkDown,
                        discription: dataInput.discription,
                        // clinicId: dataInput.clinicId,
                        // specialtyId: dataInput.specialtyId,
                    }, {
                        where: { doctorId: dataInput.doctorId }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: "update success"
                    })
                }
            }



        } catch (e) {
            reject(e)
        }
    })
}

let getDetailDoctorService = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter id"
                })
                return;
            }
            let user = await db.User.findOne({
                where: { id: idInput },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkDown', 'discription'] },
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            if (user && user.image) {
                user.image = new Buffer(user.image, 'base64').toString('binary')
            }
            resolve({
                errCode: 0,
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getMarkdownService = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter id"
                })
                return;
            }
            let markDown = await db.Markdown.findOne({
                where: { doctorId: idInput }
            })
            if (markDown) {
                resolve({
                    errCode: 0,
                    data: markDown
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "infor is'nt exist"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let createDoctorScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter"
                })
                return;
            } else {
                let schedule = data.arrSchedule
                // check existed of schedule
                let existed = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.date },
                    attributes: ['doctorId', 'date', 'timeType', 'maxNumber']
                })

                // covert dateFormat
                if (existed && existed.length > 0) {
                    existed = existed.map((item) => {
                        let dateFormat = new Date(item.date).getTime()
                        item.date = dateFormat
                        return item
                    })

                }
                // console.log("check existed", existed);
                // compare diferent data client > data table

                let differentSchedule = _.differenceWith(schedule, existed, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })
                // compare diferent data client < data table
                let differentScheduleB = _.differenceWith(existed, schedule, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                })
                // console.log("check differentA", differentSchedule);
                // console.log("check differentB", differentScheduleB);

                // check case data client > data table is create
                if (differentSchedule && differentSchedule.length > 0) {
                    await db.Schedule.bulkCreate(differentSchedule)
                }

                // check case data client < data table is delete row
                if (differentScheduleB && differentScheduleB.length > 0) {
                    let arrayTimeType = []
                    for (let i = 0; i < differentScheduleB.length; i++) {
                        arrayTimeType.push(differentScheduleB[i].timeType)
                    }
                    // console.log("check arrayTimeType", arrayTimeType);
                    await db.Schedule.destroy({
                        where: { timeType: arrayTimeType }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: "create succes"
                })
                // console.log("data from client", data);
            }

        } catch (error) {
            reject(error)
        }
    })
}
export default {
    getTopDoctorService,
    getAllDoctorService,
    createDoctorService,
    getDetailDoctorService,
    getMarkdownService,
    createDoctorScheduleService
}