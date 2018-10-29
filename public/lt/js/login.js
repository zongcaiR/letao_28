$(function(){
    $("#form").bootstrapValidator({

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
        //长度校验
        stringLength: {
          min: 2,
          max: 6,
          message: '用户名长度必须在6到30之间'
        },
        callback:{
            message:'用户名不存在'
        },
     
      }
    },
    password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback:{
              message:'密码错误'
          },
       
        }
      },
  }
    })
});


$("#form").on('success.form.bv', function (e) {
//    阻止默认的表单提交
    e.preventDefault()
    //使用ajax提交逻辑
// console.log("eaf");

// ajax进行登录请求
$.ajax({
    type:'post',
    url:'/employee/employeeLogin',
    dataType:'json',
    data:$('#form').serialize(),
    success:function(info){
        // console.log(info);
if(info.success){
    location.href='index.html'
}
if(info.error===1000){
    $('#form').data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
}
if ( info.error === 1001 ) {
    // alert( "密码错误" );
    // updateStatus
    // 参数1: 字段名称
    // 参数2: 校验状态
    // 参数3: 校验规则, 可以设置提示文本
    $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
  }      


    }
});
// 3. 重置功能实现
$('[type="reset"]').click(function() {
    console.log( 1111 );
    // 除了重置文本, 还要重置校验状态
    $('#form').data("bootstrapValidator").resetForm();
  });

});

