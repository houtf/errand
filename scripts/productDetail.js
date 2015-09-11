requirejs.config({
    paths: {
        zepto: 'lib/zepto',
        iscroll: 'lib/iscroll-lite'
    }
});

requirejs(['zepto','pop'], function(undefined,pop) {
	$('.p-choose').on('tap',function(){
		pop.init();
	});
});
