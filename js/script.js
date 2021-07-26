
/*-------------------Блоки Управения------------------------*/
const Stop = document.querySelector('.top-component__stop');// Кнопка Стоп
const Start = document.querySelector('.bottom-component__start');// Кнопка Старт
const Up = document.querySelector('.arrows__top');// Кнопка стрелочка в верх
const Bottom = document.querySelector('.arrows__bottom');// Кнопка стрелочка в низ
const Info = document.querySelector('.info__button');// Кнопка Инфо
const DisplayOn = document.querySelector('.display');// Кнопка поля игры (регестрирует промахи по квадратику)

const Sessions = document.querySelector('.namber');// Поле количиства сессий (Измерений)
const ReactionRate = document.querySelector('.bottom-component__parser-number');// Поле средне статистической реакции
const list = document.querySelector('.list');// Список формкрующейся в инфо С.Р и В.О!
const Stata = document.querySelector('.dinamic-stata');// Блок дополнительных статистик!!!

const corpus = document.querySelector('.corpus');// Корпус программы

/*-------------------Блоки Управения------------------------*/


/*-----------------Инфо блоки, показываются по очереди*/
const ConteinerCnovas = document.querySelector('.conteiner-myChart');// Контейнер с блоком Cnovas
const PlaySquare = document.querySelector('.display__qub1');// Игровой квадратик
const Statistic = document.querySelector('.display__statistic');// блок в котором формируется вся статистика по нажатию кнопки Онфо
const Instuction = document.querySelector('.display-instuction');// блок с инструкцией формируется на стартовой страничке
const TimerStart = document.querySelector('.block-timer');// блок времени отсчета!
const TimerNumer = document.querySelector('.block-timer__numer');// блок с числом счетчика
const masseg = document.querySelector('.masseg');// блок с сообщением о не возможности запустить измерении
const Done = document.querySelector('.masseg-done');// Блок сообщающий о завершении Эксперемента
/*-----------------Инфо блоки, показываются по очереди*/



/*--------------------Важные переменные-----------------------*/
let QuantitySessions = Sessions.textContent; //количество сессий -- значение по умолчанию (10 можно поменять в HTML)
let QuantitySessionsStatic = QuantitySessions;// задаем значение по умолчанию.
let countdownInt = 5;// число от которого начинается обратный отсчет
let emergenceInt = null;//рандомное число появления квадратика.
let top1 = null;//
let left1 = null;//
let triger = false;//тригер для переключения. 
let StataTriger = false;//тригер для показа инфо.
let startTime = null;//таймер засекающий скорость реакции.
let endTime = null;//
let i = 0;//
let array = [''];//Массив зарегестрированных реакций
let arrayEmergenceInt = [''];//массив зарегестрированных ожиданий.
let array2 = [''];//
let sumArrey = 0;//Сумма всех реакций.
let sumArrey0 = 0; //сумма без последнего зарегистрированного элемента
let midlNum = null;//среднее статестическое реакций
let midlNum0 = null;//среднее статестическое без последнего элемента
let YouMidlNum = 0;//Округленная Среднее статистическое.
let schetchic = 0;// переменная для функций Прогресса Регресса используется в (97,103,110,116); 
let schetchic2 = 0;//
let clicks = 0;// счетчик количиства промахов
let ini = 0;//
let trigerInstruction = false;
let trigerStatistic = false;
let setTimeoutEmergence = null; // значение таймера появления квадратика.
let trigerEmergence = false;
let endSessionsetTimeout = null;
let points3 = null;
let ti = 0;
let si = 0;
let ArraymidlNum = [''];
let ArrayAccuracy = [''];
let cl = 0;
let timeDeley2 = 5000;
//let timer5000 = 5000;
let mimi = 12;

const timeDeley = document.querySelector('.VO__namber');
const timeDeleyButton = document.querySelector('.VO_button');
/*--------------------Важные переменные-----------------------*/

//==============================================================
timeDeley.addEventListener('click', function () {
  this.classList.add('greyActiv');
});

