var initbase64;
function jSignatureInit() {
  $("#signature").jSignature();
  // $(".jSignature").css({ "width": "100%", "height": "100%" });
  initbase64 = $("#signature").jSignature("getData", "image");
};
function jSignatureReset() {
  var $sigdiv = $("#signature");
  $sigdiv.jSignature("reset");
}
function outputImage() {
  var $sigdiv = $("#signature");
  var datapair = $sigdiv.jSignature("getData", "image"); //设置输出的格式，具体可以参考官方文档

  var imagebase64 = datapair[1].replace(/\+/g, '%2B');

  $.ajax({
    type: "POST",
    url: "Default.aspx",
    data: "image=" + imagebase64,
    success: function (msg) {
      var createImage = new Image();
      createImage.src = msg;
      $(createImage).appendTo($("#img_src"))
    }
  });

}
function jSignature() {
  var $sigdiv = $("#signature");
  var datapair = $sigdiv.jSignature("getData", "image"); //设置输出的格式，具体可以参考官方文档
  if (datapair[1] == initbase64[1]) {
    notify('info', '未签名', '请进行签名!');
    return '';
  }
  return "data:" + datapair[0] + "," + datapair[1];
}
