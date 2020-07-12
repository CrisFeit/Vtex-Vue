import '../../../../../../../config/node_modules/@babel/runtime/regenerator/index';
import axios from '../../../../../../../config/node_modules/axios/dist/axios';
import { vueContainer, vueNav, vueShelfs,vueSort,specifics,marcas} from '../category/_categorySelectors';
import components from '../components/Components';

export const mixin = {
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
      shelf       : [],
      sort        : window.location.search.indexOf('?O=') != -1 ? window.location.search.split('?O=')[1] : '',
      price       : 500,
      from        : 0,
      to          : 7,
      observing   : false,
      observer    : document.getElementById('vueObserver')
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
            headers: { YVStoreKey: '46589e5a-a798-49cf-a104-c4211c95666e'}
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

    
    const types      = `<types  
                                    v-on:change-data="updateData"
                        />`;

    const brands     = `<brands  
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
                            v-bind:department="department"
                            v-bind:category="categories"
                        />`;

    const block     = `<block
                             v-bind:blocking="loading"
                        />`;

    const loader    = `<loader
                             v-bind:observing="observing"
                        />`;

    if (specifics) {
      vueNav.insertAdjacentHTML('beforeend', types);
    }
    if (marcas) {
      vueNav.insertAdjacentHTML('beforeend', brands);
    }
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
  }