timeDeleyButton.addEventListener('click', function () {
  timeDeley.classList.remove('greyActiv');
  timeDeley2 = +timeDeley.textContent;
  if (timeDeley2 <= 1000) {
    mimi = 4;
    return;
  }
  if (timeDeley2 < 5000 && timeDeley2 > 1000) {
    mimi = 8;
    return;
  }
  if (timeDeley2 > 5000) {
    mimi = 12;
    return;
  }

});




function points() {
  if (Done.classList.contains("display-none")) {
    clearTimeout(points3);
    ti = 0;
    trigerEmergence = false;
    Start.removeAttribute('act');
    Up.removeAttribute('act');
    Bottom.removeAttribute('act');
    Info.removeAttribute('act');
    return;
  } else {
    if (ti === 0) {
      Done.textContent = 'Подождите';
    }
    if (ti === 1) {
      Done.textContent = 'Подождите.';
    }
    if (ti === 2) {
      Done.textContent = 'Подождите..';
    }
    if (ti === 3) {
      Done.textContent = 'Подождите...';
      ti = 0;
    }
    ti++;
  }

  points3 = setTimeout("points()", 500);
}
function millisToSeconds(millis) {
  // toFixed(3) вернет 0.300; toFixed(1) вернет 0.3
  let seconds = (millis / 1000).toFixed(3); // Округляет сикунды до приемлимого вида 
  return seconds;
}
//==============================================================
/*----------Функция рандомное число------------*/
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min); // генерирует рандомные числа
  return Math.floor(rand);
}
/*----------Функция рандомное число-----------*/

Array.prototype.min = function () { // находит в масииве минимальное число.
  var min = parseInt(this[this.length - 1]), el;
  for (var i = this.length - 2; i >= 0; i--) {
    el = parseInt(this[i]);
    if (el < min) {
      min = el;
    }
  }
  return min;
};

Array.prototype.max = function () { // находит в масииве максимальное число.
  var max = parseInt(this[this.length - 1]), el;
  for (var i = this.length - 2; i >= 0; i--) {
    el = parseInt(this[i]);
    if (el > max) {
      max = el;
    }
  }
  return max;
};


function progres() {// функция для индикации удутчения средней статестической 
  if (schetchic < mimi) { // количество изменения состояния let mimi = 12;
    schetchic++;//счетчик
    if (schetchic % 2 === 0) {
      ReactionRate.classList.toggle('border-green');// мигание зиленым
    }
    setTimeout('progres()', 50);
  } else {
    schetchic = 0; //обнуление счетчика
    return;
  }
}

function regrres() {// функция для индикации ухутщения средней статестической 
  if (schetchic < mimi) { // количество изменения состояния
    schetchic++;//счетчик
    if (schetchic % 2 === 0) {
      ReactionRate.classList.toggle('border-red');// мигание красным
    }
    setTimeout('regrres()', 50);
  } else {
    schetchic = 0; //обнуление счетчика
    return;
  }
}

