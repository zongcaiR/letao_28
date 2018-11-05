;(function(){
    //控制台   手动设置本地存储信息
    render()
   
// 封装
function getHistory(){
    var jsonStr=localStorage.getItem('search_list')||'[]';
    var arr=JSON.parse(jsonStr)
    // console.log(arr);
    return arr
}

// 渲染操作封装
//1结合模板动态渲染
function render(){
    var arr=getHistory();

    var Str = template("search_tpl", { list: arr });
    $('.history').html( Str );
}



// 2点击单个删除按钮
$('.history').on('click','.btn_delete',function(){
//  
    //获取当前i
    var index=$(this).data("index");
    console.log(index);
    
    var arr =getHistory();
    arr.splice(index,1);
    // 在将数组转成字符串在存到本地中
    localStorage.setItem("search_list",JSON.stringify(arr))
    //页面从新渲染
    render()
})



//3点击清空按钮
$('.history').on('click','.btn_empty',function(){
    mui.confirm("你确定要清空历史记录嘛?", "温馨提示", ["取消", "确认"], function( e ) {
        if ( e.index === 1 ) {
            // 确认, 进行清空
            localStorage.removeItem( "search_list" );
            render();
          }


})
})


/*
  * 功能4: 添加历史记录功能
  * 思路:
  *   (1) 给搜索按钮添加点击事件
  *   (2) 获取输入框的值
  *   (3) 往数组的最前面添加 (unshift)
  *   (4) 将数组存储到本地存储中
  *   (5) 页面重新渲染
  * */
$('.search_btn').click(function(){
    var key =$('.search_input').val().trim();
    if(key===""){
        mui.toast('请输入搜索关键字');
        return
    }

    //往数组里追加数据
    var arr=getHistory();
// 重fux的掉到前面来
var index=arr.indexOf(key);
if(index != -1){//不等于-1说明有重复的
     // 有重复项, 删除重复项
     arr.splice( index, 1 );
}
if(arr.length>=10){
    //删除最后一项
    arr.pop()
}
     //往数组里追加数据
    arr.unshift(key);
    localStorage.setItem('search_list',JSON.stringify(arr));
    // 重新渲染
  
    render();
    // 清空内容
    $('.search_input').val( "" );
     // 跳转到 searchList 搜索列表页  将输入的值带进去
location.href="searchList.html?key="+key


})


})();