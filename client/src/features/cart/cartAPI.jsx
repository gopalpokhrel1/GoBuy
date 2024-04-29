 // Get All Products
 export  function addToCart(userData) {
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/carts', {method:"POST",
    body:JSON.stringify(userData),
    headers:{'content-type': 'application/json'}
    })
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  //Get cart item with specific users
  export  function fetchUserById(id) {
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/carts?user='+id)
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  export  function deleteItem(id) {
  
    return new Promise( async (resolve) =>{
     const response = await fetch(`https://gobuy-07tr.onrender.com/carts/${id}`, {
      method:"DELETE",
      headers: {"Content-type" : "application/json"}
     })
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  //update user's item quantity
  export  function updateItem(update) {
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/carts/'+update.id, {
      method:"PATCH",
      body:JSON.stringify(update),
      headers: {"Content-type" : "application/json"}
     })
     const data = await response.json();
     console.log(data);
     resolve({data})
    }
  
    );
  }
  
  export async function resetCart(id){
  
    return new Promise(async(resolve)=>{
          const response = await fetchUserById(id);
          
         const items = response.data;
        
          for(let i in items){
            await deleteItem(items[i].id);
          
          }
  
          resolve({status:true})
    })
  }