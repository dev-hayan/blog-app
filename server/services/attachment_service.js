const db = require("../models/index");
const Attachments = db.attachments;

async function addAttachment(url, id, type) {
    const attachment = await Attachments.create({
        url,
        attachmenTableId: id,
        attachmenTableType: type
    });

    return attachment;
}


async function addMultiAttachments(attachments) {
    return await Attachments.bulkCreate(attachments);
}

async function deleteAttachments(id, type) {
    return await Attachments.destroy({
        where: {
            attachmenTableId: id,
            attachmenTableType: type
        }
    })
}
module.exports = { addAttachment, addMultiAttachments, deleteAttachments }