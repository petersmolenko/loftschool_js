/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i=0; i < array.length; i++) {
        fn(array[i], i, array)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let resArr = [];

    for (let i = 0; i < array.length; i++) {
        resArr.push(fn(array[i], i, array))
    }

    return resArr
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let acc = initial?initial:array[0];

    for (let i = initial?0:1; i < array.length; i++) {
        acc = fn(acc, array[i], i, array)
    }

    return acc
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    return Object
        .keys(obj)
        .map(el=>el.toUpperCase())
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

function slice(array, from, to) {
    function setPoint(arr, point, isFrom) {
        let res = null;

        if (point !== undefined) {
            if (point >= 0) {
                res = (point >= arr.length)?(arr.length):point;
            } else {
                res = (arr.length + point < 0)?0:(array.length + point)
            }

        } else {
            res = isFrom?0:(array.length)
        }

        return res
    }

    let res = []

    for (let i = setPoint(array, from, true); i < setPoint(array, to); i++) {
        res.push(array[i])
    }

    return res    
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, val) {
            let res = null;

            if (typeof val == 'number') {
                target[prop] = val ** 2;
                res = true;
            } else {
                res = false
            }

            return res
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
