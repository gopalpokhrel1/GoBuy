//create the user
export  function createUser(userData) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/auth/signup', {method:"POST",
    body:userData,
   // headers:{'content-type': 'application/json'}
    })
     const data = await response.json();
     resolve({data})
    }
  
    );
  }
  
  
  //check the user during login
  export  function userCheck(userData) {
  
    return new Promise( async (resolve, reject) =>{
     const response = await fetch('http://localhost:8080/auth/login', {
      method:"POST",
      body: JSON.stringify(userData),
      headers:{'content-type': 'application/json'}
     });
      if(response.ok){
        let data = await response.json();
        resolve({data}) 
      }
      else{
        let error = await response.json();
        reject(error);
        
      }
    }
    );
  }
  
  
  //update address of user
  export  function addUserCheckout(userData) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/users/'+userData.id, {method:"PATCH",
    body:JSON.stringify(userData),
    headers:{'Content-type': 'application/json'}
    })
     const data = await response.json();
     resolve({data})
    }
    );
  }
  