function promah() { //функция для индикации промаха
  if (!(PlaySquare.classList.contains('display-none'))) {
    if (schetchic2 < 4) { // количество изменения состояния
      schetchic2++; //счетчик
      if (schetchic2 % 2 === 0) {
        corpus.classList.toggle('promah'); // мигание синим
      }
      setTimeout('promah()', 50);
    } else {
      schetchic2 = 0;//обнуление счетчика
      return;
    }
  } else {
    return;
  }
}
/*---------------------------Обратный отсчет------------------------------*/
function countdown() { //Функция обратного отсчета

  if (Stop.hasAttribute('act')) { // Если кнопка Стоп заблокирована
    if (trigerInstruction === true) {
      if (!(TimerStart.classList.contains('display-none'))) {
        TimerStart.classList.add('display-none');//убераем Обратный отсчет			
      }
      if (Instuction.classList.contains('display-none')) {
        //Instuction.classList.remove('display-none');//Показываем блок инструкции          
      }
      trigerInstruction = false;
    } else if (trigerStatistic === true) {
      if (!(TimerStart.classList.contains('display-none'))) {
        TimerStart.classList.add('display-none');//убераем Обратный отсчет			
      }
      if (Instuction.classList.contains('display-none')) {
        //Statistic.classList.remove('display-none');//Показываем блок инструкции          
      }
      trigerStatistic = false;
    } else {
      location.reload();
    }


    countdownInt = 5; // число от которого начинается обратный отсчет (Сброс значений)
    return; //завершить функцию обратного отсчета
  } else {// Если кнопка Стоп НЕ заблокирована
    if (countdownInt != 0 && countdownInt > 0) {// Если обратный отсчет не равняется нулю и большне нуля.
      TimerNumer.textContent = countdownInt;// в блок с числом счетчика записывается число обратного отсчета.
      countdownInt--;	//число обратного отсчета уменьшается на один.
    } else if (countdownInt === 0) {//Если число обратного отсчета равняется нулю.
      TimerNumer.textContent = 'Go!'; //в блок с числом счетчика записывается GO.
      countdownInt--; //число обратного отсчета уменьшается на один.

    } else if (countdownInt < 0) {//Если число обратного отсчета меньше нуля.
      ini = 0;//
      arrayEmergenceInt = [''];//обнуление массива зарегестрированных ожиданий.
      clicks = 0;//обнуление счетчика количиства промахов.
      array = [''];//обнуление массива зарегестрированных реакций.
      cl = 0;
      ArrayAccuracy = [''];

      if (!(TimerStart.classList.contains('display-none'))) {//Если блок с числом счетчика отображается.
        TimerStart.classList.add('display-none');//блок с числом счетчика исчезает.
      }
      DisplayOn.removeAttribute('act');//снимается блокировка регистрации промахов.
      emergence();// Запускается функция появлния квадратика.
      countdownInt = 5;// число от которого начинается обратный отсчет (Сброс значений).
      return; //завершить функцию обратного отсчета.
    } else {// В случаи непредвиденных обстоятельств.
      alert('Ошибка в таймере');//Вывести ошибку на экран.
      return;//завершить функцию обратного отсчета.
    }
    setTimeout("countdown()", 1000);	// запускает функцию обратного отсчета с периодом.
  }

}
/*---------------------------Обратный отсчет------------------------------*/
/*-----------------------------Резкая отмена---------------------------------*/
function alarmTimer() {// Функция резкой отмены обратного отсчета	 

  if (!(masseg.classList.contains('display-none'))) {// Если блок с сообщением о не возможности запустить измерение ВИДЕН!!!
    if (+Sessions.textContent === 0) {// Если Количество сесий равняется нулю
      if (!(masseg.classList.contains('display-none'))) {
        masseg.classList.add('display-none');//блок с сообщением о не возможности запустить измерение прячим.             
      }
      if (Instuction.classList.contains('display-none') != StataTriger) {
        Instuction.classList.remove('display-none');// Инструкцию показываем.               
      }
      if (Statistic.classList.contains('display-none') === StataTriger) {
        Statistic.classList.remove('display-none');//Статистику показываем !!!
        StataTriger = false;
      }


      Start.removeAttribute('act'); // Кнопку старт разблокировать
      Info.removeAttribute('act');   // Отмена блокировки кнопки Info-------------
      triger = false;// тригер  для переключения в положение выкл.


      return;//завершить функцию резкой отмены обратного отсчета
    } else if (+Sessions.textContent != 0) {
      if (!(masseg.classList.contains('display-none'))) {
        masseg.classList.add('display-none');//блок с сообщением о не возможности запустить измерение прячим.             
      }
      if (Instuction.classList.contains('display-none') != StataTriger) {
        Instuction.classList.remove('display-none');// Инструкцию показываем.               
      }
      if (Statistic.classList.contains('display-none') === StataTriger) {
        Statistic.classList.remove('display-none');//Статистику показываем !!!
        StataTriger = false;
      }
      Start.removeAttribute('act'); // Кнопку старт разблокировать
      Info.removeAttribute('act');   // Отмена блокировки кнопки Info-------------
      triger = false;// тригер  для переключения в положение выкл.
      return;//завершить функцию резкой отмены обратного отсчета
    }
  } else { //Если блок с сообщением о не возможности запустить измерение НЕ ВИДЕН!!!
    if (+Sessions.textContent === 0) {// Если количество сесий ровняется нулю.
      if (!(Instuction.classList.contains('display-none'))) {
        Instuction.classList.add('display-none');// Инструкцию прячим.
        //Instuction.classList.toggle('display-none');
      }
      if (!(Statistic.classList.contains('display-none'))) {
        Statistic.classList.add('display-none');//Статистику прячим
        StataTriger = true;
      }
      if (masseg.classList.contains('display-none')) {
        masseg.classList.remove('display-none');//Сообщение о не возможности запуска показываем            
      }

      Start.setAttribute('act', 'active');// Кнопку Старт блокируем
      Info.setAttribute('act', 'active');//-----------------
      triger = true;// Тригер переключаем в положение вкл.        
    }
  }
  setTimeout("alarmTimer()", 5000);//Время показа блока Сообщение о не возможности запуска.
}
/*--------------------------------------------------------------*/

