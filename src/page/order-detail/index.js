/*
 * @Description: 订单详情逻辑
 * @Author:  Carlisle
 * @Date: 2020-08-19 16:18:12
 * @LastEditTime: 2020-08-19 23:03:44
 */
require("page/common/nav/index.js");
require("page/common/header/index.js");
require("./index.css");
var navSide = require("page/common/nav-side/index.js");
var _bm = require("util/bm.js");
var _order = require("service/order-service");
var templateIndex = require("./index.string");

// page 逻辑部分
var page = {
  data: {
    orderNumber: _bm.getUrlParam("orderNumber"),
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    // 初始化左侧菜单
    navSide.init({
      name: "order-list",
    });
    // 加载detail数据
    this.loadDetail();
  },
  bindEvent: function () {
    var _this = this;
    $(document).on("click", ".order-cancel", function () {
      if (window.confirm("确实要取消该订单吗？")) {
        _order.cancelOrder(
          _this.data.orderNumber,
          function (res) {
            _bm.successTips("该订单取消成功");
            _this.loadDetail();
          },
          function (errMsg) {
            _bm.errorTips(errMsg);
          }
        );
      }
    });
  },
  // 加载订单列表
  loadDetail: function () {
    var orderDetailHtml = "",
      _this = this,
      $content = $(".content");
    $content.html('<div class="loading"></div>');
    _order.getOrderDetail(
      this.data.orderNumber,
      function (res) {
        _this.dataFilter(res);
        orderDetailHtml = _bm.renderHtml(templateIndex, res);
        $content.html(orderDetailHtml);
      },
      function (errMsg) {
        $content.html('<p class="err-tip">' + errMsg + "</p>");
      }
    );
  },
  // 适配器
  dataFilter: function (data) {
    data.needPay = data.status === 10;
    data.isCancelable = data.status === 10;
  },
};
$(function () {
  page.init();
});
