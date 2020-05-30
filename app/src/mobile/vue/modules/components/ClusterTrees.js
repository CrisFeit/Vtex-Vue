
import { getCategories} from "../cluster/_clusterHelpers";

export default {
		template: '<section class="trees filter__item" v-if="!search"><h5 class="trees__title">Categorias</h5><section :class="{&#39;trees__box&#39;:true,&#39;trees__box-resize&#39;:categories.length == 2}"><template v-for="category in categories"><div :class="{&#39;trees__branch&#39;:true,&#39;trees__branch-category&#39;: cat}" v-if="typeof category === &#39;object&#39;" v-bind:key="category.mainCategory"><label :class="{&#39;trees__label&#39;:true,&#39;trees__label--active&#39;: activeLabel == category.mainCategory}" v-bind:for="category.mainCategory" v-on:click="uncheck"><figure class="trees__figure"><i class="trees__img" :title="category.mainCategory"></i></figure><h6 class="trees__label-title">{{ category.mainCategory }} </h6><input type="radio" class="input__radio" v-bind:id="category.mainCategory" v-bind:value="category.mainCategory" v-on:change="filtrate" v-model="update.data"></label><div class="trees__sub-box" v-show="cat"><label v-for="sub in category.subCategory" :class="{&#39;trees__sub-label&#39;:true,&#39;trees__sub-label--active&#39;:activeLabel == category.mainCategory+&#39;/&#39;+sub}" v-bind:for="sub" v-bind:key="sub" v-on:click="uncheck"> {{ sub }}<input type="radio" class="input__radio" v-bind:id="sub" v-bind:value="`${category.mainCategory}/${sub}`" v-on:change="filtrate" v-model="update.data"></label></div></div><div v-else="" :class="{&#39;trees__branch&#39;:true,&#39;trees__branch--category&#39;: cat}" :key="category"><label :class="{&#39;trees__label&#39;:true,&#39;trees__label--active&#39;: activeLabel == category}" v-bind:for="category" v-on:click="uncheck"><figure class="trees__figure"><i class="trees__img" :title="category"></i></figure><h6 class="trees__label-title">{{ category }} </h6><input type="radio" class="input__radio" v-bind:id="category" v-bind:value="category" v-on:change="filtrate " v-model="update.data"></label></div></template></section></section>',
  name: 'cluster-trees',
  data() {
    return {
      categories: getCategories(),
      update    : {
        name    : 'categories',
        data    :  '',
      },
      activeLabel : '',
    };
  },
  computed: {
    dept() {
      return this.categories.length > 2;
    },
    cat() {
      return this.categories.length < 2;
    },
    search() {
      return this.categories.length < 1;
    }
  },
  methods: {
    uncheck(){
      if(this.update.data == event.target.value){
        this.update.data = '';
        this.activeLabel = '';
        this.filtrate();
      }
    },
    filtrate() {
      this.$emit('change-data', this.update);
      this.activeLabel = this.update.data;
    },
    cleaner(){
      this.update.data = '';
      this.activeLabel = '';
      this.filtrate();
    }
  }
}