function endSession() {// Функция завершения Эксперемента
  if (Sessions.textContent === 'end') {//Если блок с количеством измерений равен 'end'.
    Sessions.textContent = QuantitySessionsStatic;//Обнуляем до значения по умолчанию.
    Start.removeAttribute('act');//Кнопку старт розблакировать.

    if (!(Done.classList.contains("display-none"))) {
      Done.classList.add("display-none");
    }
    //Done.classList.toggle("display-none");//Показать или скрыть сообщение о успешном проведении эксперемента

    //Instuction.classList.toggle('display-none');//Показать или скрыть блок инструкцию.
    if (Statistic.classList.contains('display-none')) {
      Statistic.classList.remove('display-none');
      Info.textContent = 'Instr';
    }
    //Statistic.classList.toggle('display-none');//Показать или скрыть блок статистики.

    Up.removeAttribute('act');// розблакировать кнопку стрелка в верх.
    Bottom.removeAttribute('act');//розблакировать кнопку стрелка в низ.
    Info.removeAttribute('act');//разблокировать кнопку Инфо.
    Stop.setAttribute('act', 'active');//Заблокировать кнопку Стоп.     
    return;// завершить функцию завершения Эксперемента.
  }//Или		
  formovka();

  Start.setAttribute('act', 'active');//Кнопка Старт блокируется.
  Sessions.innerHTML = `<span style = 'color:red';>end</span>`;//В блок с количеством сесий записывается end;
  if (trigerEmergence === true) {
    Done.classList.remove("display-none");//Показывается блок сообщающий о завершении Эксперемента

    points();

  }
  if (trigerEmergence === false) {
    Done.classList.add("display-none");//Не выводим блок с сообщением о завершении Эксперимента.
    Sessions.textContent = QuantitySessionsStatic;//Обнуляем до значения по умолчанию.
    Start.removeAttribute('act');//Кнопку старт розблакировать.

    if (!(Done.classList.contains("display-none"))) {
      Done.classList.add("display-none");

    }
    //Done.classList.toggle("display-none");//Показать или скрыть сообщение о успешном проведении эксперемента

    //Instuction.classList.toggle('display-none');//Показать или скрыть блок инструкцию.
    if (Statistic.classList.contains('display-none')) {
      Statistic.classList.remove('display-none');
      Info.textContent = 'Instr';
    }
    //Statistic.classList.toggle('display-none');//Показать или скрыть блок статистики.
    TimerStart.classList.add('display-none');
    Up.removeAttribute('act');// розблакировать кнопку стрелка в верх.
    Bottom.removeAttribute('act');//розблакировать кнопку стрелка в низ.
    Info.removeAttribute('act');//разблокировать кнопку Инфо.
    Stop.setAttribute('act', 'active');//Заблокировать кнопку Стоп.
    clearTimeout(endSessionsetTimeout);
    trigerEmergence = false;
    return;// завершить функцию завершения Эксперемента.             
  }

  endSessionsetTimeout = setTimeout("endSession()", 5000);//Задержка между показами. timer5000
}
//--------------------------------------------------------------------------------

