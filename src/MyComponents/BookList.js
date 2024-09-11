import { BookItem } from './BookItem.js';
export function BookList() {
    var list = [];
    var myJSON = [{
      "summary": "myTest1",
      "createdDate": "1,725,310,421,223",
      "reviewer": "Nicholas Donald",
      "rating": "3",
      "modifiedDate": null,
      "id": "7",
      "author": "myTestAuthor1",
      "title": "myTestTitle1"
      },
      {
          "summary": "myTest2",
          "createdDate": "1725311515699",
          "reviewer": "Nicholas Donald",
          "rating": "1",
          "modifiedDate": null,
          "id": "8",
          "author": "myTestAuthor2",
          "title": "myTestTitle2"
      },
      {
          "summary": "myTest4",
          "createdDate": "9/2/2024, 5:39:47 PM",
          "reviewer": "Nicholas Donald",
          "rating": "5",
          "modifiedDate": "9/2/2024, 5:40:27 PM",
          "id": "9",
          "author": "myTestAuthor4",
          "title": "myTestTitle4"
      },];

    for(let x=0; x<myJSON.length; x++){//don't need because .map iterated through all of them
      list.push(<BookItem key={myJSON[x].id} bookJSON={myJSON[x]}/>);
      //list.push(myJSON.map((bookJSON) => <BookItem bookJSON={bookJSON}/>));
    }
    
    return (
      list
    );
  }