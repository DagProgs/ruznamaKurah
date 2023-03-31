// our share button in the markup
const shareButton = document.getElementById('share');

// create share data object
const shareData = {
  title: 'Рузнама',
  text: 'Рузнама-Курахский район',
  url: 'https://dagprogs.github.io/ruznamaKurah/' // reffers to the current page
};

// click event handler is necessary to call navigator.share()
shareButton.addEventListener('click', async () => {
  // does the browser supports the feature?
  if(navigator.share) {
    try {
      await navigator.share(shareData);
      console.log('🥳 Shared via API.');
    } catch(error) {
      console.log(`😢 ${error}`);
    }
  } else {
    // you could do a fallback solution here ... 
    console.log('😢 Your browser does not support the web share api.')
  }
})

