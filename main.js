if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js',{scope:'./'})
  .then(succ=>{console.log(`registered ${succ}`)})
.catch(err=>{console.log(`error ${err}`)})
}else{console.log('browser not support')}
