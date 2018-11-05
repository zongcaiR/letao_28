function getSearch(key){
    //获取地址栏参数
var str=location.search;
//将代码转成中文    解码
str=decodeURI(str);
str=str.slice(1);//去除？
// 将&分割
var arr=str.split('&');
var obj=[];

// 遍历数组arr
arr.forEach(function(v,i){
    var key=v.split('=')[0];
    var value=v.split('=')[1];

    obj[key]=value;
})
return  obj[key]

}