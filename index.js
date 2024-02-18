const boxcheck = document.querySelector('.box-check');
const listpark = document.querySelector('.list-park');
let chek = [];

const createElement = (tag, type=null, idstart=null, classNam) => {
    let elem = document.createElement(tag);
    if(type){
        elem.type = type;
    }
    if(idstart){
        elem.id = 'c' + idstart + '' + chek.length;
    }
    elem.className = classNam;
    return elem;
}

for(let i = 1; i < 7; i++){
    let item = createElement('div', null , i, 'chekItem')
    item.style.left = i * 200 + 'px'
    item.textContent = 'Задача' + i;
    boxcheck.append(item);

    let obj = {
        "id" : item.id,
        "top" : item.getBoundingClientRect().top,
        "left" : item.getBoundingClientRect().left
    }

    chek.push(obj)
}

for(let i = 0; i < 6; i++){
    let item = createElement('div', null , i, 'listBox')
    item.style.left = i * 230 + 'px'
    item.style.top = 200 + 'px'
    boxcheck.append(item);
}

const checkAll = document.querySelectorAll('.chekItem');
const listBoxAll = document.querySelectorAll('.listBox');


boxcheck.onmousedown = (elem) => {

    if(elem.button == 0 && elem.target.className == 'chekItem'){
        // Смещение
        // let shX = elem.target.getBoundingClientRect().left - elem.pageX;
        // let shY = elem.target.getBoundingClientRect().top - elem.pageY;

        document.onmousemove = (e) => {
            elem.target.style.borderStyle = 'dashed';
            elem.target.style.zIndex = 999; 
            elem.target.style.left = `${e.pageX - 50}px`;
            elem.target.style.top = `${e.pageY - 50}px`

            listBoxAll.forEach((item) => {
                item.style.borderStyle = 'dashed';
                item.style.borderRadius = '30px';
                item.style.backgroundColor = 'beige';
            })  
        }
    }
}

boxcheck.onmouseup = (elem) => {

    document.onmousemove = null; 

    chek.forEach((item, index) => {
        if(item.id == elem.target.id){

            chek[index].left = elem.target.getBoundingClientRect().left;
            chek[index].top = elem.target.getBoundingClientRect().top;

        };
    });

    const moveLeft = elem.target.getBoundingClientRect().left;
    const moveTop = elem.target.getBoundingClientRect().top;

    // (Нижний край высота){нижний край длина}
    // (Верхний край высота){верхний край длина}
    // 100 - это размер фигуры, считается в итоге в px
    chek.forEach((item, index) => {

        if(item.top <= moveTop && item.top + 100 >= moveTop && item.id != elem.target.id){

            if(item.left <= moveLeft && item.left + 100 >= moveLeft && item.id != elem.target.id){
                const staticElem = document.querySelector(`#${item.id}`);
                console.log('Правый бок', item.top, moveTop)
                console.log('Статичный элемент', staticElem.textContent, 'Элемент который на его налетел', elem.target.textContent)
                alert(`'Статичный элемент': ${staticElem.textContent}; \n 'Элемент который на его налетел': ${elem.target.textContent}`);
            }

            if(moveLeft <= item.left && moveLeft + 100 >= item.left && item.id != elem.target.id){
                const staticElem = document.querySelector(`#${item.id}`);
                console.log('Левый бок')
                console.log('Статичный элемент', staticElem.textContent, 'Элемент который на его налетел', elem.target.textContent)
                alert(`'Статичный элемент': ${staticElem.textContent}; \n 'Элемент который на его налетел': ${elem.target.textContent}`);
            }
        }

        if(item.top >= moveTop && item.top <= moveTop + 100 && item.id != elem.target.id){

            if(item.left <= moveLeft && item.left + 100 >= moveLeft && item.id != elem.target.id)
                {
                const staticElem = document.querySelector(`#${item.id}`);
                console.log('Правый бок', item.top, moveTop)
                console.log('Статичный элемент', staticElem.textContent, 'Элемент который на его налетел', elem.target.textContent)
                alert(`'Статичный элемент': ${staticElem.textContent}; \n 'Элемент который на его налетел': ${elem.target.textContent}`);
            }

            if(moveLeft <= item.left && moveLeft + 100 >= item.left && item.id != elem.target.id){
                const staticElem = document.querySelector(`#${item.id}`);
                console.log('Левый бок')
                console.log('Статичный элемент', staticElem.textContent, 'Элемент который на его налетел', elem.target.textContent)
                alert(`'Статичный элемент': ${staticElem.textContent}; \n 'Элемент который на его налетел': ${elem.target.textContent}`);
            }
        }

    })
    
    elem.target.style.borderStyle = 'none';     

    listBoxAll.forEach((item) => {
        item.style.borderStyle = 'none';    
        item.style.borderRadius = '0px';
        item.style.backgroundColor = '';

        item.style.width = '150px';
        item.style.height = '150px';
        item.style.border = '1px solid';
    })  
}
