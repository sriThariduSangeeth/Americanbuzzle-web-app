import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {
    const resultArray = [];
    if (value) {
      if (value.length === 0 || filterString === 'All' || propName === '') {
        return value;
      }

      for (const item of value) {
        if (item[propName] === filterString) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
    return value;
  }

}
