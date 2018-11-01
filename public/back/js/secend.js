$(function(){
var currentPage=1;
var pageSize=5;//设置每页多少条
   

//封装渲染小方法
//1 一进入页面调用的函数
render()
function render(){
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        dataType:'json',
        success:function(info){
            // console.log(info);
          var htmlStr=template('secendTmp',info)
            
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


//2点击添加 弹模态框
$('.add_B').click(function(){
    $('#secendModal').modal('show')

// 请求模态框的下拉菜单数据, 进行渲染
    // /category/queryTopCategoryPaging
    // 提供的是分页接口, 我们可以通过 分页接口, 模拟获取全部一级分类的接口
    // 配置请求 第一页, 请求 100 条数据, 模拟接口
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page: 1,
        pageSize: 100
        },
        dataType: "json",
        success: function( info ) {
        //   console.log( info )
          var htmlStr = template("dropdownTpl", info);
        // 动态渲染
        $('.dropdown-menu').html( htmlStr );
        }
    })


})


// 3. 给下拉菜单中的 a 注册点击事件, 通过事件委托注册
$('.dropdown-menu').on('click','a',function(){
    //获取啊a的文本
    var txt=$(this).text();
    // console.log(txt);
    $('#dropdownText').text( txt );
    // 获取选择的一级分类 id, 设置给隐藏域
    var id = $(this).data("id");
    $('[name="categoryId"]').val( id );

      // 让一级分类对应的隐藏域, 校验状态置成 校验成功
    // 参数1: 字段名称
    // 参数2: 校验状态
    // 参数3: 配置校验规则, 用来显示错误信息
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
});



//4. 配置文件上传插件
$('#fileupload').fileupload({
    dataType:'json',
    done:function (e, data) {
        // console.log(data.result);//后台返回一个地址
        var picUrl=data.result.picAddr;//图片地址
        //设置 img的src 属性
        $('#imgBox img').attr("src", picUrl);
        // 设置给 隐藏域
      $('[name="brandLogo"]').val( picUrl );
       // 让 隐藏域 校验状态变成 校验成功
    //    $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
   
      }
})

//表单校验
$('#form').bootstrapValidator({
    // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // 对任意配置了的 input 都进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 校验字段
    fields: {

      // categoryId 选择一级分类
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }

    }
  });

//6  注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进行提交
$('#form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
        type:'post',
        url:"/category/addSecondCategory",
        data:$('#form').serialize(),
        dataType:'json',
        success:function(info){
            // console.log(info);
            if ( info.success ) {
                // 分类添加成功
                // 关闭模态框
                $('#secendModal').modal("hide");
                // 重新渲染第一页
                currentPage = 1;
                render();
      
                // 重置表单的状态和内容
                $('#form').data("bootstrapValidator").resetForm(true);
      
                // img图片和下拉菜单不是表单元素, 需要手动重置
                $('#dropdownText').text("请选择一级分类");
                $('#imgBox img').attr("src", "images/none.png");
              }
            
        }
    })
})

})