
// 获取文章分类列表

$.ajax({
	type:'get',
	url:'/categories',
	success: response=>{
		var html = template('categoryTpl',{data:response})
		$('#category').html(html)
	}
})

// 上传文章封面
$('#formBox').on('change','#feature',function(){
	// 获取选择的图片
	var file = this.files[0]
	var formData = new FormData()
	
	formData.append('cover',file)
	
	// 请求接口 上传图片
	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		// 阻止$.ajax()方法解析上传的formData对象
		processData:false,
		// 阻止$.ajax()方法设置内容的类型
		contentType:false,
		success:response=>{
			$('#preview').prop('src',response[0].cover)
			// 将上传成功的地址返回给隐藏域文本框
			$('#thumbnail').val(response[0].cover)
		}
	})
})

	
// 添加文章信息
$('#articleForm').on('submit',function(){
	var formData = $(this).serialize()
	
	console.log(formData)
	
	$.ajax({
		type:'post',
		url:'/posts',
		data:formData,
		success: response => {
			location.reload()
		},
		error:err=>{
			alert('创建文章失败')
		}
	})
	return false
})


// 获取地址中的id参数
var id= getParams('id')

// 如果id存在获取文章信息
if(id!=-1){
	$.ajax({
		type:'get',
		url:'/posts/'+id,
		success:response=>{
			// console.log(response)
			$.ajax({
				type:'get',
				url:'/categories',
				success:res=>{
					response.categories = res
					var html = template('postsTpl',response)
					$('#formBox').html(html)
				}
			})
		}
	})
}


// 解析地址中的参数
function getParams(name){
	var paramArray = location.search.substr(1).split('&')
	for(let i =0 ;i<paramArray.length;i++){
		var tep =paramArray[i].split('=')
		if(tep[0] == name){
			return tep[1] 
		}
	}
	return -1
}


// 提交修改文章信息表单

$('#formBox').on('submit','#modifyForm',function(e){
	// 获取修改的文章id
	var id = $(this).attr('data-id')
	// 获取表单数据
	var formData = $(this).serialize()
	
	$.ajax({
		type:'put',
		url:'/posts/'+id,
		data:formData,
		success:response=>{
			location.href = 'posts.html'
		},
		error:err=>{
			alert('文章修改失败')
		}
	})
	e.preventDefault()
})