;(function(){
var key=getSearch('key');

// 赋值给input
$('.search_input').val(key);

render()
function render(){
    
    $('.list_tpl').html('<div class="loading"></div>');

   setTimeout(function(){
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            proName:key,
            page:1,
            pageSize:5,
        },
        dataType:'json',
        success:function(info){
            // console.log(info);
            var htmlStr=template('list_tpl',info);
            $('.list_tpl').html(htmlStr)
        }
    })
   },1000)
}

//点击搜索按钮进行页面渲染
$('.btn_search').click(function(){
    render()
})

// 遍历a改变价格排序
$('.lt_sort a[data-type]').click(function(){
    console.log(1);
    
if($(this).hasClass('change')){
    $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');

}else{
    $(this).addClass('change').siblings().removeClass('change')
}

render()

})



})();