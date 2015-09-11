requirejs.config({
    paths: {
        zepto: 'lib/zepto',
        touch: 'lib/touch',
        iscroll: 'lib/iscroll-lite'
    }
});

requirejs(['zepto','pop'], function(undefined,pop) {
	$('.p-choose').on('tap',function(){
		pop.init();
	});
});
