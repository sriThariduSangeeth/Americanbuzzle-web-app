export class Tokens {
    jwtToken: string;
    userName: string;
    userEmail: string;
  
    constructor(jwtToken: string , userName: string , userEmail: string){
        this.jwtToken = jwtToken;
        this.userName = userName;
        this.userEmail = userEmail;
    }
  
    getJwtToken():string{
      return this.jwtToken;
    }
  
    getUserName():string{
      return this.userName;
    }
    
    getUserEmail():string{
      return this.userEmail;
    }
    
    
  }