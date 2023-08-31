const nodemailer = require('nodemailer');
const smtpConfig = require('../config/transport.config');
class TransporterSingleton {
    constructor() {
        this.transporter = nodemailer.createTransport(smtpConfig);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new TransporterSingleton();
        }
        return this.instance;
    }
}

module.exports = TransporterSingleton.getInstance().transporter;