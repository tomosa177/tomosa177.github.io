'use strict';

let cal_array = [];

function calc(calorie, number) {
  return calorie * number;
};
function sum(array) {
  let total_cal = 0;
  for(let item of array) {
    total_cal += item;
  }
  return total_cal;
};

document.getElementById('form1').onsubmit = (e) => {
  e.preventDefault();

  const food = document.getElementById('form1').food.value;
  const cal = document.getElementById('form1').cal.value;
  const num = document.getElementById('form1').num.value;
  const food_cal = calc(cal, num);
  cal_array.push(food_cal);

  const tr_tag = document.createElement('tr');
  const th_tag = document.createElement('th');
  const td_tag = document.createElement('td');

  th_tag.textContent = food;
  td_tag.textContent = `${food_cal}kcal`;

  document.getElementById('table').appendChild(tr_tag);
  document.getElementById('table').appendChild(th_tag);
  document.getElementById('table').appendChild(td_tag);


};

document.getElementById('form2').onsubmit = (e) => {
  e.preventDefault();

  const total_cal = sum(cal_array);
  document.getElementById('your_cal').textContent = total_cal;

  let result_word;
  if(2300 < total_cal) result_word = '食べ過ぎ！';
  else if(1900 <= total_cal && total_cal <= 2300) result_word = '適量を食べています！';
  else if(total_cal < 1900) result_word = 'もっと食べよう！';

  document.getElementById('message').textContent = result_word;

};
