
import { getTypes } from "../category/_categoryHelpers";
import { mixinComponents } from '../mixins/mixin-components';

export default {
		template: '<section class="types filter__item"><h5 class="types__title">{{ title }}</h5><button v-if="!isMobile()" class="filter__cleaner" v-show="update.data.length > 1" v-on:click="cleaner">Limpar</button><section class="types__box"><label v-for="type in types.thumbs" :key="type.name" :class="[&#39;types__label&#39;,{&#39;types__label--active&#39;: update.data.includes(type.link),&#39;types__thumb&#39;:types.title == &#39;Cor&#39;,&#39;types__text&#39;:types.title != &#39;Cor&#39;}]" v-bind:for="type.name" :title="type.name"><i v-if="types.title == &#39;Cor&#39;"></i><input type="checkbox" class="input__radio" v-bind:id="type.name" v-bind:value="type.link" v-on:change="filtrate" v-model="update.data"></label></section></section>',
  name: 'types',
  mixins: [mixinComponents],
  data() {
    return {
      types     : getTypes(),
      update    : {
        name    : 'types',
        data    :  [''],
      },
    };
  },
  computed :{
    title(){
      return this.types.title
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
    },
  };
