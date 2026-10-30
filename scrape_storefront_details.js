const https = require('https');
const fs = require('fs');

const productsToFetch = [
  { id: 'jJTNtU7KDvBx', url: 'https://shubhlagn.co.in/Yellow-Fandy-Saree-For-Women/catalogue/jJTNtU7KDvBx/g8GimgmK' },
  { id: 'r0N1SSXv9iJ3', url: 'https://shubhlagn.co.in/Cream-Fandy-Saree-For-Women/catalogue/r0N1SSXv9iJ3/04SzKfXU' },
  { id: 'ShtCwUphR-kE', url: 'https://shubhlagn.co.in/Red-Fandy-Saree-For-Women/catalogue/ShtCwUphR-kE/YWzllk8L' },
  { id: 'FLS3JyJrqrsB', url: 'https://shubhlagn.co.in/Multicolor-Chinon-Saree-For-Women/catalogue/FLS3JyJrqrsB/vVPRFlSf' },
  { id: 'mbhvgF-v6BwU', url: 'https://shubhlagn.co.in/Multicolor-Georgette-Saree-For-Women/catalogue/mbhvgF-v6BwU/vA2Zk_Hx' },
  { id: 'EkDtJ09Zqcgj', url: 'https://shubhlagn.co.in/Multicolor-Fandy-Saree-For-Women/catalogue/EkDtJ09Zqcgj/o8Zn0WJt' },
  { id: 'fkYso0LeaI2Y', url: 'https://shubhlagn.co.in/Multicolor-Georgette-Saree-For-Women/catalogue/fkYso0LeaI2Y/lfrre7yu' },
  { id: 'NZwC0Ka739_Z', url: 'https://shubhlagn.co.in/Multicolor-Georgette-Saree-For-Women/catalogue/NZwC0Ka739_Z/ttPnj8_W' },
  { id: 'D98DSoq0N47j', url: 'https://shubhlagn.co.in/Blue-Fandy-Saree-For-Women/catalogue/D98DSoq0N47j/IRN6F5Bn' },
  { id: 'LZ7iT2z5dztX', url: 'https://shubhlagn.co.in/Red-Fandy-Saree-For-Women/catalogue/LZ7iT2z5dztX/BPHbQAkI' },
  { id: 'e0yLcUXiouIt', url: 'https://shubhlagn.co.in/White-Ho-Silk-Saree-For-Women/catalogue/e0yLcUXiouIt/3Okxho1R' },
  { id: 'q7byJ0TqZNSp', url: 'https://shubhlagn.co.in/Yellow-Chiffon-Saree-For-Women/catalogue/q7byJ0TqZNSp/QqUOzxYK' },
  { id: 'DdXFprFOX7Fc', url: 'https://shubhlagn.co.in/Teal-Ho-Silk-Saree-For-Women/catalogue/DdXFprFOX7Fc/xQz_o39g' },
  { id: 'yZl63c5sXvjM', url: 'https://shubhlagn.co.in/White-Ho-Silk-Saree-For-Women/catalogue/yZl63c5sXvjM/WUIwwLxi' },
  { id: '2fkZ8_hNSLm7', url: 'https://shubhlagn.co.in/Multicolor-Crepe-Saree-For-Women/catalogue/2fkZ8_hNSLm7/paJeT73v' },
  { id: '9fk9N9VAlhWW', url: 'https://shubhlagn.co.in/Red---Black-Fandy-Saree-For-Women/catalogue/9fk9N9VAlhWW/26Os9czs' },
  { id: '2EiSt0kN_yfw', url: 'https://shubhlagn.co.in/Multicolor-Georgette-Saree-For-Women/catalogue/2EiSt0kN_yfw/QMvKdP-D' }
];

function fetchUrl(u) {
  return new Promise((resolve) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', (err) => resolve(''));
  });
}

async function scrapeAll() {
  const results = [];
  for (const item of productsToFetch) {
    console.log('Fetching:', item.id, item.url);
    const html = await fetchUrl(item.url);
    const idx = html.indexOf('window.__SERVER_APP_STATE__');
    if (idx !== -1) {
      let scriptEnd = html.indexOf('</script>', idx);
      let snippet = html.substring(idx + 'window.__SERVER_APP_STATE__ = '.length, scriptEnd).trim();
      if (snippet.endsWith(';')) snippet = snippet.slice(0, -1);
      try {
        const state = (new Function('return (' + snippet + ');'))();
        const data = state.initialData?.serverInjection?.data;
        if (data) {
          console.log(`  Parsed: ${data.content?.title} | Price: ${data.sku_data?.effective_price}`);
          results.push({
            short_id: data.short_id,
            title: data.content?.title,
            description: data.content?.description,
            category: data.category,
            sub_category: data.sub_category,
            product_type: data.product_type,
            mrp: data.sku_data?.mrp,
            selling_price: data.sku_data?.selling_price,
            effective_price: data.sku_data?.effective_price,
            discount: data.discount,
            size: data.all_sku_data?.[0]?.size,
            images: data.images?.map(img => ({
              src_url: img.src_url,
              preview_url: img.preview_url,
              width: img.meta?.width,
              height: img.meta?.height,
              srcset: img.srcset
            })) || [],
            source_url: item.url
          });
        }
      } catch (e) {
        console.error('Parse error:', e.message);
      }
    }
  }
  console.log('Total detailed products extracted:', results.length);
  fs.writeFileSync('detailed_storefront_products.json', JSON.stringify(results, null, 2));
}

scrapeAll();

