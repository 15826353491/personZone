
// 退出登录
 	$('#loginOut').on('click',function(){
		$.ajax({
			type:'post',
			url:'/logout',
			success:response=>{
				// 退出成功，跳转到登录页面
				// location.href = 'login.html'
				location.reload('login.html')
			}
		})
	})
	
	// 获取用户信息
	$.ajax({
		type:'get',
		url:'/users/'+userId,
		success:res=>{
			$('.profile .avatar').prop('src',res.avatar)
			$('.profile .name').html(res.nickName)
		}
	})
	
	// 时间格式化
		function dateFormat(date){
			var date = new Date(date)
			function c(data){
				return data<10 ?'0'+data :data
			}
			return date.getFullYear()+'-'+c(date.getMonth()+1)+'-'+c(date.getDate())+' '+c(date.getHours())+':'+c(date.getMinutes())+':'+c(date.getSeconds())
		}
		
	// 预览图的显示
	function proviewShow(){
		if(!$('#proview').prop('src')){
			$('#proview').hide()
		}else{
			$('#proview').show()
		}
	}