const multer = require("multer")

class MulterSingleton {
    constructor() {
        this.uploader = multer({
            storage: multer.diskStorage({}),
            limits: { fileSize: 500000 },
        });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new MulterSingleton();
        }
        return this.instance;
    }
}

module.exports = MulterSingleton.getInstance().uploader;
