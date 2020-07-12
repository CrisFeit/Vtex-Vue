
export default {
		template: '<h2 class="trees__layer">{{ chosen }}</h2>',
  name  : 'layer',
  props : {
      department :String,
      category   :String
  },
  computed :{
    chosen(){
      if(this.category !== ''){
        return this.category.indexOf('/') != -1 ? this.category.split('/')[1] : this.category
      }else{
        return this.department.indexOf('/') != -1 ? this.department.split('/')[1] : this.department
      }
    }
  },
}
