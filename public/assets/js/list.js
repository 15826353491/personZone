
var id = getParams('categoryId')

// 获取分类文章列表
showCategory(id)
function showCategory(id){
	$.ajax({
	type:'get',
	url:'/posts/category/'+id,
	success:res=>{
		// console.log(res)
		var html = template('categoryTpl',{data:res})
		$('#article').html(html)
		console.log(id)
		if (id == $('#navCategory').attr('data-id')) {
			console.log("zhengque")
		}else{
			console.log("cuowu")
		}
	}
})
}



// 点赞
$('#article').on('click','.like',function(){
	var id = $(this).attr('data-id')
	$.ajax({
			type:'post',
			url:'/posts/fabulous/'+id,
			success:response=>{
				showCategory()
			}
		})	
})

// 本页点击分类不再重载页面 局部更新
$('#topnav,#nav').on('click','#navCategory',function(){
	var id = $(this).attr('data-id')
	// console.log($(this))
	$(this).parent().addClass('current').siblings().removeClass('current')
	showCategory(id)
})