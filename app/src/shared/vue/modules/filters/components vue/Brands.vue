<template>
  <section class="brands filter__item">
    <h5 class="brands__title">{{ title }}</h5>
      <button v-if="!isMobile()"
              class="filter__cleaner"
              v-show="update.data.length > 1"
              v-on:click="cleaner"
        >Limpar</button>
    <section class="brands__box">
        <label  v-for="brand in brands.thumbs"
               :key="brand.name"
               :title="brand.name"
               :class="['brands__label',{'brands__label--active': update.data.includes(brand.link)}]" 
               v-bind:for="brand.name"
               :alt="brand.name"
        >
                {{ brand.name}}
        <input type="checkbox" class="input__radio"
                v-bind:id="brand.name"
                v-bind:value="brand.link"
                v-on:change="filtrate"
                v-model="update.data"
        />
       </label>
    </section>
  </section>
</template>
  
<script>
import { getBrands } from "../category/_categoryHelpers";
import { mixinComponents } from '../mixins/mixin-components';
export default {
  name: 'brands',
  mixins : [mixinComponents],
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
    filtrate() {      
      this.$emit('change-data', this.update);
      },
    cleaner(){
        this.update.data = ['']
        this.filtrate()
    }
    }
  };
</script>