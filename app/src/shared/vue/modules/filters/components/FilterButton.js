
export default {
		template: '<button :class="{&#39;filter__button&#39;:true,&#39;filter__button--active&#39;:filterunlock}" v-on:click="$emit(&#39;filter-display&#39;)">Filtros</button>',
  name  : 'filter-button',
  props :  ['filterunlock']
}
