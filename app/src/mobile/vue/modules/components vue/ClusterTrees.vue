<template>
  <section class="trees filter__item" v-if="!search">
     <h5 class="trees__title">Categorias</h5>
    <section :class="{'trees__box':true,'trees__box-resize':categories.length == 2}">
    <template v-for="category in categories">
      <div :class="{'trees__branch':true,'trees__branch-category': cat}"
           v-if="typeof category === 'object'"
           v-bind:key="category.mainCategory"
      >
        <label  :class="{'trees__label':true,'trees__label--active': activeLabel == category.mainCategory}"
                v-bind:for="category.mainCategory"
                v-on:click="uncheck"
        >
        <figure class="trees__figure">
          <i class="trees__img" :title="category.mainCategory"></i>
        </figure>
          <h6 class="trees__label-title">{{ category.mainCategory }} </h6>
          <input type="radio" class="input__radio"
                v-bind:id="category.mainCategory"
                v-bind:value="category.mainCategory"
                v-on:change="filtrate"
                v-model="update.data"
          />
        </label>
        <div class="trees__sub-box"
             v-show="cat"
        >
          <label
            v-for="sub in category.subCategory"
            :class="{'trees__sub-label':true,'trees__sub-label--active':activeLabel == category.mainCategory+'/'+sub}"
            v-bind:for="sub"
            v-bind:key="sub"
            v-on:click="uncheck"
          > {{ sub }}
            <input type="radio" class="input__radio"
              v-bind:id="sub"
              v-bind:value="`${category.mainCategory}/${sub}`"
              v-on:change="filtrate"
              v-model="update.data"
            />
          </label>
        </div>
      </div>
        <div v-else :class="{'trees__branch':true,'trees__branch--category': cat}" :key="category">
          <label 
                :class="{'trees__label':true,'trees__label--active': activeLabel == category}" 
                v-bind:for="category" 
                v-on:click="uncheck"
          >
            <figure class="trees__figure" >
                  <i class="trees__img" :title="category"></i>
            </figure>
                  <h6 class="trees__label-title">{{ category }} </h6>
            <input type="radio" class="input__radio"
                    v-bind:id="category"
                    v-bind:value="category"
                    v-on:change="filtrate "
                    v-model="update.data"
            />
          </label>
        </div>
    </template>
    </section>
  </section>
</template>
  
<script>
import { getCategories} from "../cluster/_clusterHelpers";

export default {
  name: 'cluster-trees',
  data() {
    return {
      categories: getCategories(),
      update    : {
        name    : 'categories',
        data    :  '',
      },
      activeLabel : '',
    };
  },
  computed: {
    dept() {
      return this.categories.length > 2;
    },
    cat() {
      return this.categories.length < 2;
    },
    search() {
      return this.categories.length < 1;
    }
  },
  methods: {
    uncheck(){
      if(this.update.data == event.target.value){
        this.update.data = '';
        this.activeLabel = '';
        this.filtrate();
      }
    },
    filtrate() {
      this.$emit('change-data', this.update);
      this.activeLabel = this.update.data;
    },
    cleaner(){
      this.update.data = '';
      this.activeLabel = '';
      this.filtrate();
    }
  }
}
</script>