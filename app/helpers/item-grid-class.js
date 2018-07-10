import { helper } from '@ember/component/helper';
import item from '../routes/item';

export function itemGridClass(params/*, hash*/) {
  
  let index = params;
  let items=["a","b","c","d","e"]
  return items[Math.floor(Math.random()*items.length)];
}

export default helper(itemGridClass);
