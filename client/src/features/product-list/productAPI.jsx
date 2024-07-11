 // Get all Products
 export  function fetchAllProducts(token) {
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/products', {
      method:"GET",
      headers:{
        "Authorization":`Bearer ${token}`,
      }
     })
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  //post product to the database
  export  function PostProducts(value) {
    
    return new Promise( async (resolve) =>{
      
     const response = await fetch('https://gobuy-07tr.onrender.com/products', {
      method:"POST",
      body : JSON.stringify(value),
      headers: {'Content-Type': 'application/json'
      }
     })
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  export  function updateProducts(value) {
    
    return new Promise( async (resolve) =>{
      
     const response = await fetch('https://gobuy-07tr.onrender.com/products/'+ value.id, {
      method:"PATCH",
      body : JSON.stringify(value),
      headers: {'Content-Type': 'application/json'}
     })
     const data = await response.json();
  
     resolve({data})
    }
  
    );
  }
  export  function deleteProducts(id) {
    
    return new Promise( async (resolve) =>{
      
     const response = await fetch('https://gobuy-07tr.onrender.com/products/'+id, {
      method:"DELETE",
     })
     const data = await response.json();
  
     resolve({data})
    }
  
    );
  }
  
  //Get all Product by id
  export  function selectedProducts(id) {
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/products/'+id)
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  
  export  function fetchProductsByquery(filter,sort, pagination, token) {
    
  
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
     const response = await fetch('https://gobuy-07tr.onrender.com/products?'+queryString, {
      method:"GET",
      headers:{
        "Authorization":`Bearer ${token}`,
      }
     })
     const data = await response.json();
     resolve({data})
    }
  
    );
  
  }
  
  
  
  
  
  
  