$.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataTyp:'json',
    success:function(info){
        console.log(info);
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