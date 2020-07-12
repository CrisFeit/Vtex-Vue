<template>
    <button :class="{'filter__button':true,'filter__button--active':filterunlock}" v-on:click="$emit('filter-display')">Filtros</button>
</template>

<script>
export default {
  name  : 'filter-button',
  props :  ['filterunlock']
}
</script>