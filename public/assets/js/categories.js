
// 添加文章分类
$('#categoryForm').on('submit',function(){
	// 获取要提交的表单数据
	var formData = $(this).serialize()
	
	$.ajax({
		type:'post',
		url:'/categories',
		data:formData,
		success:response=>{
			// 分类添加成功 刷新页面
			location.reload()
		},
		error:err=>{
			alert('文章添加失败')
		}
	})
	
	return false
})

// 显示文章分类

$.ajax({
	type:'get',
	url:'/categories',
	success:response=>{
		var html = template('categoryTpl',{data:response})
		$('#categoryBox').html(html)
	}
})


// 修改文章分类 -- 获取文章分类信息
$('#categoryBox').on('click','.edit',function(){
	var id = $(this).attr('data-id')
	
	// 获取文章分类信息
	$.ajax({
		type:'get',
		url:'/categories/'+id,
		success:response=>{
			// console.log(response)
			var html = template('modifyTpl',response)
			$('#formBox').html(html)
		}
	})
})

// 修改文章分类 -- 提交修改文章分类信息
$('#formBox').on('change','#modifyForm',function(){
	
	var id = $(this).attr('data-id')
	var formData = $(this).serialize()
	
	
	$.ajax({
		type:'put',
		url:'/categories/'+id,
		data:formData,
		success:response=>{
			location.reload()
		}
	})

})

// 删除文章分类
$('#categoryBox').on('click','.delete',function(){
	var id = $(this).attr('data-id')
	
	if(confirm('是否确认删除?')){
	$.ajax({
		type:'delete',
		url:'/categories/'+id,
		success:response=>{
			location.reload()
		}
	})
	}
})


// 全选按钮
$('#check_all').on('change',function(){
	$('#categoryBox #check_one').prop('checked',$(this).prop('checked'))
	
	if($(this).prop('checked') == true){
		// 显示批量删除按钮
		$('#deleteMany').show()
	}else{
		// 隐藏批量删除按钮
		$('#deleteMany').hide()
	}
})

// 单个按钮
$('#categoryBox').on('change','#check_one',function(){
	if( $('#categoryBox #check_one:checked').length == $('#categoryBox #check_one').length){
		$('#check_all').prop('checked',true)
	}else{
		$('#check_all').prop('checked',false)
	}
	
	if ($('#categoryBox #check_one').filter(':checked').length>0) {
		$('#deleteMany').show()
	}else{
		$('#deleteMany').hide()
	}
})


// 批量删除
$('#deleteMany').on('click',function(){
	var ids=[]
	// 获取选中的用户信息
	var categories = $('#check_one:checked')
	// 遍历选中的复选框 获取id存入数组中
	categories.each(function(index,element){
		ids.push($(element).attr('data-id'))
	})
		console.log(categories)
	if(confirm('是否确认批量删除?')){
	$.ajax({
		type:'delete',
		url:'/categories/'+ids.join('-'),
		success:response=>{
			location.reload()
		}
	})
	}
})