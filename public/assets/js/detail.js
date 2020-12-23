
// 获取主页传过来地址栏id
var detailId = getParams('detailId')

// 通过文章id获取文章信息
showDetailPost(detailId)
function showDetailPost(id){
	$.ajax({
	type:'get',
	url:'/posts/'+id,
	success:res=>{
		// console.log(res)
		var html = template('articleTpl',res)
		$('#article').html(html)
		$('#state').val(res.state)
		$('#author').val(res.author._id)
		$('#post').val(res._id)
	}
})
}

//获取当前文章评论列表
showComment(detailId)
function showComment(id){
	$.ajax({
	type:'get',
	url:'/comments/'+id,
	success:response=>{
		// console.log(response)
		var html = template('nowCommentTpl',{data:response})
		$('#nowComments').html(html)
	},
	error:err=>{
		console.log(err)
	}
})
}


// 获取网站配置 判断是否允许评论
$.ajax({
	  	type:'get',
	  	url:'/settings',
	  	success:response=>{
	  	// console.log(response)
	  	var commentTrue = response.comment
	  	var reviewTrue = response.review
		
		if(!commentTrue){
			$('#commentForm').hide()
		}
	  }
	 })	
	
// 提交评论
$('#commentForm').on('submit',function(){
	var formData = $(this).serialize()
	// console.log(formData)
	
	$.ajax({
		type:'post',
		url:'/comments',
		data:formData,
		success:res=>{
			showComment(detailId)
			showLastedComment()
			
		},
		error:err=>{
			// console.log(err.responseText)
			if(JSON.parse(err.responseText).message == '请登录'){
				alert('请先登录再评论')
			}else {
				alert('文章评论内容至少4个字符')
			}
		}
	})
	return false
})



//获取id删除评论
$('#nowComments').on('click','#deleteComment',function(){
	var id1 = $(this).attr('data-id')
	
	$.ajax({
		type:'delete',
		url:'/comments/'+id1,
		success:res=>{
			showComment(detailId)
			showLastedComment()
		},
		error:err=>{
			alert('评论删除失败')
		}
	})
})

// 点赞
$('#article').on('click','.like',function(){
	var id = $(this).attr('data-id')
	$.ajax({
			type:'post',
			url:'/posts/fabulous/'+id,
			success:response=>{
				showDetailPost(id)
			}
		})	
})


// 点击随机推荐文章 局部刷新文章详情
$('#random').on('click','#randomPost',function(){
	var id = $(this).attr('data-id')
	// console.log(id)
	detailId = id
	showDetailPost(id)
	showComment(id)
})

// 点击热门推荐文章 局部刷新文章详情
$('#recommend').on('click','#recommendPost',function(){
	var id = $(this).attr('data-id')
	console.log(id)
	detailId = id
	showDetailPost(id)
	showComment(id)
})