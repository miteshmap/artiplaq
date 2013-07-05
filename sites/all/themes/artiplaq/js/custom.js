(function ($) {
  Drupal.behaviors.customArtiplaq =  {
    attach: function(context, settings) {
      
      if (!$('.image-preview').is(':empty')){
        var imagepreview = $('.image-preview').html();
        $('#mounted-photos-image-preview').html(imagepreview);
      }
      
      $('#naticalchartzoon').addpowerzoom({
        distanceFromTheTop: 0,
        magnifiersize: [345, 240],
      });
      
      $('select[name^="line_item_fields[field_united_inch]"]').bind('change',function(){
          
          var w = $("#field-hidden-image .field-name-field-image").find('img').width();
          var h = $("#field-hidden-image  .field-name-field-image").find('img').height();
          var u = $(this).find('option:selected').text();
           
          var width = w * u / (w + h);
          width =  Math.round(width * 100) / 100; 
          var height =  h * u / (w + h);
          height =  Math.round(height * 100) / 100;
          $('#united-inch-size').html(width + '" X ' + height + '"');  
          $('input[name^="line_item_fields[field_print_size]"]').val(width + '" X ' + height + '"');
           
      });
      
    }
  };
})(jQuery);