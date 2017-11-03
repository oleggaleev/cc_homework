var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
    "Z"
].join('').toUpperCase().split('')
var words = ['ruby', 'javascript', 'closure', 'promise', 'protocol', 'python', 'mastersteve', 'express', 'association', 'dependent', 'database', 'pork', 'github', 'initialization', 'chosen', 'variable', 'argument', 'callback', 'parameter'];
var secretword = words[Math.floor(Math.random() * words.length)].toUpperCase().split('')
var letterlength = secretword.length
var wrongguesses = []
var lifeline = 4;
var imageIndex = 1;
var images = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png']
$(document).ready(function() {
    $.each(secretword, function(i, val) {
        $('#answer').append($(`<p class="hidden underscore" id='${val}'>` + val + '</p>'));
    })
    $.each(alphabet, function(index, value) {
        $('.letters').append($(`<p class="letter bb" id="${value}">` + value + `</p>`))
    })
    $('.letter').one('click', function(event) {
        if (secretword.includes($(this).html())) {
            $(this).removeClass('bb').addClass('right bon')
            $(`.answers>#${$(this).text()}`).removeClass('hidden').addClass('rightguess')
        } else if (wrongguesses.length <= lifeline) {
            $(this).removeClass('bb').addClass('highlight bon')
            wrongguesses.push($(this).html())
            $('.hangman').css('background-image', `url(${images[imageIndex]})`)
            imageIndex++;
        } else {
            $('.hangman').css('background-image', `url(${images[6]})`)
            alert(`You lost! the answer was "${secretword.join('')}"`)
            location.reload();
        }
        if (!$('#answer>p').hasClass('hidden')) {
          alert(`You Won! Congrats!`)
            location.reload();
        }
    })

    $('.letter').mouseenter(function(){
      $(this).addClass('highlight')
    })
    $('.letter').mouseleave(function(){
      $(this).removeClass('highlight')
    })

})
