
// 获取文章分类列表
$.ajax({
	type:'get',
	url:'/categories',
	success:response=>{
		var html = template('categoryTpl',{data:response})
		$('#category').html(html)
	}
})

// 获取文章信息列表
$.ajax({
	type:'get',
	url:'/posts',
	success:response=>{
		// 拼接文章列表
		var html = template('postTpl',{data:response})
		$('#post').html(html)
		var page = template('pageTpl',response)
		$('#pageBox').html(page)
	}
})

	// 
	$('#pageBox').on('click','li',function(){
		var page = $(this).find('a').attr('data-id')
		// var state = $(this).find('a').attr('data-state')
		// var category = $(this).find('a').attr('data-category')
		changePage(page)
	})

	
	// 切换页码
	function  changePage(page){
		
		$.ajax({
			type:'get',
			url:'/posts',
			data:{page},
			success:response=>{
				// 拼接文章列表
				var html = template('postTpl',{data:response})
				$('#post').html(html)
				// 拼接分页按钮
				var page = template('pageTpl',response)
				$('#pageBox').html(page)
				
			}
		})
	}
	
	
	// 监听筛选表单
	$('#filterForm').on('submit',function(e){
		// 获取要提交的表单数据
		var formDate = $(this).serialize()
		
		$.ajax({
			type:'get',
			url:'/posts',
			data:formDate,
			success:response=>{
				// 拼接文章列表
				var html = template('postTpl',{data:response})
				$('#post').html(html)
				// 拼接分页按钮
				var page = template('pageTpl',response)
				$('#pageBox').html(page)
			}
		})
		e.preventDefault()	
	})
	
	
	// 删除文章信息
	$('#post').on('click','.delete',function(){
		var id = $(this).attr('data-id')
		if(confirm('是否确认删除?')){
		$.ajax({
			type:'delete',
			url:'/posts/'+id,
			success:response=>{
				location.reload()
			}
		})
	  }
	})
	