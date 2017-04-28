// snippet for animating single letters in a heading in a block of text

// works by wrapping target element into spans, which represent single lines
// letters animate on scroll, when scrolled to the target block

let code = {

    elements: {
        contentBlocks: $('.target-block'),
        contentBlockFirst: $('.target-block--top'), // animated on page load
    },

    init: function () {
        var that = this;

        this.elements.contentBlocks.each(function () {
            that.wrapHeaderLetters($(this));
        });

        this.showInitialText();

        $(window).on('scroll.animate-text', that.scrolling.bind(this));
    },

    wrapHeaderLetters: function ($block) {
        var $this = $block.find(':header'),
            $lineSpans = $this.find('.line-span'), // mandatory line-wrapper for each line of text
            chars,
            $currentSpan;

        $.each($lineSpans, function (i, el) {
            $currentSpan = $(el);
            chars = $currentSpan.text().split('');

            $currentSpan.empty();
            $.each(chars, function (i, el) {
                $currentSpan.append('<span class="char-mask">' + el + '</span>');
            });
        });
    },

    showInitialText: function () {
        var charsLength = this.elements.contentBlockFirst.find('.char-mask').length,
            speed = Math.round(500 / charsLength),
            that = this,
            i;

        this.elements.contentBlockFirst.find(':heading').removeClass('h_hidden'); // heading not visible on page load

        for (i = 1; i <= charsLength; i++) {
            (function (i) {
                setTimeout(function () {
                    that.elements.contentBlockFirst.find('.char-mask:nth-child(' + i + ')').addClass('appear');
                }, speed * i);
            })(i);
        }
    },

    scrolling: function () {
        var documentHeight = $(document).height(),
            scrolledHeight = $(document).scrollTop(),
            windowHeight = $(window).height(),
            combinedHeight = scrolledHeight + windowHeight;

        this.elements.contentBlocks.not('.landing-block--top').each(function () {
            var $this = $(this);

            if (combinedHeight >= $this.offset().top + $this.height()) {
                var charsLength = $this.find('.char-mask').length,
                    speed = Math.round(500 / charsLength),
                    i;

                for (i = 1; i <= charsLength; i++) {
                    (function (i) {
                        setTimeout(function () {
                            $this.find('.char-mask:nth-child(' + i + ')').addClass('appear');
                        }, speed * i);
                    })(i);
                }
            }
        });

        if (scrolledHeight >= documentHeight - windowHeight - 100) {
            $(window).off('scroll.animate-text');
        }
    }
};