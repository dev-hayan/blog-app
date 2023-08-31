exports.isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send("Access Denied.Not enough permissions");
    next();
};

exports.isModerator = (req, res, next) => {
    if (!req.user.isModerator) return res.status(403).send("Access Denied.Access Denied.Not enough permissions");
    next();
};
