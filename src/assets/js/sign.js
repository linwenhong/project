var initbase64;

function jSignatureInit() {
  $("#signature").jSignature();
  initbase64 = $("#signature").jSignature("getData", "image");
};

function jSignatureReset() {
  var $sigdiv = $("#signature");
  $sigdiv.jSignature("reset");
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
