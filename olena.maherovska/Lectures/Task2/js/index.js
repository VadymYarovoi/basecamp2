new WOW().init();


$(function() {

    $('.smooth').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 2000);
        }
    });

});

(function() {
    $(function() {
        $('#submit').click(function(e) {
            if ($('#name').val().match(/[A-ZА-ЯЁ]+/i) && $('#email').val().match(/^.+@\w+\.\w+$/i)) {
                e.preventDefault();
                $.ajax({
                    url: "https://formspree.io/maher.olena96@gmail.com",
                    method: "POST",
                    data: {
                        name: $('#name').val(),
                        email: $('#email').val(),
                        message: $('#message').val(),


                    },
                    dataType: "json"
                }).done(function() {
                    $('form').html('<p class="contacts">Thank you for contacting me!</p>');
                }).fail(function(xhr) {
                    $('body').append('Sorry, error occured' + xhr.responseText);
                });
            }
        });
    })
})();

