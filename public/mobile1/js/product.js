;(function(){
// 1. 从地址栏获取传递过来的productId, 根据产品id发送ajax请求, 进行渲染
var productId = getSearch("productId");



    
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:1
        },
        dataType:'json',
        success:function(info){
            console.log(info);
            var htmlStr=template('productTmp',info)
$('.tian').html(htmlStr)

// 需要手动初始化手动轮播
var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

// 手动初始化 数字框
mui('.mui-numbox').numbox();

        }
    });

//给尺码添加选中功能
$('.lt_main').on('click','.lt_size span',function(){
    //给自己加上current类 溢出其他元素
    // console.log(1);
    
    $(this).addClass('active').siblings().removeClass("active")
});

//点击添加尺码与数量
$('#addCart').click(function(){
var size=$(".lt_size span.current" );
var num = $('.mui-numbox-input').val(); // 数量


// 发送 ajax 请求, 进行加入购物车
 
$.ajax({
    type:'post',
    url:'/cart/addCart',
    data:{
        productId: productId,
        num: num,
        size: size
    },

    dataType:'json',
    success:function(info){
        if ( info.success ) {
            // 添加成功, 弹出一个确认框
            mui.confirm( "添加成功", "温馨提示", ["去购物车", "继续浏览"], function( e ) {
              if ( e.index === 0 ) {
                // 去购物车
                location.href = "cart.html";
              }
            })
          }

          // 用户没登陆
          if ( info.error === 400 ) {
            // 跳转到登录页, 将来登录成功, 需要跳回来
            // 可以将当前页面的地址传递给登录页, 将来登录成功后, 获取传递过来的地址, 跳回来
            location.href = "login.html?retUrl=" + location.href;
          }
    }
})



})


})();