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
    var currentPage=1;
    var pageSize=5;//设置每页多少条
    //封装渲染方法
    render()
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page: currentPage ,
                pageSize:pageSize,
            },
            dataType:'json',
            success:function(info){
    // console.log(info);
    var htmlStr=template('firstTmp',info)
    
    $('tbody').html(htmlStr)

    //分页插件
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
        })
    }


//点击添加按钮
// 1显示模态框
$('.add_btn').click(function(){
    $('#firstModal').modal('show')
})

//点击添加功能一级验证完成
$('#addBtn').click(function(){
    if($('.form-control').val().trim().length===0){
        return false;
    }else{
        $('#firstModal').modal('hide')
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                // console.log(info);
                currentPage=1;
                
                    render()
                    $('#form').data("bootstrapValidator").resetForm( true );     
            }
        })
    }
   
})


// 表单校验
$('#form').bootstrapValidator({
    
    //配置图标
    feedbackIcons:{
        valid: 'glyphicon glyphicon-ok',   // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      
    },
     // 配置需要校验的字段
     fields: {
        categoryName: {
          // 校验规则
          validators: {
            notEmpty: {
              message: "请输入一级分类"
            }
          }
        }
      }
    
})

})


