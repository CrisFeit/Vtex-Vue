export function getVariations(productId){
    return $.get(`/api/catalog_system/pub/products/variations/${productId}`).done(variations => variations).fail(err =>{
    console.log(err);
    return
  })
}

export function getOrderForm() {
  return vtexjs.checkout.getOrderForm().done(order => order);
}

export function addItem(item) {
    return vtexjs.checkout.addToCart([item]).done(order => order).fail(err =>{
      console.log(err);
      return
    })
}

export function deleteItem(index) {
    const itemToRemove = [
      {
        "index": index,
        "quantity": 1,
      }
    ]
    return vtexjs.checkout.removeItems(itemToRemove).done(order => order).fail(err =>{
      console.log(err);
      return
    })
}

export function addAttachment(itemIndex,content){
  try{
    const attachmentName = 'mensagem_presente';
    console.log('index',itemIndex);
    return vtexjs.checkout.addItemAttachment(itemIndex,attachmentName , content)
    .done(orderForm => orderForm) ;
  }catch{
    return
  }
}