requirejs.config({
    paths: {
        zepto: 'lib/zepto',
        iscroll: 'lib/iscroll-lite'
    }
});

requirejs(['zepto','pop'], function(undefined,pop) {
	$('.p-choose,.addToCart').on('click',function(){
		pop.init();
	});


	document.addEventListener('customEvent', function(e){
	    var cartNum = pop.getCartNum();
	    $('#numsOfCart').text(cartNum);
	}, false);
	
});
