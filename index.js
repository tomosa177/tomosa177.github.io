'use strict';

// 各画像を配列に
let array = [
  'images/sun.jpg',
  'images/sun.jpg',
  'images/magician.jpg',
  'images/magician.jpg',
  'images/death.jpg',
  'images/death.jpg',
];
// クラス属性にパスをそのままいれられなかったので。
let object = {
  'images/sun.jpg' : 'sun',
  'images/magician.jpg' : 'magician',
  'images/death.jpg' : 'death',
};
// シャッフル後のカード情報を入れる用の空配列
let random_array = [];

// 更新するとカードがシャッフルされる
for(let i = array.length-1; i >= 0; i --) {
  let rand = Math.floor(Math.random() * i);
  random_array.push(array[rand]);
  array.splice(rand, 1);
}

// 表向けたカード二枚を裏に戻す
function reset() {
  for(let i = 0;i < random_array.length;i ++) {
    let img_tag = document.getElementById(`img${i}`);
    let class_name = img_tag.className;
    if(class_name !== 'hidden' && class_name !== '') {
      img_tag.src = "images/card.jpg";
      img_tag.className = '';
    }
  };
};

// 表示したテキスト消す用 ⇒ 他なんかやり方あるかな
function removeText() {
  document.getElementById('message').textContent = '';
};

// クリア後メッセージ
function congratulation() {
  document.getElementById('message').textContent = 'Congratulation!';
};

// めくる関数
function flip(num) {
  let tag = document.getElementById(`img${num}`);

  tag.onclick = () => {
    // そもそもhiddenならめくらない
    if(tag.className === 'hidden') return;
    // クリックで画像の入れ替えとクラス付加
    tag.src = random_array[num];
    tag.setAttribute('class', object[random_array[num]]);
    // 絵柄の同じカードは何枚あるか
    let elements = document.querySelectorAll('.' + object[random_array[num]]);
    let judge_correct = elements.length;
    // 表向いたカードは何枚あるか
    let judge_false = 0;
    for(let i = 0;i < random_array.length;i ++) {
      let class_name = document.getElementById(`img${i}`).className;
      if(class_name !== 'hidden' && class_name !== '') {
        judge_false++;
      }
    };
    // 絵柄が揃うと消えて、揃わないと裏返す
    if(judge_correct === 2) {
      elements.forEach(function(item) {
        item.setAttribute('class', 'hidden');
      });
    } else if(judge_false === 2) {
      document.getElementById('message').textContent = 'different...';
      setTimeout('reset()', 1100);
      setTimeout('removeText()', 1100);
    }
    // 全て消えたらゲームクリア
    if(document.querySelectorAll('.hidden').length === random_array.length) {
        congratulation();
    }

    // もう一度クリックでもう一度フリップできる。神経衰弱では使わないけど
    // tag.onclick = () => {
    //   // 再帰呼び出し
    //   flip(num);
    //   tag.src = "images/card.jpg";
    //   tag.className = '';
    // };
  };
};

// めくる動作をすべてのカードでできるようにする
for(let i = 0; i <= random_array.length-1; i ++) {
  flip(i);
}

// filter使える?
// データ属性?
