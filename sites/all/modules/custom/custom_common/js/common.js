(function ($) {
  Drupal.behaviors.customCommon =  {
    attach: function(context, settings) {
       var countlink = settings.basePath+ 'update_cart';
       
       $.getJSON(countlink,function(data) {
          $('#secondary-menu-links li.cart').html(data.count);
        });
       /*
       $('.commerce-add-to-cart .form-submit').bind('click',function(){
          $.getJSON(countlink,function(data) {
            $('#secondary-menu-links li.cart').html(data.count);
          }); 
       });
       */
    }
 }; 
})(jQuery);
