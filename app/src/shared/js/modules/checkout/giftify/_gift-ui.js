import overlay from '../../general/overlay';
export default {
  init() {
    overlay.self = document.querySelector('.js--overlay');
    this.insertModal();
    this.call();
  },

  insertModal() {
    overlay.self.innerHTML =
`
  <section class="giftBox__rules">
      <button class="giftBox__rules-close js--close-rules" ></button>

      <h5 class="giftBox__rules-title">Kits</h5>
      <p class="giftBox__rules-item">
          Al\u00E9m dos nossos Kits j\u00E1 prontos, voc\u00EA tamb\u00E9m poder\u00E1 escolher outros produtos no site para montar o seu presente. Os Kits Eudora j\u00E1 possuem embalagens espec\u00EDficas. Todos os demais produtos escolhidos ser\u00E3o embalados em 1 Caixa de Presente, com tamanho vari\u00E1vel.
      </p>

      <h5 class="giftBox__rules-title">Embalagem</h5>
      <p class="giftBox__rules-item">
          Seus produtos ser\u00E3o embalados em uma linda Caixa de Presente exclusiva de
          Eudora. O tamanho da caixa ser\u00E1 calculado automaticamente, de acordo com a quantidade de
          produtos no carrinho.
      </p>

      <h5 class="giftBox__rules-title">Nota fiscal com valor zerado</h5>
      <p class="giftBox__rules-item">
          O presenteado ir\u00E1 receber uma nota fiscal com valor zerado, sem informar os valores dos produtos ou da caixa de presente.
      </p>

      <button class="giftBox__button js--giftBox-init js--close-rules">
      Embalar para Presente
      </button>
  </section>
    `
  },
  call() {
    overlay.open();
    const modal = overlay.self.querySelector('.giftBox__rules');
    modal.classList.add('giftBox__rules--open');
    overlay.self.addEventListener('click', (event) => {

      let classList = event.target.classList;

      switch (true) {
        case classList.contains('js--close-rules') || classList.contains('js--overlay'): this.close(modal);
          break;
      }
    });
  },
  close(modal) {
    overlay.close();
    modal.remove();
  }
}