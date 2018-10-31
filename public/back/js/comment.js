// $(document).ajaxStart(function() {
//     // 第一个 ajax 开始发送时调用, 开启进度条
//     NProgress.start();
//   });
  
  
//   $(document).ajaxStop(function() {
//     // 在所有的 ajax 请求完成时调用
//     // 模拟网络环境, 添加延迟
//     setTimeout(function() {
//       NProgress.done();
//     }, 500 );
//   });

$(function(){
    $(".fen").on('click',function(){
       $(".fen_lt").stop().slideToggle();
       
        
    });
//点击侧边栏效果
$('.qiehuan').on('click',function(){
   $(".aside").toggleClass('hidemenu')
   $(".content").toggleClass('hidemenu')

})

$('.pull-right').on('click',function(){
    $('#myModal').modal(options)
})

//点击退出 跳转到登录页；
$('#loginBut').on('click',function(){
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        dataType:'json',
        success:function(info){
            if(info.success){
                location.href="login.html "
            }
            
        }
    })
})


//用户界面判断是否登录过做判断
// /拦截功能
$.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info){
        // console.log(info);
        if(info.error===400){
            location.href="login.html"
        }
        
    }
})



})