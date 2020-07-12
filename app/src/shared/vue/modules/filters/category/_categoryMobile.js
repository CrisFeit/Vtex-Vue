import { getDepartment } from './_categoryHelpers';
import { mixinMobile } from '../mixins/mixin-filters-mobile';

export const vm = window.innerWidth > 1024 ? null: new Vue({
  mixins : [mixinMobile],
  data: {
    department  : getDepartment(),
    sort        : window.location.search.indexOf('?O=') != -1 ? window.location.search.split('?O=')[1] : '',
    types       : [],
    brands      : [],
  },
  computed: {
    request() {
      return `/api/catalog_system/pub/products/search/${this.department}/${this.categories}?${this.types.join('&')}${this.brands.join('&')}&fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`
    }
  },
  beforeCreate() {

    const trees      = `<trees ref="clearTrees"
                               v-on:change-data="updateData"
                               v-on:filter-display="toggleFilter"
                        />`;


    vueNav.insertAdjacentHTML('afterbegin', trees);
    
  },
  mounted() {
    document.querySelector('.navigation-tabs').remove();
  },
});

Vue.config.devtools = true;