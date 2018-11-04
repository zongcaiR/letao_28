$('.qiehuan').click(function(){
$('.content').toggleClass('hidemenu');
$('.aside').toggleClass('hidemenu');
})

//点击退出
$('.content .top .pull-right').click(function(){
    $('#myModal').modal('show')

    

})

$('.btnout').click(function(){
    location.href="login.html"
})
$('.fen').click(function(){
    $('.erji').slideToggle('yincang')
})


