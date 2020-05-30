<template>
  <section class="sort">
    <button :class="{'sort__dropdown-btn':true,'sort__dropdown-btn--active':sortunlock}"
     v-on:click="$emit('sort-display')">Ordem</button>
     <transition name="slide-up">
    <div :class="{'sort__dropdown-box':true,'sort__dropdown-box--open':sortunlock}">
      <p class="sort__title">Ordenação
              <button class="filter__close" v-on:click="$emit('sort-display')"></button>
      </p>
      <template v-for="(val,key) in orders" >
        <label :class="{'sort__item--chosen': update.data == key ,'sort__item':true}" 
          :for="key" 
          :key="val"
          v-on:click="uncheck"
          >{{ val }}
        <input type="radio" class="input__radio"
          :key="key"
          :value="key"
          :id="key" 
          v-model="update.data" 
          v-on:change="sorter"
          >
        </label>
      </template>
    </div>
     </transition>
  </section>
</template>

<script>
export default {
  name   : 'sort-button',
  props  : ['sortunlock'],
  data() {
    return {
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
      this.$emit('change-data',this.update);
      this.$emit('sort-display');
      this.$emit('apply-filters');
    },
    uncheck(){
      if(this.update.data == event.target.value){
          this.update.data = '';
          this.sorter();
      }
    },
  },
}
</script>