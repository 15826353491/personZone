const { User, validateLogin } = require('../../../model/User');
const _ = require('lodash');

module.exports = async (req, res) => {

	let user = await User.findOne({email: req.query.email});
	if(user)
        	res.send(_.pick(user, ['nickName', 'email', 'role', 'avatar', '_id', 'status', 'createTime']));
	else 
		res.status(400).send({message: '未找到该用户'});
};