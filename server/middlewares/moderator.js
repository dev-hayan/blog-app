module.exports = function (req, res, next) {
    if (!req.user.isModerator) return res.status(403).send("Access Denied.Access Denied.Not enough permissions");
    next();
};
