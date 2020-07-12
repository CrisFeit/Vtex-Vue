import '../../../../../../../config/node_modules/@babel/runtime/regenerator/index';
import axios from '../../../../../../../config/node_modules/axios/dist/axios';
import overlay from '../../../../js/modules/general/overlay'
import { vueContainer, vueNav, vueShelfs,vueFilters, specifics, marcas } from '../category/_categorySelectors';
import components from '../components/Components';

export const mixinMobile = {
  el: vueContainer,
  components,
  data: {
    loading     : true,
    finish      : true,
    filterOpen  : false,
    sortOpen    : false,
    resourses   : false,
    department  : ' ',
    categories  : '',
    sort        : '',
    shelf       : [],
    price       : 500,
    from        : 0,
    to          : 3,
    observing   : false,
    observer    : document.getElementById('vueObserver'),
  },
  methods: {
    clear(){
      this.$refs.clearTrees.cleaner();
      this.$refs.clearPrice.cleaner();
      if (specifics) {
          this.$refs.clearType.cleaner();  
      }
      if (marcas) {
        this.$refs.clearBrands.cleaner()
      }
    },
    applyRequest(){
      this.shelf  = [];
      this.fetchProducts();
      this.loading      = true;
      window.scrollTo(0,180);
    },
    updateData(update) {
      this[update.name] = update.data;
      this.from         = 0;
      this.to           = 3;
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
          }, 3000)
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
          headers: { YVStoreKey: '46589e5a-a798-49cf-a104-c4211c95666e'}
      }).then( reviews => {
          for (let review of reviews.data.Element) {
            products.find(shelf => shelf.productId == review.ProductId).reviews = review
          }
      return products
      }).catch(() => products)
    },
    toggleFilter() {
      document.getElementById('vue-mobile-nav').classList.toggle('filters__box--open')
      this.sortOpen   = false;
      this.filterOpen = !this.filterOpen;
      this.filterOpen ? overlay.open() : overlay.close();
    },
    toggleSort() {
      document.getElementById('vue-mobile-nav').classList.remove('filters__box--open')
      this.sortOpen   = !this.sortOpen;
      this.filterOpen = false;
      this.sortOpen  ? overlay.open() : overlay.close();
    },
    intersect(){
      const io = new IntersectionObserver(([entry], observer) => {
          if (entry.isIntersecting && this.resourses && this.finish) {
              this.observing = true;
              this.from   = this.to + 1;
              this.to     = this.to + 4;
              this.fetchProducts();
              observer.disconnect();
            }
      });
        io.observe(this.observer)      
    }
  },
  beforeCreate() {


    const layer     = `<layer
                              v-bind:department="department"
                              v-bind:category="categories"
                        />`;

    const price     = `<price ref="clearPrice" 
                              v-on:change-data="updateData"
                              v-on:filter-display="toggleFilter"
                        />`;

    const shelfs     = `<shelfs
                              v-bind:products="shelf"
                              v-bind:loader="loading"
                        />`;


    const loader    = `<loader
                             v-bind:observing="observing"
                        />`;
                        
    const sortbutton = `<sort-button
                              v-bind:sortunlock="sortOpen"
                              v-on:apply-filters="applyRequest"
                              v-on:sort-display="toggleSort"
                              v-on:change-data="updateData"
                        />`;

    const filterbutton =  `<filter-button
                              v-bind:filterunlock="filterOpen"
                              v-on:filter-display="toggleFilter"
                           />`;
                           
    const applybutton =  `<apply-button
                              v-on:filter-display="toggleFilter"  
                              v-on:apply-filters="applyRequest"
                              v-on:clear-filters="clear"
                           />`;

    
    const types      = `<types  ref="clearType"
                              v-on:change-data="updateData"
                              v-on:filter-display="toggleFilter"
                      />`;

    const brands     = `<brands ref="clearBrands" 
                              v-on:change-data="updateData"
                              v-on:filter-display="toggleFilter"
                      />`;



    if (specifics) {
    vueNav.insertAdjacentHTML('beforeend', types);
    }
    if (marcas) {
    vueNav.insertAdjacentHTML('beforeend', brands);
    }
    vueShelfs.insertAdjacentHTML('afterbegin', shelfs);
    vueShelfs.insertAdjacentHTML('beforebegin', layer);
    vueShelfs.insertAdjacentHTML('afterend', loader);
    vueNav.insertAdjacentHTML('beforeend', price);
    vueNav.insertAdjacentHTML('beforeend', applybutton);
    vueFilters.insertAdjacentHTML('afterbegin', filterbutton);
    vueFilters.insertAdjacentHTML('afterend', sortbutton);
  },
  created(){
    this.fetchProducts();
  },
  mounted() {
    document.querySelector('.overlay').addEventListener('click',()=>{
      this.filterOpen ? this.toggleFilter() : this.sortOpen ? this.toggleSort() : null;
    });
  },
};