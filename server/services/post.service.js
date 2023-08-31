const { Op } = require("sequelize")
const db = require("../models/index")
const Posts = db.post

const createPosts = async (post) => Posts.create(post)


const getAllPosts = async () => Posts.findAll({
    order: [['createdAt', 'DESC']], // Order by createdAt column in descending order
    include: [{
        model: db.user,
        attributes: [['lastName', 'userName']],
    },]
})

const getPendingPost = async () => Posts.findAll({
    where: {
        isApproved: false
    },
    include: [{
        model: db.user,
        attributes: [['lastName', 'userName']],
    },]
})

const getApprovedPost = async () => Posts.findAll({
    where: {
        isApproved: true
    }, include: [{
        model: db.user,
        attributes: [['lastName', 'userName']],
    },]
})

const findPostById = async (id) => Posts.findByPk(id)

const getReportedPosts = async () => Posts.findAll({
    where: {
        reports: { [Op.gt]: 0 }
    }, include: [{
        model: db.user,
        attributes: [['lastName', 'userName']],
    },]
})



module.exports = { getAllPosts, createPosts, findPostById, getReportedPosts, getPendingPost, getApprovedPost }