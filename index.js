const osmosis = require('osmosis');
const fs = require('fs');
let savedData = [];
osmosis
   .get('http://kraskisnab.ru.com/')
   .find('li.moto-widget-menu-item')
   .follow('li.moto-widget-menu-item a[href]')
   .paginate('a.moto-widget-store-paginator-link')
   .find('.moto-widget-store-main_item')
   .set({
       'title': 'a > span',
       'imgsrc': '.moto-widget-image-link img @data-src',
       'price': 'div.store-product-element-container > div'
    })
   .log(console.log)   // включить логи
   .data((data)=>{
    //    console.log(data)
        savedData.push(data)
    })

   .done(function() {
    fs.writeFile('data.json', JSON.stringify(savedData, null, 4), function(err) {
      if(err) console.error(err);
      else console.log('Data Saved to data.json file');
    })
 });