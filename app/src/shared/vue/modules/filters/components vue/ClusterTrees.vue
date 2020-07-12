<template>
  <section class="trees trees--cluster filter__item" v-if="!search">
    <template v-if="isMobile()">
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
    
    </template>
    <template v-else>
    <section  class="trees__box trees__box--cluster"
              v-on:mouseleave="hideSub()"
    >
    <template v-for="category in categories">
      <div :class="{'trees__branch':true ,'trees__branch--cluster':cluster}"
           v-if="typeof category === 'object'" 
           v-bind:key="category.mainCategory"
      >
        <label  :class="{'trees__label':true,'trees__label--hover':hoverLabel === category.mainCategory,'trees__label--active': activeLabel === category.mainCategory}"
                v-bind:for="category.mainCategory"
                v-on:click="uncheck"
                v-on:mouseenter="displaySub(category.mainCategory)"
        >
        <figure class="trees__figure">
          <i class="trees__img" :title="category.mainCategory"></i>
        </figure>
          <h6 class="trees__label-title">{{ category.mainCategory }} </h6>
          <input  type="radio" class="input__radio"
                  v-bind:id="category.mainCategory"
                  v-bind:value="category.mainCategory"
                  v-on:change="filtrate"
                  v-model="update.data"
          />
        </label>
        <transition name="slide-down" :key="category.mainCategory+'-childs'">
        <div class="trees__sub-box trees__sub-slide"             
             v-show="activePanel === category.mainCategory"
        >
          <label
            v-for="sub in category.subCategory"
            :class="{'trees__sub-label':true,'trees__sub-label--active':activeLabel === `${category.mainCategory}/${sub}`}"
            v-bind:for="`${category.mainCategory}/${sub}`"
            v-bind:key="`${category.mainCategory}/${sub}`"
            v-on:click="uncheck"
          > {{ sub }}
            <input type="radio" class="input__radio"
              v-bind:id="`${category.mainCategory}/${sub}`"
              v-bind:value="`${category.mainCategory}/${sub}`"
              v-on:change="filtrate"
              v-model="update.data"
            />
          </label>
        </div>
        </transition>
        </div>
        <div  v-else :class="{'trees__branch':true,'trees__resize': cat,'trees__resize-2': categories.length > 1 &&categories.length < 3}" :key="category">
          <label 
                :class="{'trees__label':true,'trees__label--hover':hoverLabel == category,'trees__label--active': activeLabel == category}" 
                v-bind:for="category" 
                v-on:click="uncheck"
                v-on:mouseenter="displaySub(category)"
          >
            <figure class="trees__figure" >
                  <i class="trees__img" :title="category"></i>
            </figure>
                  <h6 class="trees__label-title">{{ category }} </h6>
            <input type="radio" class="input__radio"
                    v-bind:id="category"
                    v-bind:value="category"
                    v-on:change="filtrate"
                    v-model="update.data"
            />
          </label>
        </div>
    </template>
    </section>
    </template>
  </section>
</template>
  
<script>
import { getCategories} from "../cluster/_clusterHelpers";
import { mixinComponents } from '../mixins/mixin-components';

export default {
  name: 'cluster-trees',
  mixins : [mixinComponents],
  data() {
    return {
      categories: getCategories(),
      update    : {
        name    : 'categories',
        data    :  '',
      },
      activePanel : '',
      hoverLabel  : '',
      activeLabel : '',
    };
  },
  computed: {
    dept() {
      return this.categories.length > 6;
    },
    cat() {
      return this.categories.length < 2;
    },
    search() {
      return this.categories.length < 1;
    },
    cluster() {
      return this.categories.length < 4;
    }
  },
  methods: {
    uncheck(){
      if(this.update.data === event.target.value){
        this.update.data = '';
        this.activeLabel = '';
        this.filtrate();
      }
    },
    hideSub(){
      this.hoverLabel   = '';
      this.activePanel  = '';
    },
    displaySub(sub){
      this.hoverLabel = sub;
      this.activePanel = sub;
    },
    filtrate() {
      this.$emit('change-data', this.update);
      this.activeLabel = this.update.data 
     },
     cleaner(){
      this.update.data = '';
      this.activeLabel = '';
      this.filtrate();
    }
    }
}
</script>