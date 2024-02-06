const nextIcon = document.querySelector('.next');
const pervIcon = document.querySelector('.prev');
const imageContainer = document.querySelector('.imageContainer');
const imgs = document.querySelectorAll('img');

let currentImg = 1;
let timeout;

nextIcon.addEventListener('click',() => {
    currentImg++;
    clearTimeout(timeout);
    updateImg();
});

pervIcon.addEventListener('click',() => {
    currentImg--;
    clearTimeout(timeout);
    updateImg();
});

function updateImg(){
    if(currentImg > imgs.length){
        currentImg = 1;
    }
    else if(currentImg < 0)
    {
        currentImg = imgs.length
    }
    imageContainer.style.transform = `translateX(-${(currentImg-1)*700}px)`;
    timeout = setTimeout(()=>{
        currentImg++;
        updateImg();
    },4000)
}

updateImg()

