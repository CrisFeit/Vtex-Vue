import { navTabs, singles,specifics,marcas } from './_categorySelectors';

export function getDepartment() {
  if(navTabs){
    const itens = navTabs.querySelectorAll('.search-multiple-navigator h3 a,.search-multiple-navigator h4 a');
    return itens[0].title == itens[1].title ? itens[0].title : `${itens[0].title}/${itens[1].title}`
  }else{
    return '';
  }
}

export function getCategories() {
  let clear = [...singles].filter((item) => {
    if (!item.classList.contains('productClusterSearchableIds') && !item.classList.contains('Cor') && !item.classList.contains('Marca')){
      return item
    }
  })
  let trees = [...clear].map((item) => {
    if (item.children.length == 0 && item.tagName == "UL") {
     return item.previousElementSibling.firstElementChild.title
    } else if(item.tagName == "UL" && item.children.length > 0 && item.previousElementSibling.tagName =='H4'){
      return {
        mainCategory: item.previousElementSibling.firstElementChild.title,
        subCategory: [...item.children].map(child => {          
          return child.firstElementChild.title
        })
      }
  }
})
  return [...trees].filter(item =>  item )
}
export function getTypes() {
  return {
     title : specifics.firstElementChild.textContent,
     thumbs: [...specifics.lastElementChild.querySelectorAll('input')].map(input => {
       return {
         name  : input.value,
         link  : input.getAttribute('rel'),
       }
     }),
  }
}

export function getBrands() {
  return {
    title : marcas.firstElementChild.textContent,
    thumbs: [...marcas.lastElementChild.querySelectorAll('label')].map(label => {
      return {
        name  : label.textContent.replace(/\(|\)|\d/g,""),
        link  : label.firstElementChild.getAttribute('rel'),
      }
    }),
  }
}
