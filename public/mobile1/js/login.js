;(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        dataTyp:'json',
        success:function(info){
            // console.log(info);
            // if(info.error===400){
            //     location.href='login.html'
            // }
        }
    })
    $('.top .icon_left').click(function(){
        location.href="index.html"
    })
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, 
        indicators: false ,
        bounce: true //是否启用回弹
      });


      $('#loginBtn').click(function(){
// 获取用户名和密码
var username = $('#username').val();
var password = $('#password').val();
if ( username.trim() === "" ) {
    mui.toast("请输入用户名");
    return;
  }
  if ( password.trim() === "" ) {
    mui.toast("请输入密码");
    return;
  }
   // 发送ajax请求, 进行登录
 $.ajax({
    type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
success:function(info){
    if ( info.error ) {
        mui.toast("用户名或者密码错误");
        return;
    };
    //登录功能
    if(info.success){
        if(location.search.indexOf('retUrl')>-1){
   // (1) 传了地址, 就跳转到对应页面
   var retUrl = location.search.replace("?retUrl=", "");
   location.href = retUrl;
        }else{
              // (2) 没传地址, 跳转到个人中心页
              location.href = "user.html";
        }
    }
}
 })
      })

})();