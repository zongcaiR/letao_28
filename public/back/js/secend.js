$(function(){
  var currentPage=1;
  var pageSize=5;
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
      var htmlStr=template('secondTmp',info)
      $('tbody').html(htmlStr)

 // 分类页插件
$('#paginator').bootstrapPaginator({
  bootstrapMajorVersion:3,
  currentPage:info.page,
  totalPages:Math.ceil(info.total/info.size),
  onPageClicked:function(a,b,c,page){
    currentPage=page;
    render()
  }
})     
    }
  })
}


// 2添加模态框处理
$('.add_B').click(function(){
  $('#secondModal').modal('show');
  //在点击添加时向后台发送请求
// 模拟数据与接口
  $.ajax({
    type:'get',
    url:'/category/querySecondCategoryPaging',
    data:{
      page:1,
      pageSize:100

    },
    dataType:'json',
    success:function(info){
      // console.log(info);
      var Tmp=template('dropdownTpl',info)
      $('.dropdown-menu').html(Tmp)
      
    }
  })
})

//3 给ulli 里的a 注册点击事件 动态生成用世界委托
$('.dropdown-menu').on('click','a', function(){
//获取a的文本

var txt =$(this).text();
$('#dropdownText').text(txt);
//获取id  设置给隐藏域

var id=$(this).data('id');
$('[name="categoryId"]').val(id);



$('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  
//使用表单校验实例可以调用一些常用的方法。

})

// 4配置文件上传插件
$('#fileupload').fileupload({
  dataType:"json",
  //e：事件对象
  //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
  done:function (e, data) {
    // console.log(data);//可以看见后台返回的数据信息里有img地址
    var picUrl=data.result.picAddr
    // console.log(picUrl);
    $('#imgBox img').attr('src',picUrl)
      // 让 隐藏域 校验状态变成 校验成功
      $('[name="brandLogo"]').val(picUrl)
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
   
  }
})


// 5.表单校验功能
//使用表单校验插件
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
    categoryId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请选择一级分类'
        },
       
      }
    },
    brandName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入二级分类'
        },
       
      }
    },
    brandLogo: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请选择图片'
        },
       
      }
    },
  }

});

// 6表单校验成功事件
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  
  $.ajax({
    type:'post',
    url:'/category/addSecondCategory',
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      // console.log(info);
      if(info.success){
        $('#secondModal').modal('hide');
        currentPage=1;
        render();

         // 重置表单的状态和内容
         $('#form').data("bootstrapValidator").resetForm(true);

         // img图片和下拉菜单不是表单元素, 需要手动重置
         $('#dropdownText').text("请选择一级分类");
         $('#imgBox img').attr("src", "images/none.png");
      }
    }
  })
});



//函数入口括号
})