
import { getBrands } from "../category/_categoryHelpers";

export default {
		template: '<section class="brands filter__item"><p class="brands__title">{{ title }}</p><section class="brands__box"><label v-for="brand in brands.thumbs" :key="brand.name" :title="brand.name" :class="[&#39;brands__label&#39;,{&#39;brands__label--active&#39;: update.data.includes(brand.link)}]" v-bind:for="brand.name" :alt="brand.name">{{ brand.name}}<input type="checkbox" class="input__radio" v-bind:id="brand.name" v-bind:value="brand.link" v-on:change="filtrate" v-model="update.data"></label></section></section>',
  name: 'brands',
  data() {
    return {
      brands    : getBrands(),
      update    : {
        name    : 'brands',
        data    :  [''],
      },
    };
  },
  computed :{
    title(){
      return this.brands.title
    }
  },
  methods: {
    filtrate(){
      this.$emit('change-data', this.update);
    },
    cleaner(){
      this.update.data = ['']
      this.filtrate()
      }
    }
  };
