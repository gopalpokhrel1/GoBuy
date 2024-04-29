
export  function orderItem(order) {
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/orders', {method:"POST",
    body:JSON.stringify(order),
    headers:{'content-type': 'application/json'}
    })
     const data = await response.json();
      resolve({data})
  
    }
  
    );
  }
  export function orderItemUsingEpay(order) {
    return new Promise(async (resolve) => {
        const response = await fetch('https://gobuy-07tr.onrender.com/orders/payment', {
            method: "POST",
            body: JSON.stringify(order),
            headers: { 
              'content-type': 'application/json'
            }
        });
        const data = await response.json();
        resolve({ data });
    });
}

  
  
  
  export  function fetchAllOrders( pagination) {
  
    let queryString = '';
  
    for(let x in pagination){
      queryString += `${x}=${pagination[x]}&`
    }
    console.log(queryString);
  
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/orders?'+queryString)
     const data = await response.json();
     resolve({data})
    }
  
    );
  
  }
  
  export  function updateOrder(order) {
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/orders/'+ order.id, {method:"PATCH",
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
     const response = await fetch('https://gobuy-07tr.onrender.com/orders/'+ id, {method:"DELETE"
    })
     const data = await response.json();
     resolve({data})
  
    }
  
    );
  }
  