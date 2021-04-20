export class Tokens {
  token: string;
  user: string;
  userEmail: string;

  constructor(token: string, user: string, userEmail: string) {
    this.token = token;
    this.user = user;
    this.userEmail = userEmail;
  }

  getJwtToken(): string {
    return this.token;
  }

  getUserName(): string {
    return this.user;
  }

  getUserEmail(): string {
    return this.userEmail;
  }


}