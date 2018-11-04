;(function(){


    render()
function render(){

    $.ajax({
        type:"get",
        url:'/category/queryTopCategory',
        dataType:'json',
        success:function(info){
            // console.log(info);
            var htmlStr=template('tmp',info)
            $('#left_ul').html(htmlStr)
           
            renderSecondById( info.rows[0].id );
        }
    
    })
}

//遍历 ul lia
$('#left_ul').on('click','a',function(){
    $(this).addClass('active').parent().siblings().find("a").removeClass("active")
var id=$(this).data("id");
renderSecondById(id)
})


// 封装二级分类方法
function renderSecondById(id){
    // 发送ajax 请求
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
            id:id
        },
        success:function(info){
            // console.log(info);
            var htmlStr=template('righthtml',info);
            $('#right_ul').html(htmlStr)
            
        }
    })
}


})();