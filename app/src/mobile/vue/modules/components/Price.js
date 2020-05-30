
export default {
		template: '<section class="filter__price"><button class="filter__close" v-on:click="$emit(&#39;filter-display&#39;)"></button><p class="filter__price-title">Pre\u00E7o Até <span class="filter__price-value">R$ {{update.data}},00</span></p><div class="filter__price-wrap"><input class="filter__price-slider" type="range" min="0" max="500" step="1" v-model="update.data" v-on:change="precify()"></div></section>',
  name  : 'price',
  data(){
    return {  
      update    : {
        name    : 'price',
        data    : 400,
      }
    }
  },
  methods : {
    precify() {
      this.$emit('change-data',this.update);
    },
    cleaner(){
      this.update.data = 400
    }
  }
}
