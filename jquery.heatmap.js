(function ($) {
    $.fn.extend({
        heatmap: function (options) {
            var defaults = {
                valueClass : 'value',
                low   : [ 255, 255, 255 ],
                high  : [  78, 204, 243 ],
                range : 1
            };

            var options = $.extend(defaults, options);

            var tdSelector = "table#" + this.attr('id') + " tbody td." + options.valueClass;
            var max = Math.max.apply(Math, $(tdSelector).map(function () {
                return parseInt( $(this).text() );
            }).get());

            $(tdSelector).each(function () {
                var calc = function (x, y, n, pos) {
                    return ( x + ((pos * (y - x)) / (n - 1)) ).toFixed(0);
                };

                var pos = ( Math.round( (parseInt($(this).text()) / max) * 100 * options.range) ).toFixed(0);
                var r = calc(options.low[0], options.high[0], 100, pos),
                    g = calc(options.low[1], options.high[1], 100, pos),
                    b = calc(options.low[2], options.high[2], 100, pos);

                var color = 'rgb(' + r + ',' + g + ',' + b + ')';
                $(this).css({backgroundColor : color});
            });

            return this;
        }
    });
})(jQuery);

