const db = require("../models/index")
const Reports = db.userReport

const hasReport = async (userId, typeId, type) => {
    const result = await Reports.findAll({ where: { userId: userId, typeId: typeId, type: type } })
    if (result.length === 0) return false
    else return true
}

const addReport = async (report) => await Reports.create(report)

module.exports = { hasReport, addReport }