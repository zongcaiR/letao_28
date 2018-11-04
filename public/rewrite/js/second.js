;(function(){
  var currentPage=1;
  var pageSize=5;



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
    render();
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
            var htmlStr=template('secondTmp',info);
            $('tbody').html(htmlStr);

            //分页插件
            $('#paginator').bootstrapPaginator({
                // 版本号
                bootstrapMajorVersion: 3,
                // 总页数
                totalPages: Math.ceil( info.total / info.size ),
                // 当前页
                currentPage: info.page,
                // 绑定页码点击事件
                onPageClicked: function( a, b, c, page ) {
                  // 点击时, 显示 page 页的数据
                  // 更新当前页
                  currentPage = page;
                  render();
                }
              })
        }
    })
}

//2点击添加Annie弹模态框
$('.add_B').click(function(){
    $('#secondModal').modal('show');
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
      pageSize:100
},
dataTyp:'json',
success:function(info){
    // console.log(info);
var htmlStr=template('ulli',info);
$('.dropdown-menu').html(htmlStr);   
      }
})
})


// 3给a注册点击事件需要事件委托
$('.dropdown-menu').on('click','a',function(){
// 获取文本内容
var txt=$(this).text();
// /填充到span里
$('#dropdownText').text(txt)

var id=$(this).data('id');
$('[name="categoryId"]').val(id)

$('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  
})

// 4文件上传插件
$("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
// console.log(data);
var picUrl=data.result.picAddr;
//将图片路径赋值给img
$('#BoxImg img').attr('src',picUrl);
//form提交需要信息
$('[name="brandLogo"]').val(picUrl)
$('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
   
    }
})


// if($('[name="brandName"]').val().trim().length>0){
    // $('#form').data("bootstrapValidator").updateStatus("categoryName", "VALID")
     
// }


// 5表单校验插件
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


// 6最后点击添加隐藏模态
$('.addBtn').click(function(){
    $('#secondModal').modal('hide');
    $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:$('#form').serialize(),
        dataType:'json',
        success:function(info){
            // console.log(info); 
            currentPage=1;
            render();          
            // 重置表单的状态和内容
         $('#form').data("bootstrapValidator").resetForm(true);
         
        }
    })
})


})();





