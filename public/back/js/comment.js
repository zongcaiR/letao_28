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
$('.pull-left').on('click',function(){
   $(".aside").toggleClass('hidemenu')
   $(".content").toggleClass('hidemenu')

})





})