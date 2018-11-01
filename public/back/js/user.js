$(function(){
var currentId;//当前id
var isDelete;
var currentPage=1;
var pageSize=5;


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




//  点击启用禁用需要事件委托
$('.table').on('click','.btn',function(){
$('#userModal').modal('show')
currentId=$(this).parent().data('id');
// console.log(currentId);
//判断 当前点击的按钮是否有改类名 来改变值
isDelete=$(this).hasClass('btn-danger')?0:1;
})

$('#userBtn').click(function(){
  //点击确定按钮
// 1模态框隐藏
// 改变按钮值 以及状态
  $.ajax({
    type:'post',
    url:'/user/updateUser',
    data:{
      id:currentId,
      isDelete:isDelete
    },
    dataType:'json',
    success:function(info){
      // console.log(info); success为true
      // 将模态窗隐藏并且从新渲染页面
      $('#userModal').modal('hide');

render()
      
    }
  })
})







})











