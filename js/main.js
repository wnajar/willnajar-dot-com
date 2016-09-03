$(document).ready(function() {

    //centering functions
    jQuery.fn.just_above_center = function () {
        this.css("position","absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop() - 50) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }
    jQuery.fn.center = function () {
        this.css("position","absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }

    //initialization of page
    $('#header-container').just_above_center().fadeIn(1000);
    $('header, main > section').css('min-height', $(window).height());
    $('#next-page, #previous-page').css('line-height', $(window).height() - 40 + 'px');

    //array of page indices and classes
    var index = {
        '1': 'about-me',
        '2': 'what-i-do',
        '3': 'contact'
    };

    //change things to fit if we resize the window
    $(window).resize(function() {
        $('#header-container').just_above_center();
        $('header, main > section').css('min-height', $(window).height());
        $('#next-page, #previous-page').css('line-height', $(window).height() - 40 + 'px');
        var state = $('html').attr('data-state');
        $('section#' + index[state] + ' div.section-container').just_above_center();
    });

    //navigation from the header
    $('header nav ul li').click(function() {
        var target = $(this).attr('class');
        $('html').attr('data-state', $('section#' + target).data('index'));
        $('header').hide();
        $('main, section#' + target).show();
        $('section#' + target + ' div.section-container').just_above_center().fadeIn(1000);
        $('#navigation').fadeIn();
        if ($('html').attr('state') == 7) {
            $('#previous-page').fadeIn();
        } else {
            $('#previous-page, #next-page').fadeIn();
        }
    });

    //navigation from the nav bar
    $('#navigation nav ul li').click(function() {
        var target = $(this).attr('class');
        var state = parseInt($('html').attr('data-state'));
        if (target == 'home') {
            //we're going to the homepage
            $('section#' + index[state] + ', #previous-page, #next-page, main, #navigation').hide();
            $('header').show();
            $('#header-container').just_above_center().fadeIn(1000);
        } else {
            $('html').attr('data-state', $('section#' + target).data('index'));
            $('section#' + index[state] + ', section#' + index[state] + ' > div.section-container, #previous-page, #next-page').hide();
            $('section#' + target).show();
            $('section#' + target + ' > div.section-container').just_above_center().fadeIn(1000);
            //show nav arrows
            if ($('html').attr('state') == 7) {
                $('#previous-page').fadeIn();
            } else {
                $('#previous-page, #next-page').fadeIn();
            }
            $('html').attr('data-state', $('section#' + target).data('index'));
        }
    });

    //next page
    $('#next-page').click(function() {
        var state = parseInt($('html').attr('data-state'));
        $('section#' + index[state] + ', section#' + index[state] + ' > div.section-container, #previous-page, #next-page').hide();
        var next_index = state + 1;
        console.log('next index is ' + next_index);
        $('section#' + index[next_index]).show();
        $('section#' + index[next_index] + ' > div.section-container').center().fadeIn(1000);
        if (next_index === 7) {
            $('#previous-page').fadeIn();
        } else {
            $('#previous-page, #next-page').fadeIn();
        }
        //update the index
        $('html').attr('data-state', next_index);
    });

    //previous page
    $('#previous-page').click(function() {
        var state = parseInt($('html').attr('data-state'));
        $('section#' + index[state] + ', section#' + index[state] + ' > div.section-container, #previous-page, #next-page').hide();
        var previous_index = state - 1;
        if (previous_index === 0) {
            //we're going to the homepage
            $('section#' + index[state] + ', #previous-page, #next-page, main, #navigation').hide();
            $('header').show();
            $('#header-container').just_above_center().fadeIn(1000);
        } else {
            $('section#' + index[previous_index]).show();
            $('section#' + index[previous_index] + ' div.section-container').center().fadeIn(1000);
            $('#previous-page, #next-page').fadeIn();
            //update the index
            $('html').attr('data-state', previous_index);
        }
    });
});
