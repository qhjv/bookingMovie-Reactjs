import $ from "jquery"
$(window).on("scroll",function(){
        
    if($(this).scrollTop() >90){
        $(".scrollTop").addClass("scroll_on")
    }else {
        setTimeout(function(){
        
            $(".scrollTop").removeClass("scroll_on")
        },100)
        
    }
})
