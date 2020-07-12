function isMobile(){
  return window.innerWidth < 768
}
export const component = (active = '',msg = '')=>{
  if(active == 'button'){
    let button = `
      <button class="giftBox__button js--giftBox-init">
       Embalar para Presente
      </button>
      <button class="giftBox__rules-open js--rules-open"></button>
    `
    return button
  }else if(active == 'loading'){
    let load = `
      <div class="giftBox__loader">
        <div class="giftBox__spinner"></div>
      </div>
      <p class="giftBox__loader-text">${msg}</p>
    `
    return load;
  }else if(active == 'error'){
    return `
      <p class="giftBox__error">${msg}</p>
    `
  }
  else{
    return " " 
  }

}
