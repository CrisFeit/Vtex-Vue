// import {  vueNav } from './_clusterSelectors';
import { mixinMobile } from '../mixins/mixin-filters-mobile';

export const vm = window.innerWidth > 1024 ? null : new Vue({
  mixins: [mixinMobile],
  data: {
    path: window.location.pathname,
    search: window.location.search.indexOf('&') != -1 ? window.location.search.split('&')[0] : window.location.search,
  },
  computed: {
    request() {
      if(this.path.indexOf('/busca') != -1 && window.location.search.indexOf('?') != -1 ){
        return `/api/catalog_system/pub/products/search/${this.categories}/busca${this.search}&fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`
        
      }else if(this.path.indexOf('/busca') != -1 && this.path.length >= 8 ){
        return `/api/catalog_system/pub/products/search/${this.categories}/busca?ft=${this.path}&fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`

      }else if(this.path.indexOf('/busca') != -1){
        return `/api/catalog_system/pub/products/search/${this.categories}/busca?${this.search}&fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`

      }else{
        return `/api/catalog_system/pub/products/search/${this.categories}${this.path}?fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`
      }
    }
  },
    beforeCreate() {

      const clustertrees = `<cluster-trees ref="clearTrees"
                               v-on:change-data="updateData"
                               v-on:filter-display="toggleFilter"
                        />`;

      document.getElementById('vue-mobile-nav').insertAdjacentHTML('afterbegin', clustertrees);
    },
    mounted() {
      if (document.querySelector('.navigation')) {
        document.querySelector('.navigation').remove();
      }
    },
  });

Vue.config.devtools = true;