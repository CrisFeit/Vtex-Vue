const singles = document.querySelectorAll('.search-single-navigator ul');
export function getCategories() {
  let trees = [...singles].map((item) => {
      return {
        mainCategory: item.previousElementSibling.lastElementChild.title,
        subCategory: [...item.children].map(child => {          
          return child.firstElementChild.title
        })
      }
})
  return [...trees].filter(item =>  item )
}