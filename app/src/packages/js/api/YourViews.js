//api Vitrine Beta
const products = ["4156","4239"]
  async function fetchRatingYourViews() {

    const fetchUrl = `https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productIds=${products.join()}&page=1&count=12`;
    const fetchSettings = {
      headers: {
        YVStoreKey: '46589e5a-a798-49cf-a104-c4211c95666e',
        Authorization:'ZWM0YWZhNTMtY2YwMi00ZjBhLWI2M2EtOGZmOGQxZGRiZDAy'
      },
    };
    const response = await fetch(fetchUrl, fetchSettings);
    const data = await response.json();
    return data;
  }

  //api vitrine
  $.ajax({
    url: 'https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids=457,637',
    type: 'GET',
    dataType: 'json',
    success: function(r) { console.log(r); },
             beforeSend: function(xhr) { xhr.setRequestHeader('YVStoreKey','46589e5a-a798-49cf-a104-c4211c95666e'); }
  });