jQuery.fn.extend({
    onAppearanceApply: function(f) {
        var $window = $(window),
            window_height = $window.height(),
            array_of_$elements = [];
        this.each(function(i, el) {
            array_of_$elements.push($(el));
        })
        scrollHandler();
        if (array_of_$elements.length) {
            $window.on('resize', resizeHandler).on('resize', scrollHandler).on('scroll', scrollHandler);
        }

        function resizeHandler() {
            window_height = $window.height();
        }

        function watchProcessedElements(array_of_indexes) {
            var l, i;
            for (l = array_of_indexes.length, i = l - 1; i > -1; --i) {
                array_of_$elements.splice(array_of_indexes[i], 1);
            }
            if (!array_of_$elements.length) {
                $window.off('resize', resizeHandler).off('scroll', scrollHandler).off('resize', scrollHandler);
            }
        }

        function scrollHandler() {
            var i, l, processed = [];
            for (l = array_of_$elements.length, i = 0; i < l; ++i) {
                if ($window.scrollTop() + window_height > array_of_$elements[i].offset().top) {
                    f.call(array_of_$elements[i]);
                    processed.push(i);
                }
            }
            if (processed.length) {
                watchProcessedElements(processed);
            }
        }
        return this;
    }
})

var color_options = {
    luminosity: 'bright'
};

$('.skillbar').onAppearanceApply(animate);


function animate() {
    var percent = parseInt(this.data('percent')),
        transition_element = this.find('.skillbar-container'),
        span = this.find('.skillbar-percent');

    this.find('.skillbar-bar').css({
        width: percent + '%',
        'background-color': 'orange'
    });
    $({
        value: 0
    }).animate({
        value: percent
    }, {
        duration: parseFloat(transition_element.css('transition-duration')) * 1000,
        easing: transition_element.css('transition-easing'),
        step: function(val) {
            span.text(~~val + '%');
        }
    })
    this.addClass('active');
}