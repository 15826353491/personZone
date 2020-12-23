

// 上传网站logo
$('#file').on('change',function(){
	
	var file = this.files[0]
	var formData = new FormData()
	
	formData.append('logo',file)
	
	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		processData:false,
		contentType:false,
		success:res=>{
			$('#preview').prop('src',res[0].logo)
			$('#logo').val(res[0].logo)
		}
	})
})


// 提交表单
$('#settingForm').on('submit',function(){
	
	var formData = $(this).serialize()
	
	$.ajax({
		type:'post',
		url:'/settings',
		data:formData,
		success:res=>{
			location.reload()
		},
		error:err=>{
			alert('网站配置设置失败')
		}
	})
})

// 获取网站配置信息
$.ajax({
	type:'get',
	url:'/settings',
	success:res=>{
		$('#preview').prop('src',res.logo)
		$('#logo').val(res.logo)
		$('input[name=title]').val(res.title)
		$('input[name=comment]').attr('checked',res.comment)
		$('input[name=review]').attr('checked',res.review)
	}
})