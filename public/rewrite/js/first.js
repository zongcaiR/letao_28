;(function(){
    var currentPage=1;
    var pageSize=5;
    render()
function render(){
    
    $.ajax({
        type:"get",
        url:'/category/queryTopCategoryPaging',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        dataType:'json',
        success:function(info){
            // console.log(info);
            
 var htmlStr=template('firstTmp',info);
   $('tbody').html(htmlStr);
   //分页diamante
     // 进行分页初始化
    
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
    // console.log(page);
    
      render()
        }
      })

        }
    })
}


//点击添加分类弹模态框
$('.add_B').click(function(){
    $('#firstModal').modal('show');

})

$('.addBtn').click(function(){
    $('#firstModal').modal('hide');

    $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$('#form').serialize(),
        dataType:'json',
        success:function(info){
            // console.log(info);
            currentPage=1;
         render();   
        }
    })

    // 表单在模态框取消时重置
    $('#form').data('bootstrapValidator').resetForm(true)
})

//校验字段插件
$("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '一级分类不能为空'
          },
          
        },
      },
    }
})
})();


