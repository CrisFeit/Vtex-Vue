
import { mixinComponents } from '../mixins/mixin-components'
       
export default {
		template: '<section class="shelf__container"><template v-if="products.length > 0"><div class="product" v-for="product in destuct" v-bind:key="product.id" v-on:mouseenter="activePanel = product.id" v-on:mouseleave="erase()" v-on:touchstart="erase() ,activePanel = product.id"><like-button class="product__wishlist" :product-id="product.id"></like-button><template v-if="product.available &amp;&amp; !containSkus(product.items)"><section class="flag"><div class="flag__item flag__discount--corner" v-if="product.available.discount"><span class="flag__text">{{product.available.flag}}% OFF</span></div></section><a class="product__link" :href="product.link"><img class="product__img" :src="cut(product.available.img)"><section v-if="isMobile()" class="product__buy"><button class="product__buy-button js--shelf-buy" :data-sku="product.available.id">Adicionar</button></section><section v-else="" :class="{&#39;product__buy&#39;:true,&#39;product__buy--open&#39;:activePanel == product.id}"><button class="product__buy-button js--shelf-buy" :data-sku="product.available.id">Adicionar</button></section></a><div class="product__rating"><template v-if="product.stars"><div class="rating" v-html="ranking(product.stars)"></div><p class="rating__totals">{{product.reviews}} Avaliações</p></template></div><h4 class="product__name">{{ product.available.name }} </h4><div class="product__info"><p class="product__discount" v-if="product.available.discount">{{ precify(product.available.ListPrice)  }}</p><p class="product__price">{{ precify(product.available.price) }}</p><p class="product__installments" v-if="product.available.installments">{{ product.available.installments }}</p></div></template><template v-else-if="product.available &amp;&amp; containSkus(product.items)"><section class="flag"><div class="flag__item flag__discount--corner" v-if="product.available.discount"><span class="flag__text">{{product.available.flag}}% OFF</span></div></section><template v-if="isMobile()"><a class="product__link" :href="product.link"><img class="product__img" :src="cut(product.available.img)"></a><i class="thumb__selection-shadow-up"></i><section class="thumb__container"><div v-if="containSkus(product.items)" class="thumb__selection"><template v-for="thumb in product.items"><label :key="thumb.itemId" v-if="thumb.sellers[0].commertialOffer.AvailableQuantity" :for="thumb.itemId" :class="{&#39;thumb__label&#39;:true,&#39;thumb__label--active&#39;: product.available.id == thumb.itemId}"><figure class="thumb__figure"><i class="thumb__img" :style="{&#39;background-image&#39;:&#39;url(&#39;+cutThumb(thumb.images)+&#39;)&#39;}"></i></figure><input type="radio" class="input__radio" :id="thumb.itemId" :value="thumb" v-model="chosen" v-on:change="product.available = changeSku(thumb) "></label></template></div></section><i class="thumb__selection-shadow-down"></i><section class="product__buy"><button class="thumb__buy product__buy-button js--shelf-buy" :data-sku="product.available.id">Adicionar</button></section></template><template v-else=""><a class="product__link" :href="product.link"><img class="product__img" :src="cut(product.available.img)"><section :class="{&#39;product__buy&#39;:true,&#39;product__buy--open&#39;:activePanel == product.id}"><div class="thumb__container" v-if="containSkus(product.items) &amp;&amp; chosen.itemId != product.available.id"><div class="thumb__selection"><p class="thumb__title">Escolha uma cor</p><template v-for="thumb in product.items"><label v-if="thumb.sellers[0].commertialOffer.AvailableQuantity" :key="thumb.itemId" :for="thumb.itemId" :title=" thumb.hasOwnProperty(&#39;Escolha a Cor&#39;) ? thumb[&#39;Escolha a Cor&#39;][0] : thumb.name" :class="{&#39;thumb__label&#39;:true,&#39;thumb__label--active&#39;: product.available.id == thumb.itemId}" v-on:mouseenter="chosen = {},product.available = changeSku(thumb)"><figure class="thumb__figure"><i class="thumb__img" :style="{&#39;background-image&#39;:&#39;url(&#39;+cutThumb(thumb.images)+&#39;)&#39;}"></i></figure><input type="radio" class="input__radio" :id="thumb.itemId" :value="thumb" v-model="chosen" v-on:change="product.available = changeSku(thumb)"></label></template></div></div><button v-if="chosen.itemId == product.available.id" class="thumb__buy product__buy-button js--shelf-buy" :data-sku="product.available.id">Adicionar</button></section></a></template><div class="product__rating"><template v-if="product.stars"><div class="rating" v-html="ranking(product.stars)"></div><p class="rating__totals">{{product.reviews}} Avaliações</p></template></div><h4 class="product__name">{{ product.available.name }} </h4><div class="product__info"><p class="product__discount" v-if="product.available.discount">{{  precify(product.available.ListPrice)  }}</p><p class="product__price">{{ precify(product.available.price) }}</p><p class="product__installments" v-if="product.available.installments">{{ product.available.installments }}</p></div></template><template v-else=""><a class="product__link" :href="product.link"><img class="product__img" :src="cut(product.img)"></a><div class="product__rating"><template v-if="product.stars"><div class="rating" v-html="ranking(product.stars)"></div><p class="rating__totals">{{product.reviews}} Avaliações</p></template></div><h4 class="product__name product__name--out">{{ product.name }} </h4><p class="product__outOfStock">Produto Indisponível</p></template></div></template><div class="shelf__empty" v-else-if="!loader"><div class="shelf__empty-text">Busca Vazia</div></div><section v-show="loader" class="loading"><div class="loading__box"><div class="loading__spinner"></div></div></section></section>',
  name  : 'shelfs',
  mixins: [mixinComponents],
  props : {
    products : Array,
    loader   : Boolean,
  },
  data(){
    return {
      imageSize   :  window.innerWidth < 380  ? '-200-200' : 
                     window.innerWidth < 768  ? '-225-225' :
                     window.innerWidth < 1500 ? '-250-250' : '-350-350',

      thumbSize   :  window.innerWidth < 380  ? '-40-40'  :
                     window.innerWidth < 768  ? '-50-50'  :
                     window.innerWidth < 1500 ? '-55-55'  : '-60-60',
      activePanel :  '',
      activeLabel :  '',
      chosen      :  {},
    }
  },
  computed:{
    destuct(){
        return this.products.map(item => {
          return {
          id            : item.productId,
          name          : item.productName,
          link          : item.link,
          stars         : item.reviews.Rating || false,
          reviews       : item.reviews.TotalRatings || false,
          items         : item.items,
          img           : item.items[0].images[0],
          available     : this.verify(item.items),
         }
        })
      }
  },
  
  methods : {
    precify(value){
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
    changeSku(sku){
      const available = {
        name          : sku.name,
        id            : sku.itemId,
        img           : sku.images[0],
        installments  : this.credit(sku.sellers[0].commertialOffer.Installments.filter(item => {
              return item.PaymentSystemName == "Visa"
            }))
      }
       if(sku.sellers[0].commertialOffer.ListPrice !== sku.sellers[0].commertialOffer.Price){
          available.discount      = true;
          available.ListPrice     = sku.sellers[0].commertialOffer.ListPrice;
          available.price         = sku.sellers[0].commertialOffer.Price;
          available.flag          = Math.round((available.ListPrice - available.price) * 100 / available.ListPrice)
       }else{
          available.discount      = false;
          available.price         = sku.sellers[0].commertialOffer.Price;
       }
       return available
    },
    verify(skus){
      let availableIndex =  skus.findIndex( current => current.sellers[0].commertialOffer.AvailableQuantity)

      if(availableIndex != -1){
      const available = {
        name          : skus[availableIndex].name,
        id            : skus[availableIndex].itemId,
        img           : skus[availableIndex].images[0],
        index         : availableIndex,
        installments  : this.credit(skus[availableIndex].sellers[0].commertialOffer.Installments.filter(item => {
              return item.PaymentSystemName == "Visa"
            }))
      }
       if(skus[availableIndex].sellers[0].commertialOffer.ListPrice !== skus[availableIndex].sellers[0].commertialOffer.Price){
          available.discount      = true;
          available.ListPrice     = skus[availableIndex].sellers[0].commertialOffer.ListPrice;
          available.price         = skus[availableIndex].sellers[0].commertialOffer.Price;
          available.flag          = Math.round((available.ListPrice - available.price) * 100 / available.ListPrice)       
       }else{
          available.discount      = false;
          available.price         = skus[availableIndex].sellers[0].commertialOffer.Price;
       }
       return available
      }else{
        return false
      }
    },
    containSkus(products){
      return products.filter(item => item.sellers[0].commertialOffer.AvailableQuantity).length > 1
    },
    credit(card){
      return card.length > 1 ?  `${card.length}x de ${card[card.length-1].Value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : false
    },
    cut(objImg){
      let  id = objImg.imageId
      return (objImg.imageUrl.replace(id,id+this.imageSize))
    },
    cutThumb(arrayImg){
      let thumb = arrayImg.length > 1 ? arrayImg[arrayImg.findIndex(item => item.imageLabel.toLowerCase() == 'thumb'  )]  || arrayImg[1] : arrayImg[0]
     
      let id    = thumb.imageId
      return (thumb.imageUrl.replace(id,id+this.thumbSize))
    },
    erase(){
        this.activePanel = ''
        this.chosen      = {}
      },
    ranking(stars){
      let template = ''
      
      for(let i = 1; i <= stars; i++){
        template += `
          <i class="rating__stars rating__stars--full"></i>
        `
      }
      if(stars > Math.floor(stars)){
        template += `
            <i class="rating__stars rating__stars--half"></i>
        `
        stars++;
      }
      while(stars < 5){
        template += `
            <i class="rating__stars rating__stars--empty"></i>
        `
        stars++
      }
      return template;
    }
  }
}

