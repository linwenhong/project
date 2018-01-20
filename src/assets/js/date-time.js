function setDateTimeGroup(select) {
  (function($) {
    $.init();
    var items = $(select);

    items.each( function (i, value) {
      value.addEventListener('tap', function() {
        // document.getElementById('shelteringLayer').style.display = 'block';
        var optionsJson = this.getAttribute('data-options') || '{}';
        var options = JSON.parse(optionsJson);
        var id = this.getAttribute('id');
        /*
         * 首次显示时实例化组件
         * 示例为了简洁，将 options 放在了按钮的 dom 上
         * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
         */
        var picker = new $.DtPicker(options);

        /*
         * (新增)日期组件取消按钮监听
         */
        // $('.mui-btn')[0].addEventListener('tap', function () {
        //   picker.dispose();
        //   document.getElementById('shelteringLayer').style.display = 'none';
        // });

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
            // document.getElementById('shelteringLayer').style.display = 'none';
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
  mui.toast(string);
}
