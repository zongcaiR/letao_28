$(function(){
var currentPage=1;
var pageSize=2;


var picArr=[]  //用来存储上传图片


// 1
render()
function render(){ 
    $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
    
        dataType:'json',
        success:function(info){
            // console.log(info);
            var html=template('productTpl',info)
            $('tbody').html(html);

// 分页插件
 // 分类页插件
       $('#paginator').bootstrapPaginator({
    bootstrapMajorVersion: 3, // 版本号
    totalPages: Math.ceil( info.total / info.size ),
    currentPage: info.page,
    onPageClicked: function(a, b, c, page) {
        // console.log(page);
        
      // 更新当前页, 重新渲染
      currentPage = page;
      render();
    }
     })
        }
    
    })
}

 


//2点击添加标签向后台发送请求
$('.add_B').click(function(){
    $('#productModal').modal('show');

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
        var html=template('LI',info);
        $(".dropdown-menu").html(html)
        
    }
})


})

// 3给动态生成的  a   注册点击事件
$('.dropdown-menu').on('click','a',function(){
//获取点击的a 的文本
var txt=$(this).text();
//添加到下拉框中
$('#dropdownText').text(txt);


// 再将获取到的id值赋值给隐藏域校验用
var id=$(this).data('id');
$('[name="brandId"]').val(id)
//校验没写
// 重置校验状态为 VALID
$('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");

})


// 4进行插件初始化
$('#fileupload').fileupload({
//数据类型
dataType:"json",
//e：事件对象
//data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
done:function (e, data) {
//   console.log(data);
var picObj=data.result;
var picUrl=picObj.picAddr;

picArr.unshift(picObj);
//将显示img的div 添加图片
// 将图片路径设置给 img src 并添加到 imgBox的子元素最前面
$('#imgBox').prepend( '<img src="' + picUrl + '" alt="">' );



//当长度大于3时 删掉最后面一个
if(picArr.length>3){
    picArr.pop();//数组删除最后一个
    $('#imgBox img:last-of-type').remove()
}
   // 如果图片上传满了 3 张, 应该让picStatus的校验状态, 置成校验成功
   if ( picArr.length === 3 ) {
    $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
  }

}
})


// 5添加表单校验
$('#form').bootstrapValidator({
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
        brandId: {
          validators: {
            notEmpty: {
              message: "请选择二级分类"
            }
          }
        },
        proName: {
          validators: {
            notEmpty: {
              message: "请输入商品名称"
            }
          }
        },
        proDesc: {
          validators: {
            notEmpty: {
              message: "请输入商品描述"
            }
          }
        },
        // 要求库存必须是非零开头的数字
        num: {
          validators: {
            // 非空校验
            notEmpty: {
              message: "请输入商品库存"
            },
            // 正则校验  \d 表示数字 [0-9]
            // \d 出现 0次或多次
            // * 表示 0 次或多次
            // ? 表示 0 次或1次
            // + 表示 1 次或多次
            regexp: {
              regexp: /^[1-9]\d*$/,
              message: '库存格式要求是非零开头的数字'
            }
          }
        },
  
        // 要求尺码是  xx-xx 的格式,  xx 表示数字
        size: {
          validators: {
            // 非空校验
            notEmpty: {
              message: "请输入商品尺码"
            },
            regexp: {
              regexp: /^\d{2}-\d{2}$/,
              message: '尺码格式必须是 xx-xx 的格式, 例如: 32-40'
            }
          }
        },
  
        oldPrice: {
          validators: {
            notEmpty: {
              message: "请输入商品原价"
            }
          }
        },
        price: {
          validators: {
            notEmpty: {
              message: "请输入商品现价"
            }
          }
        },
  
        picStatus: {
          validators: {
            notEmpty: {
              message: "请上传3张图片"
            }
          }
        }
      }
  
  });


  //6 注册表单校验成功事件

  $('#form').on('success.form.bv',function(e){
  e.preventDefault();

  //拼接需要传给后台的参数
  var params = $('#form').serialize();   // aa=xx&bb=xx

    // params += "&picName1=xx&picAddr1=xx";
    params += "&picName1="+ picArr[0].picName +"&picAddr1=" + picArr[0].picAddr;
    params += "&picName2="+ picArr[1].picName +"&picAddr2=" + picArr[1].picAddr;
    params += "&picName3="+ picArr[2].picName +"&picAddr3=" + picArr[2].picAddr;

//通过ajax请求提交
$.ajax({
    type: "POST",
    url: "/product/addProduct",
    data: params,
    dataType: "json",
    success: function( info ) {
      console.log( info );
      if ( info.success ) {
        // 添加成功
        // 关闭模态框
        $('#productModal').modal("hide");
        // 重新渲染第一页
        currentPage = 1;
        render();
        // 重置模态框的表单内容和状态
        $('#form').data("bootstrapValidator").resetForm(true);
        // 重置文本和图片
        $('#dropdownText').text("请选择二级分类");
        $('#imgBox img').remove();
      }
    }
  })



  })


})