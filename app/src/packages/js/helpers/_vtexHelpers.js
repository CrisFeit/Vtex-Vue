
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

// export const sendAttachment = (string, object) => (vtexjs.checkout.sendAttachment(string, object));