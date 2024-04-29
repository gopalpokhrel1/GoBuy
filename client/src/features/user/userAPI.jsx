export  function fetchUserOrder(userId) {

    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/orders/?user='+userId)
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  
  export  function fetchLogginedUser(userId) {
    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/users/'+userId)
     const data = await response.json();
     resolve({data})
   
    }
  
    );
  }
  
  export  function updateAddress(userData) {

    return new Promise( async (resolve) =>{
     const response = await fetch('https://gobuy-07tr.onrender.com/users/'+userData.id, {method:"PATCH",
    body:JSON.stringify(userData),
    headers:{'Content-type': 'application/json'}
    })
     const data = await response.json();
     resolve({data})
     console.log(data);
  
  
    }
    );
  }