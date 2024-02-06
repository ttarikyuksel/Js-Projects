const correctAnswers  =['E','E','E','E'];
const form = document.querySelector('.question-form');
const result = document.querySelector('.result');


form.addEventListener('submit',e => {
    e.preventDefault(); //Sayfanın yenilenmemesini sağlamakta.
    
    let score = 0;
    const userAnswers = [form.q1.value,form.q2.value,form.q3.value,form.q4.value];

    userAnswers.forEach((answer,index)=>{
        if(answer === correctAnswers[index]){
            score += 25;
        }
    })
    result.classList.remove('d-none');
    let i = 0;
    const bastir = setInterval(() => {
        result.querySelector('span').textContent = `${i}%`;
        if(i == score){
            clearInterval(bastir)
        }
        else
        {
            i++;
        }
    },10);
})

// setTimeout(() => {
//     console.log('Tarık');
// },2000);

// setInterval(() => {
//     console.log('Tarık');
// },2000);

// let i = 0;
// const bastir = setInterval(() => {
//     console.log('Tarık');
//     i++;
//     if(i == 4){
//         clearInterval(bastir)
//     }
// },2000);