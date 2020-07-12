
import { mixinComponents } from '../mixins/mixin-components';
export default {
		template: '<section class="sort" v-on:mouseleave="display = false" v-on:mouseenter="display = true"><template v-if="isMobile()"><button :class="{&#39;sort__mobile-btn&#39;:true,&#39;sort__mobile-btn--active&#39;:sortunlock}" v-on:click="$emit(&#39;sort-display&#39;)">Ordem</button><transition name="slide-up"><div :class="{&#39;sort__dropdown-box&#39;:true,&#39;sort__dropdown-box--open&#39;:sortunlock}"><p class="sort__title">Ordenação<button class="filter__close" v-on:click="$emit(&#39;sort-display&#39;)"></button></p><template v-for="(val,key) in orders"><label :class="{&#39;sort__item--chosen&#39;: update.data == key ,&#39;sort__item&#39;:true}" :for="key" :key="val" v-on:click="uncheck">{{ val }}<input type="radio" class="input__radio" :key="key" :value="key" :id="key" v-model="update.data" v-on:change="sorter"></label></template></div></transition></template><template v-else=""><button :class="{&#39;sort__dropdown-btn&#39;:true,&#39;sort__dropdown-btn--open&#39;:display}" @click="display = !display">Ordenar</button><transition name="slide-down"><div class="sort__dropdown-box" v-show="display"><template v-for="(val,key) in orders"><label :class="{&#39;sort__item--chosen&#39;: update.data == key ,&#39;sort__item&#39;:true}" :for="key" :key="val" v-on:click="uncheck">{{ val }}<input type="radio" class="input__radio" :key="key" :value="key" :id="key" v-model="update.data" v-on:change="sorter"></label></template></div></transition></template></section>',
  name  : 'sort-button',
  props  : ['sortunlock'],
  mixins : [mixinComponents],
  data() {
    return {
      display   : false,
      orders    :{
        OrderByNameASC          : 'A - Z',
        OrderByNameDESC         : 'Z - A',
        OrderByPriceDESC        : 'Maior Pre\u00E7o',
        OrderByPriceASC         : 'Menor Pre\u00E7o',
        OrderByTopSaleDESC      : 'Mais Vendidos',
        OrderByBestDiscountDESC : 'Melhor Desconto',
        OrderByReleaseDateDESC  : 'Data de lan\u00E7amento',
      },
      update    : {
        name    : 'sort',
        data    : '',
      }
    }
  },
  methods : {
    sorter() {
      this.$emit('change-data',this.update)
      this.$emit('sort-display');
      this.$emit('apply-filters');
    },
    uncheck(){
      if(this.update.data == event.target.value){
          this.update.data = '';
          this.sorter();
      }
        this.display = false;
    },
  },
}
