
// 通过关键字搜索文章
var key = getParams('key')

$.ajax({
		type:'get',
		url:'/posts/search/'+key,
		success:response=>{
			// console.log(response)
			var html = template('searchTpl',{data:response})
			$('#article').html(html)
		}
	})	
	