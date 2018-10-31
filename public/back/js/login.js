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
  
  
  //使用表单校验插件
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
                message: '不能为空'
              },
              //长度校验
              stringLength: {
                min: 2,
                max: 6,
                message: '密码长度必须在2到6之间'
              },
              callback:{
                message:'密码错误'
              }
              
            }
          },
        }
      
      });


      $('#form').on("success.form.bv", function( e ) {
        // 阻止默认的表单提交
        e.preventDefault();
        
      $.ajax({
        type: "post",
        url: "/employee/employeeLogin",
        dataType: "json",
        data: $('#form').serialize(),
        success: function( info ) {
        //   console.log( info)
        if(info.success){
            location.href="uesr.html"
        }
        if(info.error===1000){
            $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback"); 
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

      })

      })
    

// //表单重置功能

$('[type="reset"]').on('click',function(){
   //重置表单样式
// 传参全部重置
// 不穿参只从重置校验状态
  $("form").data("bootstrapValidator").resetForm(true);
})



