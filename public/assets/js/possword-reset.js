// 提交表单重置密码

$('#resetForm').on('submit',function(){
	// 获取提交的表单数据
	var formData = $(this).serialize()
	
	console.log(formData)
	// 请求接口修改密码
	$.ajax({
		type:'put',
		url:'/users/password',
		data:formData,
		success:response=>{
			location.href = 'login.html'
		},
		error:err=>{
			alert('密码修改失败')
		}
	})
	// 阻止表单的默认提交行为
	return false
})