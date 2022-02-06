//グレースケール変換関数
var grayFilter = function(src, dst, width, height) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var idx = (j + i * width) * 4;
            var gray = (src[idx] + src[idx + 1] + src[idx + 2]) / 3;
            dst[idx] = gray;
            dst[idx + 1] = gray;
            dst[idx + 2] = gray;
            dst[idx + 3] = src[idx + 3];
        }
    }
};
window.addEventListener("DOMContentLoaded", function(){
    //ファイルオープンの際のイベント
    var ofd = document.getElementById("selectfile");
    ofd.addEventListener("change", function(evt) {
        var img = null;
        var canvas = document.createElement("canvas");
        //var canvas = document.getElementById('canvas');
 
        var file = evt.target.files;
        var reader = new FileReader();
 
        //dataURL形式でファイルを読み込む
        reader.readAsDataURL(file[0]);
 
        //ファイルの読込が終了した時の処理
        reader.onload = function(){
            img = new Image();
            img.onload = function(){
                //キャンバスに画像をセット
                var context = canvas.getContext('2d');
                var width = img.width;
                var height = img.height;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(img, 0, 0);
 
                //フィルター処理
                var srcData = context.getImageData(0, 0, width, height);
                var dstData = context.createImageData(width, height);
                var src = srcData.data;
                var dst = dstData.data;
                grayFilter(src, dst, width, height);
                context.putImageData(dstData, 0, 0);
 
                //画像タグに代入して表示
                var dataurl = canvas.toDataURL();
                document.getElementById("output").innerHTML = "<img src='" + dataurl + "'>";
            }
            img.src = reader.result;
        }
    }, false);
});


img.src = "https://4.bp.blogspot.com/-zyNZhdmhTf0/W-VEh-X17dI/AAAAAAABQGU/k-cQLqEaSwIhrUMsmGDpuBbxTMruBopAQCLcBGAs/s400/sick_middle_age_crisis.png";   
