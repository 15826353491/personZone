// �û�ģ��
const { Comment } = require('../../../model/Comment');
// ��ҳ
const pagination  = require('mongoose-sex-page');
// ����
const _ = require('lodash');

module.exports = async (req, res) => {

	let id = req.params['id'];

	const posts = await Comment.find({post:id}).populate('author', '-password').populate('post', '-content -meta')
	// ��Ӧ
	res.send(posts);
}