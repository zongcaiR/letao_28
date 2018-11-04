
var currentPage=1;
var pageSize=5;
//将渲染页面封装
render();
function render(){

  $.ajax({
    type: "get",
    url:'/user/queryUser',
    data: {
        page: currentPage,
        pageSize: pageSize
      },
    dataType:'json',
    success:function(info){
      // console.log(info);
      
var templateStr=template('tmp',info)
//渲染到页面上去
$('tbody').html(templateStr);
//插件分页
$('#paginator').bootstrapPaginator({
  // 配置版本号
  bootstrapMajorVersion: 3,
  // 总页数
  totalPages: Math.ceil( info.total / info.size ) ,
  // 当前页
  currentPage: info.page,
  // 页码点击事件
  onPageClicked:function(a,b,c,page){
currentPage=page;
render()
  }
})
    }
});
}


//点击切换引用按钮
// 委托事件
var currentId;
var isDelete;
$('tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
currentId=$(this).parent().data('id')
    //获取当前点击的按钮id
    //判断当前按钮有没有改类名做处理
isDelete=$(this).hasClass('btn-danger')?0:1;
})

//点击确定时 关闭模态从新渲染页面
$('.enter').click(function(){
    $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
            id:currentId,//当前用户id
            isDelete:isDelete
        },
        dataType:'json',
        success:function(info){
            // console.log(info);
            $('#userModal').modal('hide');

            render()
            
        }
    })
})

