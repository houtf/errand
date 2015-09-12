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
                    '<p>SK-II护肤精华露</p>'+
                    '<dl class="co"><dt>型号:</dt><dd class="listC">'+list+'</dd></dl>'+
                    '<dl class="num"><dt>数量:</dt><dd class="numdd" id="jisuan"></dd></dl>'+
                '</div>'+
                '<div class="d">'+
                    '<span class="d1">距离5.2KM</span>'+
                    '<a class="d2" href="self_buy.html">自己去</a>'+
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
        // $('.sm_wrap').css('bottom', -document.body.scrollTop);
        $('.sm_wrap').css('bottom', 0);
    }

    function bindEvents() {
        var $mask = $('.sm_mask'),
            $wrap = $('.sm_wrap');

        $('.co').find('a').first().addClass('cur').siblings().removeClass('cur');

        $mask.off('click').on('click', function(e) {
            e.stopPropagation();
            $(this).hide();
            $wrap.css('bottom', -220).hide();
            // $wrap.hide();
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
        $('.co').on('click','a',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });

        $wrap.off('click').on('click','.d3',function(){
            cartNum++;
            $mask.trigger('click');
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
