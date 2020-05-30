
export default {
		template: '<div class="apply"><button class="apply__button apply__button--left" v-on:click="clear">Limpar</button><button class="apply__button apply__button--right" v-on:click="apply">Filtrar</button></div>',
  name  : 'apply-button',
  methods : {
    clear(){
      this.$emit('clear-filters');
    },
    apply(){
      this.$emit('apply-filters');
      this.$emit('filter-display');
    }
  }
}
