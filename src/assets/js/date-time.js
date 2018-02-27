function setDateTimeGroup(select) {
  (function($) {
    $.init();
    var items = $(select);

    items.each( function (i, value) {
      value.addEventListener('tap', function() {
        var optionsJson = this.getAttribute('data-options') || '{}';
        var options = JSON.parse(optionsJson);
        var id = this.getAttribute('id');
        /*
         * 首次显示时实例化组件
         * 示例为了简洁，将 options 放在了按钮的 dom 上
         * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
         */
        var picker = new $.DtPicker(options);

        picker.show(function(rs) {
          /*
           * rs.value 拼合后的 value
           * rs.text 拼合后的 text
           * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
           * rs.m 月，用法同年
           * rs.d 日，用法同年
           * rs.h 时，用法同年
           * rs.i 分（minutes 的第二个字母），用法同年
           */
          console.log('选择结果: ' + rs.text);
          /*
           * 返回 false 可以阻止选择框的关闭
           * return false;
           */
          /*
           * 释放组件资源，释放后将将不能再操作组件
           * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
           * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
           * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
           */
          picker.dispose();

          if (rs.text) {
            $('#'+id)[0].value = rs.text;
          }
        });
      }, false)
    });
  })(mui);
}

function getDateTime(select) {
  return $(select).val();
}
function muiToast(string) {
  $('#warning .text').text(string);
  $('#warning .text').show();
  setTimeout(function () {
    $('#warning .text').hide();
  }, 1500);
}

function getFileName() {
  setTimeout(function() {
    setDateTimeGroup('.dateTime');
  }, 1000);
  return $("#upfile").get(0).files[0] ? $("#upfile").get(0).files[0].name : null;
}
function fileUpload() {
  var result;
  var fd = new FormData();
  fd.append('file', $("#upfile").get(0).files[0], $("#upfile").get(0).files[0].name);
  $.ajax({
    url: "http://121.8.210.226:9100/api/upload_file",
    type: "POST",
    processData: false,
    contentType: false,
    headers: { "Authorization": localStorage.getItem('token') },
    data: fd,
    async:false,
    success: function(data) {
      muiToast("文件上传成功!");
      result = data;
    }
  });
  return result;
}
