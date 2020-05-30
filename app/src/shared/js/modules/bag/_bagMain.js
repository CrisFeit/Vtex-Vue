import el from './_bagSelectors';
import helper from './_bagHelpers';
import overlay from '../overlay';
import { getOrder, addToCart, removeItem, updateItem ,addCampaign} from '../../helpers/_vtexHelpers';
import prise from './_prise';

export const bag = {
  init() {
    bag.load();
    bag.bindEvents();
  },

  maxQuantity: [1, 2, 3, 4, 5, 6, 7],

  bindEvents() {
    document.addEventListener('click', function (event) {

      let classList = event.target.classList;

      switch (true) {
        case classList.contains('js--bag-open'):        bag.open();
          break;
        case classList.contains('js--bag-close'):       bag.close();
          break;
        case classList.contains('buy-button'):          bag.add(event);
          break;
        case classList.contains('js--shelf-buy'):       bag.shelfAdd(event);
          break;
        case classList.contains('js--bag-remove'):      bag.remove(event.target);
          break;
        case classList.contains('js--bag-select'):      bag.select(event.target);
          break;
      }
    });
  },

  load() {
    bag.disable();
    getOrder().then(function ({ items, totalizers }) {
      bag.update(items, totalizers);
      bag.enable();
    });
  },

  add(event) {
    event.preventDefault();
    if (skuJson.skus.length > 1 && document.querySelector('.skuList input:checked') == null) {
      alert('Por favor, selecione o modelo desejado.')
      return
    }
    if (!helper.getSku(skuJson).available) {
      alert("Produto indisponível")
      return
    }

    let quantity = document.querySelector('.quantity-field').value
    if (quantity < 1) {
      alert('Escolha a quantidade');
      return
    }
    else {
      bag.open();
      bag.disable();
      const product = {
        id: helper.getSku(skuJson).sku,
        quantity: quantity,
        seller: '1'
      }
      addToCart(product).then((orderForm) => {
        bag.update(orderForm.items, orderForm.totalizers);
        bag.enable();
        addCampaign(orderForm)
      });
    }
  },

  shelfAdd(event) {
    event.preventDefault();
      bag.open();
      bag.disable();
      const product = {
        id: event.target.dataset.sku,
        quantity: 1,
        seller: '1'
      }
      addToCart(product).then((orderForm) => {
        bag.update(orderForm.items, orderForm.totalizers);
        bag.enable();
        addCampaign(orderForm)
      });
  },

  remove(target) {
    bag.disable();
    removeItem(target.dataset.index).then(({ items, totalizers }) => {
      target.parentNode.parentNode.remove();
      bag.update(items, totalizers);
      bag.enable();
    })
  },

  update(items, totalizers) {
    [...el.amount].forEach(sac => sac.textContent = items.length);
    bag.render(items);
    if (totalizers.length) {
      el.total.textContent = (totalizers[0].value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
     el.bonus.innerHTML = helper.bonus(prise(totalizers[0].value));

    } else {
      el.total.textContent = 0;
      el.bonus.innerHTML   =  helper.bonus(prise());
    }
    if(el.shelf.querySelectorAll('.js--bag-old-price').length >= 1){
      el.discount.textContent = helper.discountify([...el.shelf.querySelectorAll('.js--bag-old-price')],[...el.shelf.querySelectorAll('.js--bag-best-price')]);
      el.discountblock.classList.add('bag-bottom__discount--show');
    }else{
      el.discountblock.classList.remove('bag-bottom__discount--show');
    }
  },

  select(target) {
    target.addEventListener('change', function (event) {
      if (event.target.classList.contains('js--bag-select')) {
        bag.disable();
        let index = event.target.nextElementSibling.dataset.index;
        updateItem(index, event.target.value)
          .then(({ items, totalizers }) => {
            if(items[index]){
              event.target.previousElementSibling.innerHTML = helper.precify(items[index])
            }else{
              event.target.parentNode.parentNode.remove()    
            }
            bag.update(items, totalizers);
            bag.enable();
          })
      }
    }, false);
  },

  disable() {
    el.disable.classList.add('bag__disable--open');
    el.loading.classList.add('bag-top__load--ready')
  },
  enable() {
    el.loading.style.width = "100%"

    el.loading.classList.remove('bag-top__load--ready')
    el.disable.classList.remove('bag__disable--open');
  },

  render(items) {
    if (items.length) {
      el.shelf.innerHTML = '';
      items.forEach((item) => {
        el.shelf.innerHTML +=
          `<section class="bag-shelf__item" data-id=${item.productId}>
          <a class="bag-shelf__item-img-anchor" href=${item.detailUrl}>
            <img class="bag-shelf__item-img" src=${item.imageUrl}>
          </a>
          <div class="bag-shelf__item-info">
            <div class="bag-shelf__item-info-name">${item.name}</div>
            <div class="bag-shelf__item-info-price">${helper.precify(item)}</div>
            ${ !item.isGift ? '<select class="bag-shelf__item-info-quantity js--bag-select" name="quantity">'
            +helper.createOptions(bag.maxQuantity, item.quantity)+
            '</select><button class="bag-shelf__item-info-del js--bag-remove" data-index='+items.indexOf(item)+'></button>'
             : '<p class="bag-shelf__item-info-quantity">'+item.quantity+'</p><i class="bag-shelf__item-info-gift"></i>'
            }
          </div>
          <div class="bag-shelf__item-line"></div>
      </section>`
      })
    } else {
      el.shelf.innerHTML = `
      <section class="bag-shelf__empty"> 
        <p class="bag-shelf__empty-title">Sacola Vazia</p>
        <p class="bag-shelf__empty-text">Aproveite para procurar as melhores ofertas <br>
          pelos nossos departamentos
        </p>
      <div class="bag-shelf__display">
        <a href="https://loja.eudora.com.br/busca/"
          class="bag-shelf__display-all">
            <p>Todos os Departamentos</p>
        </a>
        <a href="https://loja.eudora.com.br/maquiagem"
          class="bag-shelf__display-item bag-shelf__display-item--maquiagem">
          <p>Maquiagem</p>
        </a>
        <a href="https://loja.eudora.com.br/perfumaria" 
          class="bag-shelf__display-item bag-shelf__display-item--perfumaria">
          <p>Perfumaria</p>
        </a>
        <a href="https://loja.eudora.com.br/cabelos" 
          class="bag-shelf__display-item bag-shelf__display-item--cabelos">
          <p>Cabelos</p>
        </a>
        <a href="https://loja.eudora.com.br/corpo-e-banho" 
          class="bag-shelf__display-item bag-shelf__display-item--corpo">
          <p>Corpo e Banho</p>
        </a>
        <a href="https://loja.eudora.com.br/rosto" 
          class="bag-shelf__display-item bag-shelf__display-item--rosto">
          <p>Rosto</p>
        </a>
        <a href="https://loja.eudora.com.br/kits" 
          class="bag-shelf__display-item bag-shelf__display-item--kits">
          <p>Kits & Presentes</p>
        </a>
      </div>
      </section>`
    }
  },
  open() {
    overlay.open();
    el.cart.classList.add('bag--open');
  },
  close() {
    if(el.cart.classList.contains('bag--open')){
        el.cart.classList.remove('bag--open');
        overlay.close();
    }
  },
}