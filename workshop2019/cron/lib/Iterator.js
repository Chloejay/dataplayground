const salesListApi = require("../apis/SalesList") 

class Iterator{
    constructor(items=[]){
          this.index = 0;
          this.items = items;
     }

    first(){
          var [first] = this.items;
     }

    last(){
          var [first] = [...this.items].reverse();
          return last;
     }

    hasNext(){
          return this.index < this.items.length -1;
     }

    current(){
          
          return this.items[this.index];
     }

    next(){
          if(this.hasNext()){
              this.index +=1
         }
          return this.current();
     }

    prev(){
          if(this.index !== 0){
              this.index -= 1;
          }
           return this.current();
     }

}

const main = async ()=>{
    var apiList = new Iterator([
        new salesListApi(),
    ])

    while(apiList.hasNext()){
        let api = apiList.current()
        await api.fetchData()
        await api.saveDb()
        apiList.next()
    }

}

main()
