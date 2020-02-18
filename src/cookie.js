/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

loadCookieList(cookieParser());

filterNameInput.addEventListener('keyup', ()=>{
    loadCookieList(cookieParser().filter(cookie=>cookieFilter(cookie)))
});

addButton.addEventListener('click', ()=>{
    if (!cookieParser().map(cookie=>cookie.name).includes(addNameInput.value) && 
        cookieFilter({
            name: addNameInput.value, 
            value: addValueInput.value
        })) {
        listTable.append(newCookieLine({
            name: addNameInput.value, 
            value: addValueInput.value
        }));
    } else {
        let cookieEl = listTable.querySelector(`tr[data-cookie="${addNameInput.value}"]`);

        if (cookieEl) {
            if (addValueInput.value.includes(filterNameInput.value)) {
                cookieEl.querySelector('.cookieValue').textContent = addValueInput.value
            } else {
                cookieEl.remove()
            }
        }
    }

    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
});

// функция возвращает true, если хотя бы одно свойство cookie-объекта ({name: <name>, value: <value>})
// содержит значение поля фильтрации filterNameInput
function cookieFilter(cookie) {
    return (cookie.name).includes(filterNameInput.value) || (cookie.value).includes(filterNameInput.value)
}

// функция перебирает массив cookie-объектов ({name: <name>, value: <value>}) и на их основе
// создает и добавляет новые строки в таблицу listTable
function loadCookieList(cookies=[]) {
    const cookieList = [];

    listTable.innerHTML = '';

    cookies
        .forEach(cookie=>{
            cookieList.push(newCookieLine(cookie))
        });

    listTable.append(...cookieList)
}

// функция преобразует значение document.cookie в массив cookie-объектов ({name: <name>, value: <value>})
// после чего возвращает полученный массив
function cookieParser() {
    let cookieList = [];

    if (document.cookie) {
        cookieList = document.cookie
            .split('; ')
            .map(cookie=>{
                let [name, value] = cookie.split('=');

                return {
                    name: name, 
                    value: value
                }
            })
    }

    return cookieList  
}

// функция на основе переданного cookie-объекта ({name: <name>, value: <value>}) создает, а затем возвращает строку таблицы
function newCookieLine(cookie) {
    const cookieLine = document.createElement('tr');
    const cookieName = document.createElement('td');
    const cookieValue = document.createElement('td');
    const cookieDelete = document.createElement('td');
    const cookieDeleteBtn = document.createElement('button');

    cookieName.textContent = cookie.name;
    cookieName.className = 'cookieName';

    cookieValue.textContent = cookie.value;
    cookieValue.className = 'cookieValue';

    cookieDelete.append(cookieDeleteBtn);

    cookieDeleteBtn.textContent = 'Удалить';

    cookieLine.setAttribute('data-cookie', cookie.name);
    cookieLine.append(cookieName, cookieValue, cookieDelete);
    cookieLine.addEventListener('click', e=>{
        if (e.target.tagName === 'BUTTON') {
            const date = new Date(Date.now() - 1);

            document.cookie = `${e.currentTarget.dataset.cookie}=null; expires=${date.toUTCString()}`;
            e.currentTarget.remove()
        }
    });

    return cookieLine
}
