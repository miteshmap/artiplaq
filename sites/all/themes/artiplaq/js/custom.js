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
    }
  };
})(jQuery);