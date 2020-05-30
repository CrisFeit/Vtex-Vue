<template>
  <section class="filter__price">
    <p class="filter__price-title">Faixa de Pre\u00E7o</p>
    <div class="filter__price-wrap">
      <span class="filter__price-value">R$ 0</span>
    <input class="filter__price-slider" type="range" 
            min="0" 
            max="500" 
            step="1"
            v-model="update.data"
            v-on:change="precify()" 
    />
    <span class="filter__price-value">R$ {{update.data}},00</span>
    </div>
  </section>
</template>

<script>
export default {
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
      this.$emit('change-data',this.update)
    },
  }
}
</script>