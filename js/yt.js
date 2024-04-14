const player = new Plyr('#player', {
    invertTime: false,
});

$(document).ready(function() {
    // Установка источника видео для плеера
    let youtubeurl = 'https://www.youtube.com/watch?v=' + $('#player').attr('data-plyr-embed-id');
    player.source = {
        type: 'video',
        sources: [
            {
                src: youtubeurl,
                provider: 'youtube'
            }
        ]
    };

    // Автоматическое воспроизведение видео
    window.setTimeout(function() {
        player.play();
    }, 1000);

    // Переключение на следующее видео по окончанию текущего    
    player.on('ended', event => {
        // Ваш код для переключения на следующее видео
    });
});
