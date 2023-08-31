const { getAttachments } = require("../services/attachment.service");
const { validateReadAttachments } = require("../utils/requestValidations");

exports.read = async (req, res) => {

    const { error } = validateReadAttachments(req.query)
    if (error) return res.status(400).send(error.details[0].message)

    const { id, type } = req.query
    const attachmnts = await getAttachments(id, type)

    if (!attachmnts) return res.status(400).send("Attachments not found")
    res.status(200).send(attachmnts);

}