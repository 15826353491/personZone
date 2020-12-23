// 用户模块
const { Comment } = require('../../../model/Comment');
// 分页
const pagination  = require('mongoose-sex-page');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {

	let id = req.params['id'];

	const posts = await Comment.find({post:id}).populate('author', '-password').populate('post', '-content -meta')
	// 响应
	res.send(posts);
}