import { helper } from '@ember/component/helper';

export function formatPrice(price/*, hash*/) {
  console.log(price)

  if(price%1===0){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  } else {
    price = Math.round(price * 100) / 100
    var parts = price.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }

}

export default helper(formatPrice);
