function slideMount(shelf){
    $(".helperComplement").remove();

    shelf.slick({
        dots: true,
        arrows: true,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
            }
        }
        ]
    });
}
function fecthReviews(ids) {
return $.ajax({
        method: 'GET',
        url: `https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids=${ids}`,
        headers: { YVStoreKey: ''}
        }).done( function(reviews) {
            return reviews
        })
}

function ranking(stars){
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
function mountReviews(shelvs){
    shelvs.forEach((shelv)=>{
        let products = [...shelv.querySelectorAll('.product')]
        let ids = products.map(item => item.dataset.id)
        fecthReviews(ids).done( function(reviews){
            for (let review of reviews.Element) {
                let shelf = products.find(product => product.dataset.id == review.ProductId)
                shelf.querySelector('.rating').innerHTML = ranking(review.Rating)
                shelf.querySelector('.rating__totals').innerHTML = `${review.TotalRatings} Avaliaç\u00F5es`
            }
        });
    })
}

function shelvsShow(){    
    $('.shelf-vtex').css('opacity','1');
    $('.shelf__title').css('opacity','1');
}
function mountFlags(){
    if(document.querySelector('.shelf-vtex .flag__text')){
        [...document.querySelectorAll('.shelf-vtex .flag__text')].forEach(item => {
            item.textContent = `${item.textContent.split(',')[0]}% OFF` || item.textContent 
        })
    }
}
export function vtexShelf(){
    slideMount($('.shelf-vtex ul'));
    mountFlags();
    shelvsShow();
    mountReviews([...document.querySelectorAll('.shelf-vtex')])
};