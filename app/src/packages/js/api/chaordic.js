/** 201809131510 */
var getCookie = function(cname) {var n = cname + "="; var d = decodeURIComponent(document.cookie);var ca = d.split(';'); for(var i = 0; i <ca.length; i++) {var c = ca[i]; while (c.charAt(0) == ' ') { c = c.substring(1); } if (c.indexOf(n) == 0) { return c.substring(n.length, c.length); }} return "";};
/* FormatMoney */
Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {places = !isNaN(places = Math.abs(places)) ? places : 2; symbol = symbol !== undefined ? symbol : "R$ "; thousand = thousand || "."; decimal = decimal || ","; var number = this, negative = number < 0 ? "-" : "", i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0; return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : ""); };
(function($, window, document, undefined) {
    'use strict';
    var $product = '<div class="__vitrines _chaordic-info" v-if="chaordic.length>0" '+
        'data-showcase="recommendations" ' +
        ':data-chaordic-index="chaordic[0].index" '+
        ':data-impression-url="chaordic[0].info.impressionUrl" ' +
        ':data-page="chaordic[0].info.page" ' +
        ':data-name="chaordic[0].info.name" ' +
        ':data-feature="chaordic[0].info.feature" ' +
        ':data-shelf="chaordic[0].info.shelf" ' +
        '>' +
        '<h2 v-html="chaordic[0].info.title"></h2>' +
        '<ul class="owl-carousel">' +
            '<li class="_prd" v-for="(item, index) in chaordic[0].recommendations">' +
                '<div class="_product" :data-prd="item.id" :data-index="index">' +
                    '<a :data-prd="item.id" :data-index="index" '+
                        ':data-shelf="chaordic[0].info.shelf" :data-feature="chaordic[0].info.feature" '+
                        ':href="item.url.fixURL()" '+
                        ':data-tracking-url="item.trackingUrl" >' +
                        '<span class="__p_img"  >' +
                            '<img class="owl-lazy" :data-src="getImage(item)" src="https://boticario.vteximg.com.br/arquivos/img-164x164-00000000.png" />' +
                        '</span>' +
                        '<span class="_p_details">' +
                            '<div class="yv-review-quickreview" :value="item.id"></div>' +
                            '<span class="__p_name">' +
                                '{{ item.name }}' +
                            '</span>' +
                            '<span class="__p_pricing_" v-if="checkStatus(item)">' +
                                '<span class="_p_price_">' +
                                    '<span class="__p_from" v-if="hasBestPrice(item)">de </span>' +
                                    '<span class="__p_price" v-if="hasBestPrice(item)">{{ item.oldPrice.formatMoney() }}</span>' +
                                '</span>' +
                                '<span class="_p_priceoffer_" v-if="checkRegularPrice(item.price)">' +
                                    '<span class="__p_by" v-if="hasBestPrice(item)">por </span>' +
                                    '<span class="__p_priceoffer">{{ item.price.formatMoney() }}</span>' +
                                '</span>' +
                                '<span class="_p_intallments" v-if="hasInstallments(item.installment)">' +
                                    'em atÃ© ' +
                                    '<strong class="__p_numberinstallments">{{ item.installment.count }}x</strong> de ' +
                                    '<strong class="__p_installmentsvalue">{{ item.installment.price.formatMoney() }}</strong>' +
                                '</span>' +
                                '<span class="__p_buy_btn">Comprar</span>' +
                            '</span>' +                    
                            '<span class="__p_outstock" v-else>Produto nÃ£o disponÃ­vel</span>' +
                        '</span>' +
                    '</a>' +
                '</div>' +
            '</li>' +
        '</ul>' +
    '</div>';

    /* ------------------------------------------------------------ *\
        #Chaordic functions
    \* ------------------------------------------------------------ */
    var startChaordic = function (cb) {
        if($('._top,._middle,._bottom,._recommendations').length<=0) {return false;}
        var pdp = false;
        var url = '', search = '', url_base = 'https://recs.chaordicsystems.com/v0/pages/recommendations';
        var cookie_name = 'chaordic_browserId';
        var data = {
            apiKey: 'boticario',
            deviceId: getCookie(cookie_name)||'dev001',
            source: 'desktop',
            secretKey: encodeURIComponent('muVf2RISm+Z2g6quTyiJSA==') // => 'muVf2RISm%2BZ2g6quTyiJSA%3D%3D'
        };
        if(document.location.pathname.length>1) {
            data.url = document.location.origin + document.location.pathname;
            var pageType = {
                'other': 'other',
                'departamento': 'category', 'departament': 'category', 'dept': 'category', 'categoria': 'subcategory', 'category': 'subcategory', 'cat': 'subcategory'
            };
            data.name = pageType[($('body').attr('id')||"other")];
            var attrChaordicMeta = $('[chaordic_meta]').attr('chaordic_meta')||"";
            if(attrChaordicMeta.length>0) {
                data.name = attrChaordicMeta;
            } 
            if('undefined'!=typeof chaordic_meta&&'undefined'!=typeof chaordic_meta.page&&
                'undefined'!=typeof chaordic_meta.page.name) {
                data.name = chaordic_meta.page.name;
            }
        } else {
            data.name = 'home';
        }
        $('._recommendations').addClass('__vitrines _top _middle _bottom');
        if($('body.produto').length>0){
            /** pdp */
            /*
            https://recs.chaordicsystems.com/v0/products/recommendations?apiKey=boticario&secretKey=muVf2RISm%2BZ2g6quTyiJSA%3D%3D&type=similar&productId[]=2003890&&&useBoughtProducts=false&useCartProducts=false&useVisitedProducts=false
            */
            pdp = true;
            data.name = "product";
            var prodId = $('h1:first #___rc-p-id').val();
            data.productId = [];
            data.productId.push(prodId);
            // data.type = 'similar';
            // url_base = 'https://recs.chaordicsystems.com/v0/products/recommendations';
            url_base = 'https://recs.chaordicsystems.com/v0/pages/recommendations';
        }
        for(var key in data) {
            search += '&' + key + '=' + data[key];
        }
        url = url_base + '?' + search.substr(1);
        $.ajax({
                url: url,
                dataType: 'json'
            })
            .success(function(p_chaordicData){
                var chaordicData = p_chaordicData;
                // if(pdp) {
                //     chaordicData = {};
                //     chaordicData.top = [];
                //     chaordicData.top.push(p_chaordicData);
                //     chaordicData.top[0].feature = "Similar";
                //     chaordicData.top[0].title = "Mais Vistos";
                //     if(chaordicData.top.length>1){
                //         chaordicData.top[1].feature = "Similar";
                //         chaordicData.top[1].title = "Mais Vendidos";
                //     }
                // }
                mountChaordic(chaordicData,data.name);
            }); // only if response 200
        return true;
    };
    String.prototype.fixURL = function () {
        return this.replace(/^.*?\//, "/");
    };
    /* ------------------------------------------------------------ *\
        #Chaordic
    \* ------------------------------------------------------------ */
    var mountChaordic = function (chaordicData,pageType) {
        var page = pageType||"other";
        var index = 0;
        $.each(chaordicData, function (label,levels) {
            $.each(levels, function (ndx,level) {
                $('._'+label).append('<chaordic/>');
                Vue.component('chaordic', {
                    template: $product,
                    data: function () {
                        return {
                            chaordic: []
                        }
                    },
                    created() {
                        this.getProduct();
                    },
                    methods: {
                        getProduct(){
                            var _this = this;
                            var data = {
                                            index: index,
                                            info: {
                                                page: page,
                                                title: level.title,
                                                name: level.name,
                                                feature: level.feature,
                                                shelf: label,
                                                impressionUrl: level.impressionUrl
                                            },
                                            recommendations: level.displays[0].recommendations
                                        };
                            _this.makeChaordic(data);
                        },
                        makeChaordic(data){
                            this.chaordic = [data];
                        },
                        hasInstallments: function (arg) {
                            if("object"==typeof arg&&arg==null) return false;
                            return true;
                        },
                        checkRegularPrice: function (arg) {
                            return !("object"==typeof arg&&null==arg || "number"==typeof arg&&arg>10000);
                        },
                        formatMoney: function (arg) {
                            return arg;
                        },
                        getImage: function (arg) {
                            var img = arg.images['1000x1000'].replace(/1000-1000/,"164-164").replace(/.*?\//, "/");
                            return img;
                        },
                        hasBestPrice: function (product) {
                            var v = "undefined"!==typeof product
                            && "undefined"!==typeof product.oldPrice
                            && null!==product.oldPrice 
                            && product.oldPrice > product.price
                            || "number"==typeof product.oldPrice&&product<1000000
                            ;
                            return v;
                        },
                        checkStatus: function (arg) {
                            return arg.status=="available";
                        }
                    }
                });
                new Vue({
                    el: '._'+label
                });
                index++;
            });
        });
        mountCarousel();
        "function"===typeof (new chaordicTracking).chaordicTrackingUrl()&&(new chaordicTracking).chaordicTrackingUrl();
        "function"===typeof setLazyLoading&&setLazyLoading();
        return true;
    };
    $(startChaordic);

    var mountCarousel = function () {
        $('.__vitrines .__vitrines > ul').addClass('owl-carousel');
        $('.__vitrines .owl-carousel').owlCarousel({
            lazyLoad: true,
            items: 8,
            nav: true,
            loop: true,
            responsive: true,
            autoplay: false,
            mouseDrag: true,
            responsive: {
              0: {
                items: 2
              },
              480: {
                items: 3
              },
              768: {
                items: 4
              },
              1024: {
                items: 6
              }
            },
        });
        return true;
    };
})(jQuery, window, document);