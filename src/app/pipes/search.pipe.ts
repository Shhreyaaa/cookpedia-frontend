import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(recipeList:any[], searchkey:string): any[] {
    let result:any=[]

    if(!recipeList || searchkey==""){
      return recipeList
    }

    result=recipeList.filter((item:any)=>item.name.toLowerCase().includes(searchkey.toLowerCase()))
    return result
  }

}
