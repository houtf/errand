define(function() {

    function initialize(id){

        var tpl = '';
        tpl += '<div class="pluscontainer"><span class="cut op dis">-</span><input class="op mid"  value="1" /><span class="plus op">+</span></div>';
        $('#'+id).append(tpl);
        abindEvents(id);
    }

    function abindEvents(id) {
        var $input = $('#'+id).find('.mid');
        
        var yangshi = '';
        $('#'+id).on('tap','.plus',function(){
            var nums1 = parseInt($input.val(),10);
            nums1++;
            $input.val(nums1);
            $('#'+id).find('.cut').removeClass('dis');
        });
        $('#'+id).on('tap','.cut',function(){
            var nums2 = parseInt($input.val(),10);
            nums2--;
            if(nums2 <= 1){
                $(this).addClass('dis');
            }
            nums2 = nums2 < 1 ? 1 : nums2;
            $input.val(nums2);
            
        });
    }   

    return {

        init: function(id) {
            initialize(id);
        },
        reset: function(id){
            $('#'+id).find('.mid').val('1');
        }
    }
});
