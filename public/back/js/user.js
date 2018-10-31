//缓冲效果
$(document).ajaxStart(function() {
    // 第一个 ajax 开始发送时调用, 开启进度条
    NProgress.start();
  });
  
  
  $(document).ajaxStop(function() {
    // 在所有的 ajax 请求完成时调用
    // 模拟网络环境, 添加延迟
    setTimeout(function() {
      NProgress.done();
    }, 500 );
  });


$(function(){
    $.ajax({
        type: "get",
        url:'/user/queryUser',
        data: {
            page: 1,
            pageSize: 5
          },
        dataType:'json',
        success:function(info){
            console.log(info);
            
var templateStr=template('tmp',info)


//渲染到页面上去
$('tbody').html(templateStr);
        }
    });
})