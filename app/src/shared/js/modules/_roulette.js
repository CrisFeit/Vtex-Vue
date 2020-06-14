import overlay from '../../modules/general/overlay';
const modal = document.querySelector('.roulette');
const cupom = modal.querySelector('.js--roulette-cupom');
var $control = $('.js--roulette-control');
export const roulette = {
  init() {
    if(!localStorage.getItem('EudoraRoleta')){
      roulette.load();
      roulette.bindEvents();
    }
  },

  bindEvents() {
    modal.addEventListener('click', function (event) {

      let classList = event.target.classList;

      switch (true) {
        case classList.contains('js--roulette-close'):    roulette.close();
          break;
        case classList.contains('js--roulette-control'):  roulette.shine();
          break;
        case classList.contains('js--roulette-copy'):    roulette.copy();
          break;
      }
    });
  },

  shine(){
    $control.addClass('roulette__button--active');
  },

  copy(){

    cupom.select();

    cupom.setSelectionRange(0, 99999); 

    document.execCommand("copy");
  },

  load(){
    roulette.open();


    $('.roulette').each(function () {
      var roulette = this;
      var $disc = $('.roulette__disc');
      var $needle = $('.roulette__needle');
      

      $(roulette).on('speedUp', function (_event, data) {
          var max = data.max; // degrees / second
          var acceleration = data.acceleration;  // degres / second²
          var speed = data.speed; // degrees / second
          var rotation = data.rotation; // degrees;
          
          $control.text('Aguarde');

          requestAnimationFrame((function loop(then) {
              return function () {
                  var now = Date.now();
                  var delta = (now - then) / 100;

                  if (speed < max) {
                      speed += acceleration * delta;

                      rotation += speed * delta;
                      $disc.css('transform', 'rotate(' + rotation + 'deg)');
  
                      return requestAnimationFrame(loop(now));
                  }

                  else $(roulette).trigger('speedConstant', {
                      max: max,
                      acceleration: acceleration,
                      speed: speed,
                      rotation: rotation
                  });
              }
          })(Date.now()));
      });

      $(roulette).on('speedConstant', function (_event, data) {
          var max = data.max;
          var acceleration = data.acceleration;
          var speed = data.speed;
          var rotation = data.rotation;
          var requestCode = '';

          $control.text('Parar a Roleta');

          requestAnimationFrame((function loop(then) {
              return function () {
                  var now = Date.now();
                  var delta = (now - then) / 90;

                  rotation += speed * delta;
                  $disc.css('transform', 'rotate(' + rotation + 'deg)');

                  requestCode = requestAnimationFrame(loop(now));
              }
          })(Date.now()));

          $control.one('click', function () {
              cancelAnimationFrame(requestCode);

              $(roulette).trigger('speedDown', {
                  max: max,
                  acceleration: acceleration,
                  speed: speed,
                  rotation: rotation
              });
          });
      });

      $(roulette).on('speedDown', function (_event, data) {
          var max = data.max;
          var acceleration = data.acceleration;
          var speed = data.speed;
          var rotation = data.rotation;
          
          $control.text('Aguarde');

          requestAnimationFrame((function loop(then) {
              return function () {
                  var now = Date.now();
                  var delta = (now - then) / 100;

                  if (speed > 0) {
                      speed -= acceleration * delta;

                      rotation += speed * delta;
                      $disc.css('transform', 'rotate(' + rotation + 'deg)');
  
                      return requestAnimationFrame(loop(now));
                  }
                  else {
                    $control.text('Aguarde');

                      setTimeout(function () {
                          var chosen = Math.floor(((rotation + 36) % 360) / (360 / 4));
                          
                          switch (chosen) {
                            case 0: 
                              $('.js--roulette-prise-bonus').html('<p>Você Ganhou</p><strong class="frete">Frete Gr\u00E1tis</strong>Aproveite e leve a loja toda! O frete é grátis mesmo! ');
                              cupom.value = 'GANHEFRETE'
                              localStorage.setItem('EudoraRoleta', 'GANHEFRETE');
                              break;
                              
                            case 1:
                              $('.js--roulette-prise-bonus').html('<p>Você Ganhou</p><strong class="brinde">1 Batom!</strong>Sua boca vai dar o que falar!');
                              cupom.value = 'GANHEBRINDE'
                              localStorage.setItem('EudoraRoleta', 'GANHEBRINDE');
                              break;
                              
                            case 2:
                              $('.js--roulette-prise-bonus').html('<p>Você Ganhou</p><strong class="off">30% OFF</strong>Você ganhou 30% de desconto pra usar na sua primeira compra!');
                              cupom.value = 'GANHE30'
                              localStorage.setItem('EudoraRoleta', 'GANHE30');
                              break;
                                
                            case 3:
                              $('.js--roulette-prise-bonus').html('<p>Você Ganhou</p><strong class="amostra">4 Amostras</strong>Experimente e se apaixone!');
                              cupom.value = 'GANHEAMOSTRA'
                              localStorage.setItem('EudoraRoleta', 'GANHEAMOSTRA');
                            break;
                          }
                          $control.text('Copie o Seu Cupom');

                          $('.js--roulette-game').remove();
                          $('.roulette__left').remove();


                          modal.querySelector('.js--roulette-prise').classList.add('roulette__prise--show');

                      }, 2500);
                  }
              }
          })(Date.now()));
      });

      $control.one('click', function () {
          $(roulette).trigger('speedUp', {
              max: 50,
              acceleration: 2,
              speed: 0,
              rotation: 0
          });
      });
  })
  },

  open() {
    overlay.open();
    modal.classList.add('roulette--open');
  },
  close() {
    modal.classList.remove('roulette--open');
    overlay.close();
  },
}

