const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 查询所有评论数量
	const commentCount = await Comment.countDocuments();
	// 响应
	res.send({commentCount});
}