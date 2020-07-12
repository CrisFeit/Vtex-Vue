import '../../../../../../../config/node_modules/@babel/runtime/regenerator/index';
import { getVariations, getOrderForm, addItem, deleteItem, addAttachment } from '../_vtexApi';
import { component } from './_gift-templates';
import rules from './_gift-ui';
//------------------------ Ordem de Tamanho Menor para a Maior ------------------------

let boxes = [{ productId: 4022 }, { productId: 3699 }, { productId: 844 }]
let chosenBox = {
  id: null,
  quantity: 1,
  seller: '1'
}
let content = {
  de: '',
  mensagem: '',
  para: '',
};

let getItemInfo = async (items) => {
  try {
    let itemsNoGifts = items.filter(item => !item.isGift)
    const variations = itemsNoGifts.map(item => getVariations(item.productId))
    const variationsArray = await Promise.all(variations)
    return variationsArray;
  }
  catch (err) {
    console.log(err);
    render('error','Embalagem Indispon\u00EDvel')
    setTimeout(() => {
      render()
    }, 3000)
    return false;
  }
}

const getBoxSizes = async () => {
  try {
    if ('size' in boxes[0]) return boxes;
    return getItemInfo(boxes).then(variations => {
      return variations.map(box => {
        return {
          productId: box.productId,
          sku: box.skus[0].sku,
          size: (calcMeasure(box.skus[0].measures) / 2)
        }
      })
    })
  } catch (err) {
    console.log(err);
    render('error','Embalagem Indispon\u00EDvel')
    setTimeout(() => {
      render()
    }, 3000)
  }
}

async function getOrderSize(products, boxIndex) {
  try {

    let items = products.filter(product => product.productId != boxIndex.productId)
    boxIndex != -1 ? items.splice(boxIndex, 1) : null

    return getItemInfo(items).then(variations => {
      return variations.reduce((total, variation) => {
        let quantity = items.find(item => variation.skus.some(obj => obj.sku == item.id)).quantity;
        return total + calcMeasure(variation.skus[0].measures) * quantity
      }, 0)
    })
  }
  catch (err) {
    console.log(err.message);
    render('error','Embalagem Indispon\u00EDvel')
    setTimeout(() => {
      render()
    }, 3000)
  }
}

function calcMeasure({ width, height, length }) {
  return width + height + length;
}

function hasBoxIndex(items) {
  return items.findIndex(item => boxes.some(box => box.productId == item.productId));
}

function hasChosenBox(items) {
  return items.findIndex(item => item.id == chosenBox.id);
}

function giftBox(size) {
  let chosen = boxes.findIndex(box => size < box.size)
  if (chosen != -1) {
    return boxes[chosen].sku
  }
  return boxes[boxes.length - 1].sku
}

const addBox = async () => {
  try {

    render('loading', 'Calculando Embalagem...')
    let { items } = await getOrderForm()
    let index = hasBoxIndex(items);
    let size = await getOrderSize(items, index);
    chosenBox.id = giftBox(size);
    let hasBox = hasChosenBox(items)


    if (index != -1 && hasBox == index && items.length > 1) {
      if (items[hasBox].attachments.length > 0) {
        render()
        return
      } else {
        render()
        saveAttachment()
        return
      }
    }
    if (index != -1 && items.length == 1) {
      await deleteItem(index)
      render();
    }
    else if (index == -1 && items.length > 0) {
      let { items } = await addItem(chosenBox)
      saveAttachment(items)
    }
    else if (index != -1 && index != hasBox) {
      let orderArray = await Promise.all([deleteItem(index), addItem(chosenBox)])

      saveAttachment(orderArray)

    }

    render()
  }
  catch (err) {
    console.log(err);
    return
  }
}


async function saveAttachment(order) {
  try {
    let newItems = Array.isArray(order) ? order[1].items : !newItems ? false : newItems.items
    if (newItems) {
      let index = hasChosenBox(newItems);
      
      if (index == -1) return
      if(newItems[index].attachmentOfferings.length == 0){
        render('error','Servi\u00E7o Indispon\u00EDvel')
        await deleteItem(index)
        setTimeout(() => {
          render()
        }, 3000)
        return
      }
      if (hasAttachment(newItems, index)) return
      render();
      await addAttachment(index, content)
    }
    else {
      let { items } = await getOrderForm()
      let index = hasChosenBox(items);
     
      if (index == -1) return
      if(items[index].attachmentOfferings.length == 0){
        render('error','Servi\u00E7o Indispon\u00EDvel')
        await deleteItem(index)
        setTimeout(() => {
          render()
        }, 3000)
        return
      }
      if (hasAttachment(items, index)) return
      render();
      await addAttachment(index, content)
    }
    render()
  } catch (err) {
    console.log(err.message);
  }
}

function hasAttachment(items, index) {
  return items[index].attachments.length > 0
}

const templateGiftBox = `
<section id="giftContainer" class="giftBox">
  ${component()}
</section>`


function render(active = '', message = '') {
  let template = document.getElementById('giftContainer');
  if (template) {
    template.innerHTML = component(active, message)
  }
}

async function verify(items){

  let btn = document.querySelector('.js--giftBox-init')
  if (items) {
    let index = hasBoxIndex(items);
    if (index != -1) {
      giftify.init()
    } else {
      if (btn) return
      render('button')
    }
  }
  else {
    let {items} = await getOrderForm();
    let index = hasBoxIndex(items);
    if (index != -1) {
      giftify.init()
    } else {
      if (btn) return
      render('button')
    }
  }
} 

export const giftify = {

  insertContainer() {

    const cart = document.querySelector('.cart-template .cart')
    cart.insertAdjacentHTML('beforeend', templateGiftBox)
    document.addEventListener('click', function (event) {

      let classList = event.target.classList;
      switch (true) {
        case classList.contains('js--giftBox-init'): giftify.init();
          break;
        case classList.contains('js--rules-open'): rules.init();
          break;
      }
    });
 
    verify()
    
    $(window).on('checkoutRequestEnd.vtex', (event, orderForm) => {
      let { items } = orderForm;
      verify(items)
    });
  },

  init() {
    getBoxSizes().then(boxsizes => {
      boxes = boxsizes
      addBox()
    })
  },
}