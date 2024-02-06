const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input') //.search class değeri altında yer alan input değeri anlamına gelmektedir.


const generateTemplate = todo =>{
    list.innerHTML += `<li class="list-group-item d-flex justify-content-between aling-items-center">
                        <span>${todo}</span>
                        <i class="far fa-trash-alt delete"></i>
                        </li>`;                 
}


addForm.addEventListener('submit',e =>{
    e.preventDefault();
    const todo = addForm.add.value.trim();
    console.log(todo);
    if(todo.length)
    {
        generateTemplate(todo);
        addForm.reset();
    }
    else
    {
        alert('Boş Görev Eklenemez')
    }
    
})

list.addEventListener('click', e=>{
    if(e.target.classList.contains('delete'))
    {
        e.target.parentElement.remove();
    }
})


const filterTodos = (term) =>{
    // console.log(list.children);
    // console.log(Array.from(list.children));
    Array.from(list.children)
    .filter(todo => !todo.textContent.toLocaleLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter(todo => todo.textContent.toLocaleLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
}


search.addEventListener('keyup',()=>{
    const term = search.value.trim().toLowerCase();
    console.log(term);    
    filterTodos(term);
})


