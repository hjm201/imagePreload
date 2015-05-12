
;(function ($) {
 
  $.imageloader = function(userOptions) {
 
    var options = $.extend({
      urls: [],
      onComplete: function() {},
      onUpdate: function(ratio, image) {},
      onError: function(err) {}
    }, userOptions);
    
    var loadCount = 0,
        completedUrls = [],
        urls = options.urls,
        len = urls.length;

    $.each(urls, function(i, item) {
      var img = new Image();
      img.src = item;
      img.onerror = function() {
        loadCount++;
        options.onError('Error loading image: ' + item);
        options.onUpdate(loadCount/len, urls[loadCount-1]);
        if (loadCount === len) options.onComplete();
      };
      $('<img/>').attr('src', item).load(function(res) {
        loadCount++;
        options.onUpdate(loadCount/len, urls[loadCount-1]);
        if (loadCount === len) options.onComplete();
      });
    });

  };
 
})(jQuery);

