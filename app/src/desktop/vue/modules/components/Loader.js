
export default {
		template: '<div class="observer__box" v-show="observing"><div class="observer__spinner"></div></div>',
  name  : 'loader',
  props : {
    observing : Boolean
  }
}
