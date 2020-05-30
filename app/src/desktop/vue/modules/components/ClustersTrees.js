
import { getCategories} from "../cluster/_clusterHelpers";

export default {
		template: '<section class="trees trees--cluster" v-if="!search"><h5 class="trees__title">Categoria</h5><section :class="{&#39;trees__box&#39;:true,&#39;trees__overflow&#39;:dept || cat}" v-on:mouseleave="hideSub()"><template v-for="category in categories"><div :class="{&#39;trees__branch&#39;:true,&#39;trees__resize&#39;: cat}" v-if="typeof category === &#39;object&#39;" v-bind:key="category.mainCategory"><label :class="{&#39;trees__label&#39;:true,&#39;trees__label--hover&#39;:hoverLabel == category.mainCategory,&#39;trees__label--active&#39;: activeLabel == category.mainCategory}" v-bind:for="category.mainCategory" v-on:click="uncheck" v-on:mouseenter="displaySub(category.mainCategory)"><figure class="trees__figure"><i class="trees__img" :title="category.mainCategory"></i></figure><h6 class="trees__label-title">{{ category.mainCategory }} </h6><input type="radio" class="input__radio" v-bind:id="category.mainCategory" v-bind:value="category.mainCategory" v-on:change="filtrate" v-model="update.data"></label><transition name="slide-down" :key="category.mainCategory+&#39;-childs&#39;"><div :class="{&#39;trees__sub-box&#39;:true,&#39;trees__sub-under&#39;: dept,&#39;trees__sub-side&#39;:cat,&#39;trees__sub-slide&#39;:!dept &amp;&amp; !cat}" v-show="activePanel === category.mainCategory || cat"><label v-for="sub in category.subCategory" :class="{&#39;trees__sub-label&#39;:true,&#39;trees__sub-label--active&#39;:activeLabel == category.mainCategory+&#39;/&#39;+sub}" v-bind:for="sub" v-bind:key="sub" v-on:click="uncheck"> {{ sub }}<input type="radio" class="input__radio" v-bind:id="sub" v-bind:value="`${category.mainCategory}/${sub}`" v-on:change="filtrate" v-model="update.data"></label></div></transition></div><div v-else="" :class="{&#39;trees__branch&#39;:true,&#39;trees__resize&#39;: cat,&#39;trees__resize-2&#39;: categories.length > 1 &amp;&amp;categories.length < 3}" :key="category"><label :class="{&#39;trees__label&#39;:true,&#39;trees__label--hover&#39;:hoverLabel == category,&#39;trees__label--active&#39;: activeLabel == category}" v-bind:for="category" v-on:click="uncheck" v-on:mouseenter="displaySub(category)"><figure class="trees__figure"><i class="trees__img" :title="category"></i></figure><h6 class="trees__label-title">{{ category }} </h6><input type="radio" class="input__radio" v-bind:id="category" v-bind:value="category" v-on:change="filtrate" v-model="update.data"></label></div></template></section></section>',
  name: 'cluster-trees',
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
     }
    }
}
