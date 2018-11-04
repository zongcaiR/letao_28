// 进度条插件
$(document).ajaxStart(function(){
    //引入了nprogress.js文件后，就有了一个全局对象NProgress对象
    NProgress.start();
})
$(document).ajaxStop(function() {
    // 在所有的 ajax 请求完成时调用
    // 模拟网络环境, 添加延迟
    setTimeout(function() {
      NProgress.done();
    }, 500 );
  });

// 表单校验
$("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback :{
              message:'用户名不纯在'
          }
         
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '密码长度必须在2到6之间'
          },
          callback :{
              message:'密码错误'
          }
         
        }
      },
    }
  
  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        type:'post',
    url:'/employee/employeeLogin',
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
        // console.log(info);
        if(info.success){
            location.href="index.html"
        }
        
        
    }
    })
});




//点击重置
$('[type="reset"]').on('click',function(){
    $("#form").data('bootstrapValidator').resetForm(true)
})

















