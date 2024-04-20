const menuToggle=document.getElementById("menuToggle"),menu=document.querySelector(".menu");let isOpen=!1,isAnimating=!1,startTouchX;document.addEventListener("touchstart",function(e){startTouchX=e.touches[0].clientX}),document.addEventListener("touchmove",function(e){let t=e.touches[0].clientX;t<startTouchX-50?"0px"===menu.style.left&&(menu.style.left="-80%",menuToggle.style.transform="translateX(0)",menuToggle.querySelector("svg").style.fill="#000",isOpen=!1):t>startTouchX+50&&"-80%"===menu.style.left&&(menu.style.left="0",menuToggle.style.transform="translateX(0)",menuToggle.querySelector("svg").style.fill="#fff",isOpen=!0);let l=isOpen?`
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 18l-6-6 6-6" fill="#003066"/>`:`
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2z" fill="#003066"/>
                <path d="M3 13h18v-2H3v2z" fill="#003066"/>
                <path d="M3 6v2h18V6H3z" fill="#003066"/>`;menuToggle.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${l}</svg>`}),menuToggle.addEventListener("click",function(){if(!isAnimating){isOpen=!isOpen,isAnimating=!0;let e=isOpen?`
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 18l-6-6 6-6" fill="#003066"/>`:`
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2z" fill="#003066"/>
                <path d="M3 13h18v-2H3v2z" fill="#003066"/>
                <path d="M3 6v2h18V6H3z" fill="#003066"/>`;menuToggle.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${e}</svg>`,menu.style.left=isOpen?"0":"-80%",menuToggle.style.transform="translateX(0)",menuToggle.querySelector("svg").style.fill=isOpen?"#fff":"#000",setTimeout(()=>{isAnimating=!1},300)}});