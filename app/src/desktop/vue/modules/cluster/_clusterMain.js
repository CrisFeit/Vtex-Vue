import '../../../../../../node_modules/@babel/runtime/regenerator/index';
import axios from '../../../../../../node_modules/axios/dist/axios';
import { vueContainer, vueNav, vueShelfs,vueSort} from './_clusterSelectors';

import components from '../components/Components';

export const vm = new Vue({
  el: vueContainer,
  components,
  data: {
    loading     : true,
    finish      : true,
    filterOpen  : false,
    sortOpen    : false,
    resourses   : false,
    cluster     : document.getElementById('vue-clusterId').textContent,
    categories  : '',
    sort        : '',
    shelf       : [],
    price       : 500,
    from        : 0,
    to          : 7,
    observing   : false,
    observer    : document.getElementById('vueObserver')
  },
  computed: {
    request(){
        return `/api/catalog_system/pub/products/search/${this.categories}/busca?fq=productClusterIds:${this.cluster}&fq=P:[0TO${this.price}]&O=${this.sort}&_from=${this.from}&_to=${this.to}`
    }
  },
  methods: {
    updateData(update) {
      this.shelf        = [];
      this[update.name] = update.data;
      this.loading      = true;
      this.from         = 0;
      this.to           = 7;
      this.fetchProducts();
    },
    async fetchProducts() {
      if (!this.finish) return
      this.finish = false;
      try {
        const items  = await axios.get(this.request)
        let rankings = await this.fecthReviews(items.data)
        this.shelf = [...this.shelf, ...rankings];
        this.loading = false;
        this.finish = true;
        this.observing = false;
        this.resourses = items.status == 200 ? false : true;
        if (items.status == 206) {
          setTimeout(() => {
            this.intersect()
          }, 1500)
        }
      } catch (err) {
        this.finish = true;
        this.observing = false;
        setTimeout(() => {
          this.fetchProducts()
        }, 3000)
        console.log(err)
      }
    },
    fecthReviews(products) {
      let ids = products.map(item => item.productId)
      return axios({
          method: 'get',
          url: `https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids=${ids}`,
          headers: { YVStoreKey: 'your api key'}
      }).then( reviews => {
          for (let review of reviews.data.Element) {
            products.find(shelf => shelf.productId == review.ProductId).reviews = review
          }
      return products
      }).catch(() => products)
    },
    toggleFilter() {
      this.filterOpen = !this.filterOpen;
      this.sortOpen   = false;
    },
    toggleSort() {
      this.sortOpen   = !this.sortOpen;
      this.filterOpen = false;
    },
    intersect(){
      const io = new IntersectionObserver(([entry], observer) => {
          if (entry.isIntersecting && this.resourses && this.finish) {
              this.observing = true;
              this.from   = this.to + 1;
              this.to     = this.to + 8;
              this.fetchProducts()
              observer.disconnect();
            }
      });
        io.observe(this.observer)      
    }
  },
  beforeCreate() {

    const trees      = `<cluster-trees
                            v-on:change-data="updateData"
                        />`;

    const price     = `<price  
                            v-on:change-data="updateData"
                        />`;

    const sortbutton = `<sort-button
                            v-on:change-data="updateData"
                        />`;

    const shelfs     = `<shelfs
                            v-bind:products="shelf"
                            v-bind:loader="loading"
                        />`;

    const layer     = `<layer
                            v-bind:department="' '"
                            v-bind:category="categories"
                        />`;

    const block     = `<block
                             v-bind:blocking="loading"
                        />`;

    const loader    = `<loader
                             v-bind:observing="observing"
                        />`;

    vueNav.insertAdjacentHTML('afterbegin', trees);
    
    vueShelfs.insertAdjacentHTML('afterbegin', shelfs);
    vueSort.insertAdjacentHTML('afterbegin', price);
    vueSort.insertAdjacentHTML('beforeend', layer);
    vueSort.insertAdjacentHTML('beforeend', sortbutton);
    vueNav.insertAdjacentHTML('beforeend', block);
    vueShelfs.insertAdjacentHTML('afterend', loader);
  },
  created(){
    this.fetchProducts();
  },
  mounted() {
    if(vueContainer.querySelector('.navigation')){
      vueContainer.querySelector('.navigation').remove();
    }
  },
});

Vue.config.devtools = true