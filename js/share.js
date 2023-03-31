$('#answer-example-share-button').on('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Рузнама',
                    text: 'Рузнама-Курахский район',
                    url: 'https://dagprogs.github.io/ruznamaKurah/',
                })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error));
            } else {
                console.log('Share not supported on this browser, do it the old way.');
            }
        });