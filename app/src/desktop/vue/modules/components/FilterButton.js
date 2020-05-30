
export default {
		template: '<section><button class="filter-button" v-on:click="emitclick()">Filtrar</button><div v-show="filterunlock" class="dropdown-filter"></div></section>',
  name: 'filter-button',
  props : ['filterunlock'],
  // data() {

  // },
  methods : {
    emitclick(){
      this.$emit('filter-display');
    }
  }
}
