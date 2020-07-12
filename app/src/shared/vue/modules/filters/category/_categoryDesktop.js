import { getDepartment } from './_categoryHelpers';
import { mixin } from '../mixins/mixin-filters';

export const categoryDesktop = window.innerWidth <= 1024 ? null : new Vue({
  mixins : [mixin],
  data: {
    sort        : window.location.search.indexOf('?O=') != -1 ? window.location.search.split('?O=')[1] : '',
    department  : getDepartment(),
    types       : [],
    brands      : [],
  },
  computed: {
    request() {
        return `/api/catalog_system/pub/products/search/${this.department}/${this.categories}?${this.types.join('&')}${this.brands.join('&')}&fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`
    }
  },
  beforeCreate() {

    const trees      = `<trees
                                    v-on:change-data="updateData"
                        />`;

    document.getElementById('vue-nav-box').insertAdjacentHTML('afterbegin', trees);
  },
  mounted() {
    if(document.querySelector('.navigation-tabs')){
      document.querySelector('.navigation-tabs').remove();
    }
    }
});

Vue.config.devtools = true