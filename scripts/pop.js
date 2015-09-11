define(['zepto', 'iscroll','plus'], function(undefined,undefined,plus) {
    window.$ = Zepto;
    var cartNum = 1;
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
            var list = '<div class="listWrap">'
            for (var i = 0; i < 8; i++) {
                list += '<a href="javascript:;"><img src="/images/p-size.png"/></a>'
            };
            list += '</div>';
            var tpls = '<section class="sm_wrap">'+
                '<div class="c">'+
                    '<p>科学的电磁炮 炮姐御坂美琴 海滩边手办</p>'+
                    '<dl class="co"><dt>颜色:</dt><dd class="listC">'+list+'</dd></dl>'+
                    '<dl class="num"><dt>数量:</dt><dd class="numdd" id="jisuan"></dd></dl>'+
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
            $('.listWrap').width(8*64);


            sideScroll = new IScroll('.listC', {
                scrollX: true,
                scrollY: false,
                bounceTime: 400,
                click: true
            });

            plus.init('jisuan');
        } else {
            $('.sm_wrap,.sm_mask').show();
        }
        oMask.openMask();
        $('.sm_wrap').css('bottom', -document.body.scrollTop);
    }

    function bindEvents() {
        var $mask = $('.sm_mask'),
            $wrap = $('.sm_wrap');

        $('.co').find('a').first().addClass('cur').siblings().removeClass('cur');

        $mask.off('tap').on('tap', function(e) {
            e.stopPropagation();
            $(this).hide();
            $wrap.css('bottom', -220).hide();
            oMask.hideMask();
            plus.reset('jisuan');
            sideScroll.scrollTo(0,0);
            console.log(cartNum)

            // 创建事件
            var evt = document.createEvent('Event');
            // 定义事件类型
            evt.initEvent('customEvent', true, true);
            document.dispatchEvent(evt);

            // document.addEventListener('customEvent', true, false);

        });
        $('.co').on('tap','a',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });

        $wrap.off('tap').on('tap','.d3',function(){
            cartNum++;
            $mask.trigger('tap');
        })
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
        },
        getCartNum : function(){
            return cartNum
        }
    }
});
