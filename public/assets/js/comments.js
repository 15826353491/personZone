
// 获取评论信息列表
$.ajax({
	type:'get',
	url:'/comments',
	success:response=>{
		
		var html = template('commentTpl',{data:response})
		$('#comments').html(html)
		
		var pagehtml = template('pageTpl',response)
		$('#pageBox').html(pagehtml)
	}
})

// 页码

// for(var i=0;i<16;i++){
// $.ajax({
// 	type:'post',
// 	url:'/comments',
// 	data:{
// 		    "state": 0,
// 		    "author": "5fc5ea179aaded07142e2d79",
// 		    "content": "文章很精彩"+i,
// 		    "post": "5fc74c37b67d78143c5309a1",
// 		    "createAt": new Date()
// 	}
// })
// }

	// 分页
	function  changePage(page){
		$.ajax({
			type:'get',
			url:'/comments',
			data:{page},
			success:response=>{
				var html = template('commentTpl',{data:response})
				$('#comments').html(html)
				
				var pagehtml = template('pageTpl',response)
				$('#pageBox').html(pagehtml)
				
			}
		})
	}
	
	// 更改评论状态
	$('#comments').on('click','.edit',function(){
		// 获取评论id
		var id = $(this).attr('data-id')
		// 获取评论状态
		var state = $(this).attr('data-state')
		
		$.ajax({
			type:'put',
			url:'/comments/'+id,
			data:{
				state:state==0?1:0
			},
			success: () => {
				location.reload()
			}
		})
	})
	
	// 删除文章评论信息
	$('#comments').on('click','.delete',function(){
		
		var id = $(this).attr('data-id')
		
		if(confirm('是否确认删除?')){
		$.ajax({
			type:'delete',
			url:'/comments/'+id,
			success:response=>{
				location.reload()
			}
		})
	  }
	})