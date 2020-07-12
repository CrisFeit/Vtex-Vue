export const vueContainer  =  document.getElementById('vue-category');
export const vueNav        =  window.innerWidth < 1024 ? document.getElementById('vue-mobile-nav')
                                                        :document.getElementById('vue-nav-box') ;
export const vueFilters    =  document.getElementById('vue-filters-box');
export const vueSort       =  document.getElementById('vue-sort-box');
export const vueShelfs     =  document.getElementById('vue-shelfs');
export const navTabs       =  vueContainer.querySelector('.navigation-tabs');
export const singles       =  vueContainer.querySelectorAll('.search-single-navigator h4,.search-single-navigator ul');
export const specifics     =  vueContainer.querySelector('.search-multiple-navigator .refino');
export const marcas        =  vueContainer.querySelector('.search-multiple-navigator .refino-marca');
export const breadcrumb    =  document.querySelectorAll('.bread-crumb ul li a');
