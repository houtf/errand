define(['zepto', 'touch', 'iscroll'], function() {
    window.$ = Zepto;

    var oMask = {
        openMask:function(){
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = 'hidden';
        },
        hideMask : function(){
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = 'auto';
        }
    }

    function ajaxForData() {
        $.ajax({
            url: '/mock/test.json',
            data: {},
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(jsonData) {
                initOrshowDom(jsonData);
            }
        });
    }

    function initOrshowDom(jsonData) {
        if (jsonData) {
            var tpls = '<section class="sm_wrap">'+
                '<div class="c">'+
                    '<p>科学的电磁炮 炮姐御坂美琴 海滩边手办</p>'+
                    '<dl class="co"><dt>颜色:</dt><dd><a href="javascript:;"><img src="/images/p-size.png"/></a><a  href="javascript:;"><img src="/images/p-size.png"/></a></dd></dl>'+
                    '<dl class="num"><dt>数量:</dt><dd id="jisuan"></dd></dl>'+
                '</div>'+
                '<div class="d">'+
                    '<span class="d1">距离3.5KM</span>'+
                    '<span class="d2">自己去</span>'+
                    '<span class="d3">加入购物车</span>'+
                '</div>'+
            '</section>';
            $(document.body).append(tpls);
            var mask_tpl = '<section class="sm_mask"></section>';
            $(document.body).append(mask_tpl);
            $('.sm_mask').width($(document).width());
            $('.sm_mask').height($(document).height());
        } else {
            $('.sm_wrap,.sm_mask').show();
        }
        oMask.openMask();
        $('.sm_wrap').css('bottom', -document.body.scrollTop);
    }

    function bindEvents() {
        var $mask = $('.sm_mask'),
            $wrap = $('.sm_wrap');

        $mask.on('tap', function(e) {
            e.stopPropagation();
            $(this).hide();
            $wrap.css('bottom', -220).hide();
            oMask.hideMask();
        });
        $('.co').on('tap','a',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });
    }   

    return {

        init: function() {
            var sideScroll = null;
            if (!$('.sm_wrap').length) {
                initOrshowDom(1);
            } else {
                initOrshowDom();
            }
            bindEvents();
        }
    }
});