/*---------------Появление квадратика---------*/
function emergence() {//Функция появления квадратика(игрового элемента)
  trigerEmergence = true;
  if (Stop.hasAttribute('act') === false) {//Если кнопка Стоп розблокирована.
    if (emergenceInt != null) {//Если рандомное число появления квадратика НЕ равно null.
      PlaySquare.style.top = `${top1}px`;//задаем Квадрату координату Y.
      PlaySquare.style.left = `${left1}px`;//задаем Квадрату координату X.
      PlaySquare.classList.toggle('display-none');//Убераем или показываем квадрат(цель)
      startTime = new Date().getTime();//Включаем таймер засекающий скорость реакции 
      emergenceInt = null;//рандомное число появления квадратика ОБНУЛЯЕМ.
      return;//Завершить функцию квадратика(игрового элемента).

    } else {// или 
      if (QuantitySessions <= 0) {//Если количество сессий меньше или равно нулю
        if (QuantitySessions === 0) {//Если количество сессий меньше или равно нулю
          QuantitySessions = QuantitySessionsStatic; /* сброс сессий до установлиного количества*/
        }// и 
        clicks++; //------добавляет последний утраченый клик.           	       
        endSession();// запускаем функцию завершения Эксперемента
        DisplayOn.setAttribute('act', 'active');// Кнопка поля игры (регестрирует промахи по квадратику) БЛОКИРУЕМ.           	
        return;//Завершить Функцию появления квадратика(игрового элемента).   
      } else {//или
        emergenceInt = randomInteger(1, timeDeley2);// Формирует рандомное число для таймера появления квадратика.
        top1 = randomInteger(0, 309); //формирует рандомное число для координаты Y.
        left1 = randomInteger(0, 276);//Формирует рандомноие число для координаты X.
        arrayEmergenceInt[ini] = emergenceInt;//запись в массив зарегестрированных ожиданий.
        ini++;// Увеличиваем индекс массива зарегестрированных ожиданий.
      } // и   
    } // и 
    setTimeoutEmergence = setTimeout("emergence()", emergenceInt);//таймер появления.
  } else {// или
    Sessions.textContent = QuantitySessions = QuantitySessionsStatic;// Сброс количиства сесий до значения поумолчанию.
    /*Sessions.textContent = QuantitySessionsStatic;*/
    DisplayOn.setAttribute('act', 'active');//Кнопка поля игры (регестрирует промахи по квадратику) БЛОКИРУЕМ.      
    endSession();//Запустить Функцию завершения Эксперемента.
    return;//Завершить Функцию появления квадратика(игрового элемента).
  }
}
/*---------------Появление квадратика---------*/


