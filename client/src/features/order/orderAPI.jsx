// A mock function to mimic making an async request for data
export  function orderItem(order) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/orders', {method:"POST",
    body:JSON.stringify(order),
    headers:{'content-type': 'application/json'}
    })
     const data = await response.json();
    
     resolve({data})
  
    }
  
    );
  }
  
  
  
  export  function fetchAllOrders( pagination) {
  
    let queryString = '';
  
    for(let x in pagination){
      queryString += `${x}=${pagination[x]}&`
    }
    console.log(queryString);
  
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/orders?'+queryString)
     const data = await response.json();
     resolve({data})
    }
  
    );
  
  }
  
  export  function updateOrder(order) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/orders/'+ order.id, {method:"PATCH",
    body:JSON.stringify(order),
    headers:{'content-type': 'application/json'}
    })
     const data = await response.json();
     resolve({data})
  
    }
  
    );
  }
  export  function deleteOrder(id) {
    
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/orders/'+ id, {method:"DELETE"
    })
     const data = await response.json();
     resolve({data})
  
    }
  
    );
  }
  