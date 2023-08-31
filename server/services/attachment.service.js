const db = require("../models/index")
const Attachments = db.attachment

const addAttachment = async (url, id, type) => Attachments.create({
    url,
    attachmenTableId: id,
    attachmenTableType: type
})

const addMultiAttachments = (attachments) => Attachments.bulkCreate(attachments)


const deleteAttachments = (id, type) => Attachments.destroy({
    where: {
        attachmenTableId: id,
        attachmenTableType: type
    }
})

const getAttachments = (id, type) => Attachments.findAll({
    where: {
        attachmenTableId: id,
        attachmenTableType: type
    }
})
module.exports = { addAttachment, addMultiAttachments, deleteAttachments, getAttachments }