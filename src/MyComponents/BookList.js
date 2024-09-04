import { BookItem } from './BookItem.js';
export function BookList() {
    var list = [];

    for(let x=0; x<7; x++){
      list.push(<BookItem/>);
    }
    
    return (
      list
    );
  }