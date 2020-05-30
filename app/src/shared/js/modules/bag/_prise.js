const bar = document.querySelector('.js--prise');

let prise;

if(!!bar){
  
const boxes = bar.getElementsByClassName('js--prise-item');
const end = bar.querySelector('.js--prise-end');
const begin = bar.getElementsByClassName('js--prise-item')[0];

const bagBar = document.querySelector('.bag .js--prise');
const bagBoxes = bagBar.getElementsByClassName('js--prise-item');
const bagEnd = bagBar.querySelector('.js--prise-end');
const bagBegin = bagBar.getElementsByClassName('js--prise-item')[0];
prise = (total = 0)=> {

    if (total >= 1) {
      if (total > bar.querySelector('.prise__text--show').dataset.limit) {
        complete();
        return ruler(total);
      }else if (total < bar.querySelector('.prise__text--show').previousElementSibling.dataset.limit) {
        empty();
        return ruler(total);
      }else {
        return ruler(total);
      }

    } else {
      tabify();
      begin.classList.add('prise__text--show');
      bagBegin.classList.add('prise__text--show');
      begin.lastElementChild.style.width = '0';
      bagBegin.lastElementChild.style.width = '0';
      return "";
    } 
}
function ruler(total) {

  for (let index = 0; index < boxes.length; index++) {
    if (total > boxes[index].dataset.limit && total <= boxes[index + 1].dataset.limit) {

      let remain = parseInt(boxes[index + 1].dataset.limit - total) / 100;

      boxes[index + 1].querySelector('.prise__remain').textContent = remain.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      bagBoxes[index + 1].querySelector('.prise__remain').textContent = remain.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      setTimeout(() => {
      tabify();
      boxes[index + 1].classList.add('prise__text--show');
      bagBoxes[index + 1].classList.add('prise__text--show');
      move(total, boxes[index + 1].dataset.limit);
      
      }, 800)
      return boxes[index + 1].dataset.cupom;

    } else if (total > boxes[boxes.length - 1].dataset.limit) {
      complete();
      setTimeout(() => {
        tabify();
        end.classList.add('prise__text--show');
        bagEnd.classList.add('prise__text--show');
      }, 800);
      return end.dataset.cupom;
    }
  };
}
function move(left, limit) {
  setTimeout(() => {  
    let progressBarWidth = (left * 100) / limit;
    let calc = (-100 + progressBarWidth )+ '%';
    bar.querySelector('.prise__text--show .js--prise-track').style.transform    = `translateX(${calc})` ;
    bagBar.querySelector('.prise__text--show .js--prise-track').style.transform = `translateX(${calc})`;
  }, 100)
}
function complete() {
  bar.querySelector('.prise__text--show .js--prise-track').style.transform = 'translateX(0)';
  bagBar.querySelector('.prise__text--show .js--prise-track').style.transform  = 'translateX(0)';
}
function empty() {
  bar.querySelector('.prise__text--show .js--prise-track').style.transform    = 'translateX(-100%)';
  bagBar.querySelector('.prise__text--show .js--prise-track').style.transform = 'translateX(-100%)';
}

function tabify() {
  bar.querySelector('.prise__text--show').classList.remove('prise__text--show');
  bagBar.querySelector('.prise__text--show').classList.remove('prise__text--show');
}

}else {
  prise = (total = 0)=> "";
}
export default prise;