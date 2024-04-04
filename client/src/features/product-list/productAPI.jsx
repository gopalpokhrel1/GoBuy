 // Get all Products
 export  function fetchAllProducts() {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/products')
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  //post product to the database
  export  function PostProducts(value) {
    
    return new Promise( async (resolve) =>{
      
     const response = await fetch('http://localhost:8080/products', {
      method:"POST",
      body : JSON.stringify(value),
      headers: {'Content-Type': 'application/json'}
     })
     const data = await response.json();
     console.log(data);
     resolve({data})
    }
  
    );
  }
  export  function updateProducts(value) {
    
    return new Promise( async (resolve) =>{
      
     const response = await fetch('http://localhost:8080/products/'+ value.id, {
      method:"PATCH",
      body : JSON.stringify(value),
      headers: {'Content-Type': 'application/json'}
     })
     const data = await response.json();
  
     resolve({data})
    }
  
    );
  }
  
  //Get all Product by id
  export  function selectedProducts(id) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/products/'+id)
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  
  export  function fetchProductsByquery(filter,sort, pagination) {
    
  
    let queryString = '';
    for(let key in filter){
      const category = filter[key];
      if(category.length>0){
         const lastCategory = category[category.length -1];
        queryString += `${key}=${lastCategory}&`
  
      }
     
    }
  
  
   
    for(let x in sort){
      
      queryString += `${x}=${sort[x]}&`
    }
  
    for(let x in pagination){
      queryString += `${x}=${pagination[x]}&`
    }
  
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/products?'+queryString)
     const data = await response.json();
     resolve({data})
    }
  
    );
  
  }
  
  
  
  
  
  
  