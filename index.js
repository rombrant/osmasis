const osmosis = require('osmosis');
const fs = require('fs');
let savedData = [];
osmosis
   .get('http://kraskisnab.ru.com/')
   .find('li.moto-widget-menu-item')
   .follow('li.moto-widget-menu-item a[href]')
   .find('div.moto-widget-store-paginator')
   .follow('a.moto-widget-store-paginator-link[href]')
   .find('.moto-widget-store-main_item')
   .follow('a.moto-widget-store-main_item-title[href]')
   .find('section.moto-section > div.moto-widget-row[2]')
   .set({
       'title': 'div.moto-widget-text-content > h2',
       'brend': 'ul.moto-widget-store-detail-product_properties > li[2]',
       'code': 'ul.moto-widget-store-detail-product_properties[2] > li[2]',
       'imgsrc': '.moto-widget-image-link img @data-src',
       'price': 'div.moto-widget-store-main_item-price > h4',
       'text': ['div.moto-widget-store-detail-text > p']
    })
   .log(console.log)   // включить логи
   .data((data)=>{
        console.log(data)
        savedData.push(data)
    })

   .done(function() {
    fs.writeFile('data.json', JSON.stringify(savedData, null, 4), function(err) {
      if(err) console.error(err);
      else console.log('Data Saved to data.json file');
    })
 });