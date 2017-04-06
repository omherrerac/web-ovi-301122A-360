//width & height Static Browser
var windowWidth=$( window ).width();
var windowHeight=$( window ).height();

//LOAD
$( document ).ready(function() {
    //load body
    $( "body" ).animate({
        opacity: 1
    }, 1000 );

    //owl carousel
    if( $("#sliderHome").length || $("#sliderArticle").length ){
        $('#sliderHome, #sliderArticle').owlCarousel({
            nav:true,
            dots: false,
            autoplay:true,
            loop:true,
            autoplayTimeout:4000,
            autoplayHoverPause:true,
            animateOut: 'slideOutLeft',
            animateIn: 'slideInRight',
            margin:0,
            stagePadding:0,
            smartSpeed:450,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });
    }

    // Fancybox //
    $(function() {
        if( $(".fancyPdf").length || $(".fancyImage").length ){
            //pdf
            $(".fancyPdf").click(function() {
                $.fancybox({
                    padding: 5,
                    width: 800, 
                    height: 607,
                    autoSize: false,
                    openEffect  : 'elastic',
                    openSpeed   : 'normal',
                    openEasing  : 'easeOutBack',
                    closeEffect : 'elastic',
                    closeSpeed  : 'normal',
                    closeEasing : 'easeInBack',
                    closeClick  : true,
                    content: '<embed src="'+this.href+'#nameddest=self&page=1&view=FitH,0&zoom=80,0,0" type="application/pdf" height="99%" width="100%" />',
                    onClosed: function() {
                        $("#fancybox-inner").empty();
                    }
                });
                return false;
            }); 

            //image
            $(".fancyImage").fancybox({
                'transitionIn'  :   'elastic',
                'transitionOut' :   'elastic',
                'speedIn'       :   600, 
                'speedOut'      :   200, 
                'overlayShow'   :   false,
                'titlePosition'  : 'inside'
            });
        }
    });

    //accordion
    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);
});
//END

//validate fields isNumeric
$(".number").keyup(function () {
    this.value = (this.value + '').replace(/[^0-9]/g, '');
});

//set value checkbox
$('input[type=checkbox]').each(function(e){
    var obj = $(this);
    $.fn.hasAttr = function(name) {  
       return this.attr(name) !== undefined;
    };

    if( obj.hasAttr('checked') ){
        obj.attr('value','1');
    }else{
        obj.attr('value','');
    }
    obj.click(function(){
        if( obj.prop('checked') || !obj.attr('value').length ){
            obj.attr('value','1');
        }else{
            obj.attr('value','');
       }
   }); 
});


//fixed scroll menu
function fixedScrollMenu(width){
    if(width >= 768){
        $(window).scroll(function(){
            if ($(window).scrollTop() > 164) {
                $('body').addClass('fixedHeader');
            }else{
                $('body').removeClass('fixedHeader');
            }
        });
    }else{
        $('body').removeClass('fixedHeader');
    }
}//fixed scroll menu
fixedScrollMenu(windowWidth);


/* detail Article */
//toggle doc list
$('.detailArticle .firstText a').click(function(){
    $('.detailArticle .toggle').slideToggle('slow');
});

//CONTACT FORM
jQuery(function() {
    jQuery(document).on('submit', '#frmContact', function(event) {  
        event.preventDefault();
        var 
            fullname = jQuery("#fullname").val(),
            emailContact = jQuery("#emailContact").val(),
            subject = jQuery("#subject").val(),
            department = jQuery("#department0").val(),
            city = jQuery("#city0").val(),
            mobile = jQuery("#mobile").val(),
            msg = jQuery("#msg").val(),
            termsContact = jQuery("#termsContact").val()
        ;
        if( fullname=='' || city=='' || emailContact==''  || subject=='' || department=='' || mobile=='' || msg=='' || termsContact != 1 ){
            alertify.alert("<strong>Existe un inconveniente!</strong><br/> Debe completar los campos requeridos!");
            return false;
        }else{
            jQuery.ajax({
                type: "POST",
                dataType: "json",
                url: base_url+'sendMail/sendContac.php?pathUrl='+base_url,
                data: jQuery("#frmContact").serialize(),
                cache: false,
                success: function(result){
                    //alert(result);
                    if( result == 1 ){
                        jQuery('#frmContact').each (function(){  this.reset(); });
                        alertify.alert("<strong>Perfecto!</strong><br/> Sus datos se enviaron correctamente.");
                    }else{
                        jQuery('#frmContact').each (function(){  this.reset(); });
                        alertify.alert("<strong>Error!</strong><br/> Sus datos no se enviaron.");
                    }  
                },
                error: function() {
                    alertify.alert("<strong>Error!</strong><br/> Se ha perdido su conexión. Inténtelo nuevamente.");
                }
            }); 
        }       
        return false;
    });                                     
});



//**** RESIZE**************************************************************************************************************************************************************
//resizeBrowser
$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 100);
});

//**** BIND RESIZE*********************************************************************************************************************************************************
$(window).bind('resizeEnd', function() {
    //fixed scroll menu
    fixedScrollMenu($(this).width());
});