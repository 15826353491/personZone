// 获取登录状态
$.ajax({
	type:'get',
	url:'/login/status',
	success:res=>{
		if(res.includes('isLogin = true')){
			$('.loginnav li:gt('+0+')').show()
			$('#userName').prop('href','javascript:;')
		   var userId = res.split('"')[1]
		   $.ajax({
			   type:'get',
			   url:'/users/'+userId,
			   success:response=>{
				   // console.log(response)
				   $('#userName').html(`<i class="fa fa-user"></i>${response.nickName}`)
			   }
		   })
		}
		else{
		
		}
	}
})


// 退出登录
$('#loginOut').on('click',function(){
	$.ajax({
		type:'post',
		url:'/logout',
		success:response=>{
			// 退出成功，跳转到登录页面
			// location.href = 'login.html'
			location.reload('./admin/login.html')
		}
	})
})



// 获取网站配置
$.ajax({
  	type:'get',
  	url:'/settings',
  	success:response=>{
  	// console.log(response)
    	$('#logo').prop('src',response.logo)
  	}
 })
	


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

// 时间格式化
function dateFormat(date){
	var date = new Date(date)
	function c(data){
		return data<10 ?'0'+data :data
	}
	return date.getFullYear()+'-'+c(date.getMonth()+1)+'-'+c(date.getDate())+' '+c(date.getHours())+':'+c(date.getMinutes())
}
		

//获取文章分类列表
$.ajax({
	type:'get',
	url:'/categories',
	success:response=>{
		var html = template('navTpl',{data:response})
		$('#topnav').html(html)
		$('#nav').html(html)
	}
})


//获取最新评论列表
showLastedComment()
function showLastedComment(){
	$.ajax({
		type:'get',
		url:'/comments/lasted',
		success:response=>{
			 //console.log(1)
			var html = template('commentTpl',{data:response})
			$('#comments').html(html)
		}
	})
}
	
	
// 获取热门推荐列表
// $.ajax({
// 	type:'get',
// 	url:'/posts/recommend',
// 	success:response=>{
// 		// console.log(response)
// 		var recommendTpl = `
// 			{{each data}}
// 			<li>
// 					<a href="detail.html?detailId={{$value._id}}">
// 					  <img src="{{$value.thumbnail}}" alt="">
// 					  <span>{{$value.title}}</span>
// 					</a>
// 			</li>
// 			{{/each}}
// 		`
// 		var html = template.render(recommendTpl,{data:response})
// 		$('#recommend').html(html)
// 	}
// })
	
//获取热门推荐列表
$.ajax({
		type:'get',
		url:'/posts/recommend',
		success:response=>{
			// console.log(response)
			var html = template('recommendTpl',{data:response})
			$('#recommend').html(html)
		}
	})		









//获取随机推荐列表
$.ajax({
	type:'get',
	url:'/posts/random',
	success:response=>{
		// console.log(response)
		var html = template('randomTpl',{data:response})
		$('#random').html(html)
	}
})		
	
	
// 文章搜索
$('.search').on('submit','form',function(){
	
	var key = $(this).find('.keys').val()
	if (key.trim().length ===0) return
	location.href = '/search.html?key='+key
	
	return false
})
