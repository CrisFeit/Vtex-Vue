
export function getOrder() {
  return vtexjs.checkout.getOrderForm().done(order => order);
}

export function addToCart(item) {
  return vtexjs.checkout.addToCart([item]).done(order => order);
}
export function removeItem(index) {
  return vtexjs.checkout.getOrderForm()
    .then(function ({ items }) {
      const item = items[index];
      const itemToRemove = [
        {
          "index": index,
          "quantity": item.quantity,
        }
      ]
      return vtexjs.checkout.removeItems(itemToRemove);
    }).done(order => order);
}

export function updateItem(index, amount) {
  return vtexjs.checkout.getOrderForm()
    .then(function () {
      const updateItem = [
        {
          "index": index,
          "quantity": amount,
        }
      ];
      return vtexjs.checkout.updateItems(updateItem);
    }).done(order => order);
}

let getMarketingCookie = (name)=> {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  else{
        return null
    }
}

export function addCampaign(orderForm){
  let marketingData = orderForm.marketingData;
  marketingData     = {
  	'utmSource'     : getMarketingCookie('utm_source'),
  	'utmCampaign'   : getMarketingCookie('utm_campaign'),
  	'utmMedium'     : getMarketingCookie('utm_medium')
  };
  return vtexjs.checkout.sendAttachment('marketingData', marketingData)
.fail(err => {
    console.log(err);
    return
  })
}