function formovka() {

  array2 = [''];
  Stata.innerHTML = '';
  list.innerHTML = '';
  ConteinerCnovas.innerHTML = '';
  Stata.innerHTML = `<div><span>Среднея скорость реакции - </span><span>${millisToSeconds(midlNum)}</span></div>
             <div><span>Минимальная скорость реакции - </span><span>${millisToSeconds(array.min())}</span></div>
             <div><span>Максимальная скорость реакции - </span><span>${millisToSeconds(array.max())}</span></div>
             <div><span>Точность нажатия - </span><span>${((array.length / clicks) * 100).toFixed(1)}%</span></div>`;

  for (let i = 0; array.length > i; i++) {
    array2[i] = i;
  }

  for (let i = 0; array.length > i; i++) {
    if (i === 0) {
      list.innerHTML += `<li class ="back-color-green" type="1" ><span> С.Р. - </span>${millisToSeconds(array[i])}<span> В.О. - </span>${millisToSeconds(arrayEmergenceInt[i])}</li>`;
    } else if (array[i - 1] > array[i]) {
      list.innerHTML += `<li class ="back-color-green" type="1" ><span> С.Р. - </span>${millisToSeconds(array[i])}<span> В.О. - </span>${millisToSeconds(arrayEmergenceInt[i])}</li>`;
    } else if (array[i - 1] < array[i]) {
      list.innerHTML += `<li class ="back-color-red" type="1" ><span> С.Р. - </span>${millisToSeconds(array[i])}<span> В.О. - </span>${millisToSeconds(arrayEmergenceInt[i])}</li>`;
    } else if (array[i - 1] === array[i]) {
      list.innerHTML += `<li class ="back-color-yellow" type="1" ><span> С.Р. - </span>${millisToSeconds(array[i])}<span> В.О. - </span>${millisToSeconds(arrayEmergenceInt[i])}</li>`;
    }
  }
  list.firstElementChild.setAttribute('value', '1');
  //-----------
  ConteinerCnovas.innerHTML = `<canvas id="myChart"></canvas>`;
  Chart.defaults.elements.point.pointStyle = 'circle';
  Chart.defaults.elements.point.radius = 0;
  Chart.defaults.elements.line.borderWidth = 1;
  const labels = array2;

  const data = {
    labels: labels,
    datasets: [{
      label: 'С.Р.',
      data: array,
      fill: false,
      borderColor: 'rgb(216, 0, 4)',
      tension: 0.1
    },
    {
      label: 'В.О.',
      data: arrayEmergenceInt,
      //backgroundColor: 'rgb()',
      borderColor: 'rgb(21,21,216)',
    }, {
      label: 'С.С.Р.',
      data: ArraymidlNum,
      //backgroundColor: 'rgb()',
      borderColor: 'rgb(26,104,20)',
    }, {
      label: 'Точность',
      data: ArrayAccuracy,
      //backgroundColor: 'rgb()',
      borderColor: 'rgb(228,0,186)',
    }],
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          min: 0,
          max: 1500,
          ticks: {
            stepSize: 100
          }
        }
      }
    }
  };
  var myChart = new Chart(
    document.getElementById('myChart'),
    config,
  );

}




//============================= События ===========================================

/*-------------------Управление стрелочками--------------------*/
Up.addEventListener('click', function () { // Событие Нажатие на кнопку стрелочка в верх.
  if (this.hasAttribute('act') === false) {//Если Кнопка в Верх не заблокирована.
    QuantitySessions += 50;//Прибовляем значение поля количества сессий.
    if (QuantitySessions > 1000) {//Если поле количества сесий больше 1000.
      QuantitySessions = 0;//Сбросить количество сесий на ноль.
      Sessions.textContent = QuantitySessions;//Записать в поле количества сесий значение установленное выше.
      QuantitySessionsStatic = QuantitySessions;//Записать в значение по умолчанию новое установлинное значение.
    } else {//или.
      Sessions.textContent = QuantitySessions;//Записать в поле количества сесий значение установленное выше.
      QuantitySessionsStatic = QuantitySessions;//Записать в значение по умолчанию новое установлинное значение.	
    }
  }
});
Bottom.addEventListener('click', function () {// Событие Нажатие на кнопку стрелочка в НИЗ.
  if (this.hasAttribute('act') === false) {//Если Кнопка в НИЗ не заблокирована.
    QuantitySessions -= 50;//Убовляем значение поля количества сессий.
    if (QuantitySessions < 0) {//Если поле количества сесий меньше 0.
      QuantitySessions = 1000;//Сбросить количество сесий на 1000.
      Sessions.textContent = QuantitySessions;//Записать в поле количества сесий значение установленное выше.
      QuantitySessionsStatic = QuantitySessions;//Записать в значение по умолчанию новое установлинное значение.
    } else {
      Sessions.textContent = QuantitySessions;//Записать в поле количества сесий значение установленное выше.
      QuantitySessionsStatic = QuantitySessions;//Записать в значение по умолчанию новое установлинное значение.	
    }
  }
});
/*-------------------Управление стрелочками--------------------*/



