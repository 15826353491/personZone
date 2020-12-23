
// 添加用户
$('#userform').on('submit',function(){
	// 获取表单信息 拼接字符串形式 xxx=xx&xx=xx
	var formData = $(this).serialize()
	// 提交表单信息到服务器
	$.ajax({
		type:'post',
		url:'/users',
		data:formData,
		success:response => {
			// console.log(response)
			// 用户添加成功刷新页面
			location.reload()
		},
		error: err=>{
			alert('用户添加失败')
		}
	})
	// 阻止表单的默认提交行为
	return false
})

// 上传文件
$('#formBox').on('change','#avatar',function(){
	// 获取选择到的文件
	// this.file[0]
	var formData = new FormData()
	formData.append('avatar',this.files[0])
	
	console.log(this.files[0])
	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		// 阻止$.ajax方法对数据的进行解析
		processData:false,
		// 阻止$.ajax方法添加发送内容
		contentType:false,
		success:response=>{
			console.log(response)
			$('#preview').attr('src',response[0].avatar)
			$('#hiddenAvatar').val(response[0].avatar)
		}
	})
})

// 获取用户信息
$.ajax({
	type:'get',
	url:'/users',
	success:response=>{
		// console.log(response)
		// 向模板引擎传递数据，拼接html
		var html = template('userTpl',{data:response})
		$('#userBox').html(html)
	}
})

// 修改用户信息 --获取用户信息
$('#userBox').on('click','.edit',function(){
	// 获取用户id
	var id = $(this).attr('data-id')
	
	$.ajax({
		type:'get',
		url:'/users/'+id,
		success:response=>{
			// console.log(response)
			var html = template('modifyTpl',response)
			$('#formBox').html(html)
		}
	})
})

// 修改用户信息 --上传用户信息
$('#formBox').on('submit','#modifyForm',function(){
	// 获取用户id
	var id = $(this).attr('data-id')
	// 获取 修改后的表单数据
	var formData = $(this).serialize()
	
	$.ajax({
		type:'put',
		url:'/users/'+id,
		data:formData,
		success:()=>{
			// 修改成功 刷新页面
			location.reload()
		}
	})
})



// 删除用户信息 --获取用户信息
$('#userBox').on('click','.delete',function(){

	// 获取删除用户信息的id
	var id = $(this).attr('data-id')
	if(confirm('是否确认删除?')){
	$.ajax({
		type:'delete',
		url:'/users/'+id,
		success:response=>{
			// console.log(response)
			location.reload()
		}
	})
	}
	
})


//全选按钮  
$('#check_all').on('change',function(){
		$('#userBox #check_one').prop('checked',$(this).prop('checked'))
		
		if($(this).prop('checked') == true){
			// 显示批量删除按钮
			$('#deleteMany').show()
		}else{
			// 隐藏批量删除按钮
			$('#deleteMany').hide()
		}
	})
// 单个按钮
$('#userBox').on('change','input',function(){
	if( $('#userBox #check_one:checked').length == $('#userBox #check_one').length){
		$('#check_all').prop('checked',true)
	}else{
		$('#check_all').prop('checked',false)
	}
	
	if ($('#userBox #check_one').filter(':checked').length>0) {
		$('#deleteMany').show()
	}else{
		$('#deleteMany').hide()
	}
})

// 批量删除
$('#deleteMany').on('click',function(){
	var ids=[]
	// 获取选中的用户信息
	var users = $('#check_one:checked')
	// 遍历选中的复选框 获取id存入数组中
	users.each(function(index,element){
		ids.push($(element).attr('data-id'))
	})
	if(confirm('是否确认批量删除?')){
	$.ajax({
		type:'delete',
		url:'/users/'+ids.join('-'),
		success:response=>{
			location.reload()
		}
	})
	}
})


