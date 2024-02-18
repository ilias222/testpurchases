// константы кликабельных объектов

const moneyBox = document.querySelector('.colls_rows');
const itemsBox = document.querySelector('.colls_item');

const childAllMoney = document.querySelectorAll('.money');
const childAllItems = document.querySelectorAll('.items');

const clearPressMoney = document.querySelector('.clear_money');
const clearPressItems = document.querySelector('.clear_items');

// const listTag = document.querySelector('.chek_list');

const pressSaweShek = document.querySelector('.press_sours');

const formChech = document.querySelector('.list_check');

const formCheckList = document.querySelector('.list_check');

// Глобальные переменные
let arrObj = [];
let fullMoney = 0;
let fullItems = 0;
let fullSheck = '';
let idChildSheck = 0;
let i = 0;
let mins = 0;
let renderChech = '';
let positionCheck = 0;

// выбор суммы и количества

moneyBox.addEventListener('click', (e) => {

    if(e.target.classList[1] == 'money'){
        if(e.target.textContent == '9' ){
            e.target.textContent = 0;
        } else {
            e.target.textContent = Number(e.target.textContent) + 1;
        }
    }
});

itemsBox.addEventListener('click', (e) => {

    if(e.target.classList[1] == 'items'){
        if(e.target.textContent == '9' ){
            e.target.textContent = 0;
        } else {
            e.target.textContent = Number(e.target.textContent) + 1;
        }
    }
})

// очистка суммы и количества
const clears = (iterableObj) => {
    iterableObj.forEach((item) =>{
        item.classList[1] ? item.textContent = 0 : false;
    });
}


clearPressMoney.addEventListener('click', (e) =>{
    e.preventDefault();

    clears(childAllMoney);
});

clearPressItems.addEventListener('click', (e) =>{
    e.preventDefault();

    clears(childAllItems);
});

// Запись чека

pressSaweShek.addEventListener('click', (e) =>{
    e.preventDefault();

    fullMoney = 0;
    fullItems = 0;

    childAllMoney.forEach((item) =>{
        fullMoney += `${item.textContent}`;
    });

    childAllItems.forEach((item) =>{
        fullItems += `${item.textContent}`;
    });

    idChildSheck = arrObj.length + 1;

    if (Number(fullMoney) && Number(fullItems)){
        arrObj.push({
            "fullmoney" : Number(fullMoney), 
            "items": Number(fullItems),
            "money":  Number(fullMoney) / Number(fullItems),
            // "tag" : listTag.value, 
            "id" : 'C_' + idChildSheck + ' chekList'
        });
    } 

    // listTag.value = '';

    //Создаем новый элемент

    const createChesk = (elem, elemArrObj, min = false) => {
        const newElem = document.createElement(elem);
        newElem.className = elemArrObj.id;

        newElem.innerHTML =`
        ${Number(elemArrObj.money).toFixed(2)} &#x20bd шт.
        [цена ${Number(elemArrObj.fullmoney).toFixed(2)} &#x20bd /
        кол-во ${elemArrObj.items}]
        ` 

        if(min){
            newElem.style.padding = '10px';
            newElem.style.textAlign = 'center';
            newElem.style.backgroundColor = 'rgb(175, 255, 175)';
            newElem.className = 'acssept';
        }
        
        return newElem;
    }

        // Узнаем самую маленькую сумму за штуку в массиве, заполняем рендер лист

    const scalle = (arr) => {

        formChech.innerHTML = '';
        document.querySelector('.acssept') ? document.querySelector('.acssept').remove() :
        false;

        arr.forEach((item, index) =>{
            if (arr[index - 1] && Number(item.money) > Number(arr[index - 1].money)) {
                i = Number(arr[index - 1].money);
                mins = arr[index - 1];
            } else {
                i = Number(item.money);
                mins = item;
            }
    
            formChech.append(createChesk('div', item));
        });

        mins? formChech.before(createChesk('div', mins, true)): false;
    };

    scalle(arrObj);

    clears(childAllItems);
    clears(childAllMoney);


    // Удаление записей из списка
    formCheckList.ontouchdown = (elem) => {

        if(elem.target.classList[1] == 'chekList'){

            positionCheck = elem.target.getBoundingClientRect().left;

                document.ontouchmove = (e) => {
                    elem.target.style.position = 'absolute';
                    elem.target.style.userSelect = 'none';
                    elem.target.style.zIndex = 999; 
                    elem.target.style.left = `${e.pageX}px`; 
                }

        }
    }
    
    formCheckList.ontouchup = (elem) => {
        document.ontouchmove = null;
        if(positionCheck + 10 > elem.target.getBoundingClientRect().left){
            // elem.target.style.left = positionCheck + 'px';
            elem.target.style.position = 'static';
        } else{
            let newArr = [];
            arrObj.filter((e, index) => {
                if(e.id !=elem.target.className){
                    newArr.push(e);
                } else{
                    delete arrObj[index]
                };
            });
            scalle(newArr);
            elem.target.remove();
            
        }
    }
    

});