Start.addEventListener('click', function () { //Событие на кнопке Старт

  if (!(Instuction.classList.contains('display-none'))) {
    trigerInstruction = true;
  }
  if (!(Statistic.classList.contains('display-none'))) {
    trigerStatistic = true;
  }
  if (+Sessions.textContent === 0) { // Если Поле количества сессий ровняется нулю		
    if (Start.hasAttribute('act') === false) {//Если кнопка старт не заблокирована. 
      alarmTimer();//запустить резкой отмены
    }
  } else {//Если Поле количества сессий не ровняется нулю.  
    /*---------------------сегмент резкой отменны-------------------*/
    /*if(this.hasAttribute('act') === true && triger === true){//Если кнопка старт заблокирована(была нажата) и тригер ровняется true Если Поле количества сессий не ровняется нулю.
          masseg.classList.toggle('display-none');
      Instuction.classList.toggle('display-none');
      Start.removeAttribute('act');
      triger = false;
    }*/
    /*---------------------сегмент резкой отменны-------------------*/
    if (this.hasAttribute('act') === false) { // Если Кнопка старт не заюлокирована
      ReactionRate.textContent = 0;//Обнуляем поле вывода средей статестической реакции
      i = 0;// обнуляем индекс массива скорости реакций.
      si = 0
      this.setAttribute('act', 'active'); //Блокируем кнопку Старт.
      Up.setAttribute('act', 'active');//Блокируем кнопку стрелочка в верх.
      Bottom.setAttribute('act', 'active');//Блокируем кнопку стрелочка в низ.
      Info.setAttribute('act', 'active');//Блокируем кнопку Инфо.
      Stop.removeAttribute('act');//Снимаем блок с кнопки стоп.
      if (!(Instuction.classList.contains('display-none'))) {//Если инструкция видна
        Instuction.classList.add('display-none');//Инструкцию прячим           
      }
      if (TimerStart.classList.contains('display-none')) {//Если таймер не виден
        TimerStart.classList.remove('display-none');//Таймер показываем         
      }
      if (!(Statistic.classList.contains('display-none'))) {//Если статистика видна
        Statistic.classList.add('display-none');//Статитстику прячим                     
      }

      countdown();//запустить функцию обратного отсчета.         
    }
  }
});
/*-----------------------------------------------------------------------*/
PlaySquare.addEventListener('click', function () {//Функция взаимодействия с квадратиком (когда кликаем на квадратик)   	  
  QuantitySessions--;//счетчик сесий уменьшаем на один.	  
  Sessions.textContent = QuantitySessions;//Записываем уменьшеную переменную в блок для визуализации
  endTime = new Date().getTime();//(Отбиваем время взаимодействия)
  if (!(this.classList.contains('display-none')))
    this.classList.add('display-none');// Прячим квадратик.         
  array[i] = -(startTime - endTime);//Записываем значение скорости реакции в Масив.
  i++;//увеличиваем индекс масива выше.
  for (let int = 0; array.length > int; int++) {//Запускаем цикл для сумирования всех значений масива скоростей реакции.
    sumArrey += array[int];//Плюсуем последнее значение. в переменную сумма.     	
  }
  midlNum = sumArrey / array.length;//Высчитываем среднее статестическое реакций

  ArraymidlNum[si] = midlNum;
  si++;
  /*-------------------------------*/
  if (array.length >= 2) { //если длина масива больше двух.    	
    for (let int = 0; (array.length - 1) > int; int++) {//Запускаем цикл для высчита среднего статестического.без последнего элемента.
      sumArrey0 += array[int];//записываем сумму без последнего зарегистрированного элемента     	
    }
    midlNum0 = sumArrey0 / (array.length - 1);//высчитываем среднее статестическое без последнего элемента.
    sumArrey0 = 0;//обнуляем сумму среднего статестического без последнего элемента           
    if (midlNum0 > midlNum) {//Если средне статестическое без последнего елемента Больше!! средне статестического со всеми елементами.
      progres();//запускаем функцию индикатор которая показывает ПОЗЕТИВНУЮ динамику результата.
    } else if (midlNum0 < midlNum) {//Если средне статестическое без последнего елемента Меньше!! средне статестического со всеми елементами.
      regrres();//запускаем функцию индикатор которая показывает НЕГАТИВНУЮ динамику результата.
    }
  }
  /*-------------------------------*/
  YouMidlNum = millisToSeconds(midlNum); //Округленная Среднее статистическое  записываем в переменную
  if (midlNum > 10000) {//Если Округленная Среднее статистическое больше 10 секунд.
    ReactionRate.innerHTML = `<span style = "color:red; font-size:15px;">Ручник</span>`;//Показываем в поле показа времени реакций Слово РУЧНИК
  } else {//в другом случае
    ReactionRate.textContent = `${millisToSeconds(midlNum)}с.`;//Выводим в поле показа времени реакций результат среднестатистического.
  }
  sumArrey = 0;//Обнуляем сумму скоростей реакций.
  emergence();//Запускаем функцию показа следующего квадратика.
});
/*---------------------------------------------------------------------*/
Stop.addEventListener('click', function () {
  if (this.hasAttribute('act') === true) {//блокирует нажатие когда игра не запущенна		
    return;
  } else {

    setTimeoutEmergence = clearTimeout(setTimeoutEmergence); //обнуление таймера появления квадратика
    Sessions.textContent = QuantitySessions = QuantitySessionsStatic;// Сброс количиства сесий до значения поумолчанию.        
    DisplayOn.setAttribute('act', 'active');//Кнопка поля игры (регестрирует промахи по квадратику) БЛОКИРУЕМ.      
    endSession();//Запустить Функцию завершения Эксперемента.              	      	     
    formovka();//формируем отчет.

    this.setAttribute('act', 'active');
    // Start.removeAttribute('act');
    // Up.removeAttribute('act');
    // Bottom.removeAttribute('act');
    // Info.removeAttribute('act'); // убрать блокировку кнопки Info.
    ReactionRate.textContent = 0;
    PlaySquare.removeAttribute('style');
    if (!(PlaySquare.classList.contains('display-none'))) {
      PlaySquare.classList.add('display-none');
      /*Instuction.classList.toggle('display-none');*/
    }
    if (!(DisplayOn.hasAttribute('act'))) {
      DisplayOn.setAttribute('act', 'active');
    }
    /*if(Statistic.classList.contains('display-none')){
       Statistic.classList.remove('display-none');
    }*/
  }
});
/*----------------------------------------------------------------------------*/
DisplayOn.addEventListener('click', function () {
  if (this.hasAttribute('act')) {
    return
  } else {
    promah();

    clicks++; // измерение точности!!----------------------------- 
    ArrayAccuracy[cl] = (((array.length / clicks) * 100) * 10).toFixed(1);
    cl++;
  }
});
/*-------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------*/
Info.addEventListener('click', function () {
  if (this.hasAttribute('act')) {
    return;
  } else {
    if (!(Instuction.classList.contains('display-none'))) { // если отображается инструкция.
      Instuction.classList.toggle('display-none');// инструкция не отображается.
      if (Stata.innerHTML === '') {
        Stata.innerHTML = `Здесь пока ничего нет, что бы что то появилось нажми <span style = 'color:red'>Cтарт!</span>`;
      }
      Statistic.classList.toggle('display-none'); // показ статистики.
      Info.textContent = 'Instr';

    } else if (Instuction.classList.contains('display-none')) { // если инструкция не отображается            
      Instuction.classList.toggle('display-none'); // инструкция показывается   
      Statistic.classList.toggle('display-none'); // статистика исчезает 
      Info.textContent = 'Info';
    }
  }
});






/*---------------------------------------------------*/
/*Нужно зделать
Коофициент внезапной цели, тоисть на сколько быстро испытуемый отреогрует на цель которая появляется в диапазоне от 0 - 300 милисекунд после попадания в предыдущую...

-------------------------------------------------------------------
clicks - Количество кликов во время теста!!!
array - масив зарегестрированных скоростей реакций.
arrayEmergenceInt - масив скоростей появления цели в диапазоне 0 - 5000 мик/сек.
midlNum - среднея статестческая скоростей реакций.



1) Сделать регулировку скорости показов.
2) Сделать анимацию при нажатии на квадратик.
3) Пофиксить баг во время анимации Подождите.



*/

