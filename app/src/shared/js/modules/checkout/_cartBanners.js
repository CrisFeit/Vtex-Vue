import { addItem } from '../_vtexApi';

const removeBanner = (banner)=> {
  banner.style.opacity = 0
  setTimeout(()=>{
    banner.remove()
  },1000)
}

const addToCart = (sku)=> {
  let item = {
    id: sku,
    quantity: 1,
    seller: '1'
  }
  removeBanner(document.querySelector('.cart__banner-container'))
  addItem(item)
}


export function clickBanners(){
  
  document.addEventListener('click', function (event) {

  let classList = event.target.classList;
  switch (true) {
    
    case classList.contains('js--buy-cart'): addToCart(event.target.dataset.sku);
      break;
  }
});
}