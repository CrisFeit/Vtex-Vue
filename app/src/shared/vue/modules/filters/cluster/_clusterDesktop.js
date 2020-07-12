import { mixin } from '../mixins/mixin-filters';

export const vm = window.innerWidth <= 1024 ? null : new Vue({
  mixins : [mixin],
  data: {
    sort : '',
    cluster     : document.getElementById('vue-clusterId').textContent,
  },
  computed: {
    request(){
        return `/api/catalog_system/pub/products/search/${this.categories}/busca?fq=productClusterIds:${this.cluster}&fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`
    }
  },
  beforeCreate() {

    const trees      = `<cluster-trees
                            v-on:change-data="updateData"
                        />`;

    document.getElementById('vue-nav-box').insertAdjacentHTML('afterbegin', trees);
    
  },
  mounted() {
    if(vueContainer.querySelector('.navigation')){
      vueContainer.querySelector('.navigation').remove();
    }
  },
});

Vue.config.devtools = true