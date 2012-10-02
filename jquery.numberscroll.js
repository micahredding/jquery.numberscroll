(function ($) {

zeroFill = function(text, length) {
  text = text.toString();
  if (text.length >= length) {
    return text;
  } else {
    empties = length - text.length;
    holder = new Array(empties + 1);
    zeros = holder.join("0");
    text = zeros + text;
    return text;
  }
}

var methods = {
  init : function (options) {
    defaultoptions = {
      lowerlimit : 0,
      upperlimit : 99,
      length:2,
    };
    options = $.extend({}, defaultoptions, options);

    upperlimit = options['upperlimit'];
    lowerlimit = options['lowerlimit'];
    length = options['length'];

    return this.each(function(){
      $(this).data('upperlimit',upperlimit);
      $(this).data('lowerlimit',lowerlimit);
      $(this).data('length',length);
      $(this).bind('keydown.numberScroll', methods.keyprocess);
    });

  },
  destroy : function( ) {
    return this.each(function(){
      $(this).unbind('.numberScroll');
    })
  },  
  keyprocess : function (event) {
    target = event.currentTarget;
    if (event.which == 38) {
      methods.increment(target);
    } else if (event.which == 40) {
      methods.decrement(target);
    }
  },
  crement : function (target, step) {
    upperlimit = $(target).data('upperlimit');
    lowerlimit = $(target).data('lowerlimit');
    length = $(target).data('length');

    value = $(target).val();

    starting = parseInt(value);

    if(starting < lowerlimit) {
      starting = upperlimit;
    } else if (starting > upperlimit) {
      starting = lowerlimit;
    }

    result = starting + step;

    if(result < lowerlimit) {
      result = upperlimit;
    } else if (result > upperlimit) {
      result = lowerlimit;
    }

    result = zeroFill(result, length);

    $(target).val(result);

  },
  increment : function (target) {
    methods.crement(target, 1);
  },
  decrement : function (target) {
    methods.crement(target, -1);
  },
};

$.fn.numberScroll = function (method) {
  // Method calling logic
  if ( methods[method] ) {
    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
  } else if ( typeof method === 'object' || ! method ) {
    return methods.init.apply( this, arguments );
  } else {
    $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
  }     
};

})(jQuery);