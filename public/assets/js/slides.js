

	proviewShow()

// 显示轮播图列表
$.ajax({
	type:'get',
	url:'/slides',
	success:res=>{
		var html = template('slideTpl',{data:res})
		$('#slides').html(html)
	}
})


// 上传轮播图片
$('#file').on('change',function(){
	// 获取选中大图片
	var file = this.files[0]
	// 创建表单对象
	var formData = new FormData()
	formData.append('image',file)
	
	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		processData:false,
		contentType:false,
		success:res=>{
			$('#proview').prop('src',res[0].image)
			proviewShow()
			$('#hiddenImage').val(res[0].image)
		}
	})
})

// 提交表单信息
$('#slideForm').on('submit',function(e){
	
	var formData = $(this).serialize()
	
	$.ajax({
		type:'post',
		url:'/slides',
		data:formData,
		success:res=>{
			location.reload()
		}
	})
	e.preventDefault()
})

// 删除轮播图
$('#slides').on('click','.delete',function(){
	var id = $(this).attr('data-id')
	
	if(confirm('是否确认删除?')){
	$.ajax({
		type:'delete',
		url:'/slides/'+id,
		success:res=>{
			location.reload()
		}
	})
  }
})