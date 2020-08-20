var _bm             = require('util/bm.js');
var _cities             = require('util/cities/index.js');
var _address        = require('service/address-service.js');
var templateAddressModal   = require('./address-modal.string');

var addressModal = {
    show : function(option){
      // 绑定 option
      this.option = option;
      this.option.data = option.data || {}
      this.$modalWrap = $('.modal-wrap')
      // 渲染页面
      this.loadModal();
      // 绑定事件
      this.bindEvent();
    },
    bindEvent : function(){
      var _this = this
      // 省份和城市的二级联动
      this.$modalWrap.find('#receiver-province').change(function(){
        var selectedProvince = $(this).val()
        _this.loadCities(selectedProvince)
      });
      // 提交收货地址
      this.$modalWrap.find('.address-btn').click(function(){
        var receiverInfo = _this.getReceiverInfo(),
            isUpdate = _this.option.isUpdate

        if(!isUpdate && receiverInfo.status){
          _address.save(receiverInfo.data,function(res){
            _bm.successTips('地址添加成功')
            _this.hide()
            typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res)
          },function(errMsg){
            _bm.errorTips(errMsg)
          })
        } else if(isUpdate && receiverInfo.status){
          _address.update(receiverInfo.data,function(res){
            _bm.successTips('地址修改成功')
            _this.hide()
            typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res)
          },function(errMsg){
            _bm.errorTips(errMsg)
          })
        } else {
          _bm.errorTips(receiverInfo.errMsg || '服务器异常')
        }

      });
      // 关闭弹窗(点击x号或蒙版区)
      this.$modalWrap.find('.close').click(function(){
        _this.hide()
      });
      // 保证点击modal内容区不关闭弹窗
      this.$modalWrap.find('.modal-container').click(function(e){
        e.stopPropagation()
      });
    },
    loadModal : function(){
      var addressModalHtml = _bm.renderHtml(templateAddressModal,{
        isUpdate : this.option.isUpdate,
        data : this.option.data
      })
      this.$modalWrap.html(addressModalHtml)
      // 加载省份
      this.loadProvince();
    },
    // 加载省份
    loadProvince : function(){
      var provices = _cities.getProvinces() || [],
          $provicesSelect = this.$modalWrap.find('#receiver-province')
      $provicesSelect.html(this.getSelectOption(provices))

      if(this.option.isUpdate && this.option.data.receiverProvince){
        $provicesSelect.val(this.option.data.receiverProvince)
        // 加载城市
        this.loadCities(this.option.data.receiverProvince)
      }
    },
    getSelectOption : function(optionArray){
      var html = '<option value="">请选择</option>'
      for(var i = 0, length = optionArray.length; i < length; i++){
        html += '<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>'
      }
      return html
    },
    // 加载城市
    loadCities : function(proviceName){
      var cities = _cities.getcities(proviceName) || [],
          $citySelect = this.$modalWrap.find('#receiver-city')
      $citySelect.html(this.getSelectOption(cities))

      if(this.option.isUpdate && this.option.data.receiverCity){
        $citySelect.val(this.option.data.receiverCity)
      }
    },
    // 获取表单信息，并且验证
    getReceiverInfo: function(){
      var receiverInfo = {},
          result = {
            status: false
          }
      receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val())
      receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val()
      receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val()
      receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val())
      receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val())
      receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val())
      
      if(this.option.isUpdate){
        receiverInfo.id = this.$modalWrap.find('#receiver-id').val()
      }

      if(!receiverInfo.receiverName){
        result.errMsg = '请输入收件人姓名'
      } else if(!receiverInfo.receiverProvince){
        result.errMsg = '请选择收件人所在省份'
      } else if(!receiverInfo.receiverCity){
        result.errMsg = '请选择收件人所在城市'
      } else if(!receiverInfo.receiverPhone){
        result.errMsg = '请输入收件人手机号码'
      } else if(!receiverInfo.receiverAddress){
        result.errMsg = '请输入收件人详细地址'
      } else {
        result.status = true
        result.data = receiverInfo
      }
      return result
    },
    // 关闭弹窗
    hide : function(){
      this.$modalWrap.empty()
    }
};
module.exports = addressModal;