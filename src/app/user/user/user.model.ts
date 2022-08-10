export class User{
  constructor(
    public id: number,
    public email: string,
    private _token: string,
    private tokenExpirationDate: Date,
     ){}

  get token(){
    if(!this.tokenExpirationDate || new Date() > this.tokenExpirationDate){
      return;
  }
  return this._token
  }
}
