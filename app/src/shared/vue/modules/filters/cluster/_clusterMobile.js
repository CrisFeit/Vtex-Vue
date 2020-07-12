import { mixinMobile } from '../mixins/mixin-filters-mobile';

export const vm = window.innerWidth > 1024 ? null : new Vue({
  mixins : [mixinMobile],
  data: {
    cluster: document.getElementById('vue-clusterId').textContent,
  },
  computed: {
    request() {
        return `/api/catalog_system/pub/products/search/${this.categories}/busca?fq=productClusterIds:${this.cluster}&fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`
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
    if(document.querySelector('.navigation')){
        document.querySelector('.navigation').remove();
    }
  },
});

Vue.config.devtools = true;