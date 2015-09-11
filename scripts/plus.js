define(function() {

    function initialize(id){

        var tpl = '';
        tpl += '<div class="pluscontainer"><span class="cut op dis">-</span><input class="op mid"  value="1" /><span class="plus op">+</span></div>';
        $('#'+id).append(tpl);
        abindEvents(id);
    }

    function abindEvents(id) {
        var $input = $('#'+id).find('.mid');
        var nums = parseInt($input.val(),10);
        var yangshi = '';
        $('#'+id).on('tap','.plus',function(){
            nums++;
            $input.val(nums);
            $('#'+id).find('.cut').removeClass('dis');
        });
        $('#'+id).on('tap','.cut',function(){
            nums--;
            if(nums <= 1){
                $(this).addClass('dis');
            }
            nums = nums < 1 ? 1 : nums;
            $input.val(nums);
            
        });
    }   

    return {

        init: function(id) {
            initialize(id);
        }
    }
});
