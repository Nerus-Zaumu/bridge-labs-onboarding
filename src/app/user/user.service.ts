import { Router } from '@angular/router';
import { NewUser, existingUser, LoggedUser, BridgeUser } from './interfaces/descriptor';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user/user.model';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  errorMessage!: string;
  loggedUser!: LoggedUser;
  sessionExpirationTimer: any;
  userId!: string;
  userEmail!: string;
  expiresIn = "3600";
  first_name!: string;
  last_name!: string;

  bridgeUser = new BehaviorSubject<User | null>(null);

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    avatar: new FormControl('', Validators.required)
  })

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })


  constructor(private http: HttpClient, private router: Router, private notifierService: NotifierService) { }

  //Form Validators
  formValidator(form:FormGroup){
    let result: boolean = false;
    form.invalid && form.dirty && form.touched ? result = true : result = false;
    return result
  }

  wrongEmail(form: FormGroup){
    let result: boolean = false;
    form.get('email')?.hasError('email') && form.get('email')?.dirty && form.get('email')?.touched ? result = true : result = false;
    return result
  }

  requiredEmail(form: FormGroup){
    let result: boolean = false;
    form.get('email')?.hasError('required') && form.get('email')?.dirty && form.get('email')?.touched ? result = true : result = false;
    return result
  }

  wrongPassword(form: FormGroup){
    let result: boolean = false;
    form.get('password')?.hasError('minlength') && form.get('password')?.dirty && form.get('password')?.touched ? result = true : result = false;
    return result
  }

  requiredPassword(form: FormGroup){
    let result: boolean = false;
    form.get('password')?.hasError('required') && form.get('password')?.dirty && form.get('password')?.touched ? result = true : result = false;
    return result
  }


  //Http Actions
   register(){
    const userInfo: NewUser = {
      email: this.signupForm.get('email')?.value,
      first_name: this.signupForm.get('first_name')?.value,
      last_name: this.signupForm.get('last_name')?.value,
      phone: this.signupForm.get('phone')?.value,
      password: this.signupForm.get('password')?.value,
      avatar: this.signupForm.get('avatar')?.value
    }
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

    this.http.post<BridgeUser>(`${environment.BASE_URL}/api/user/register`,userInfo, {headers: headers})
    .pipe(
      catchError((error) => {
        this.errorMessage = error.message
        this.notifierService.notify('failure', this.errorMessage)
        return throwError(() => error)
      }),
      tap(user => {
        this.handleAuthentication(user.id, user.email, user.token, +this.expiresIn)
      })
    ).subscribe(
      response => {
        if(response){
          this.notifierService.notify('success', 'Successfully created account!')
          this.signupForm.reset()
          this.router.navigate(['/users/auth/login']);
        }
      }
    )
  }

  login(){
    const user: existingUser = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    this.http.post<BridgeUser>(`${environment.BASE_URL}/api/user/login`, user, {headers: headers})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = error.message
        this.notifierService.notify('failure', this.errorMessage)
        return throwError(() => {})
      }),
      tap(user => {
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.handleAuthentication(user.id, user.email, user.token, +this.expiresIn)
      })
    ).subscribe(
      user => {
        this.notifierService.notify('success', 'Successfully logged in!')
        this.loginForm.reset()
        this.router.navigate(['/dashboard/home'])
      }
    )

  }

  logout(){
    this.bridgeUser.next(null);
    this.notifierService.notify('success', 'You have logged out!')
    this.router.navigate(['/landing-page'])
    localStorage.removeItem('bridgeUserData')
    if(this.sessionExpirationTimer){
      clearTimeout(this.sessionExpirationTimer)
    }
    this.sessionExpirationTimer = null
  }

  autoLogout(expirationLength: number){
    this.sessionExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationLength)
  }

  async autoLogin(){
    const userData: {
      id: number,
      email: string,
      _token: string,
      _tokenExpirationDate: string,
      first_name: string,
      last_name: string
    } = JSON.parse(localStorage.getItem("bridgeUserData") as string);
    if(!userData){
      return;
    }
    const currentUser = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationDate))
    if(currentUser.token){
      this.userId = currentUser.token
      this.userEmail = currentUser.email
      this.bridgeUser.next(currentUser)
      let expirationDuration = 0
      if(!userData._tokenExpirationDate){
        expirationDuration = 36000 * 1000
      }
      else{
         expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      }
      this.autoLogout(expirationDuration)
    }
  }

  handleAuthentication(id: number, email: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const bridgeUser = new User(id, email, token, expirationDate)
    this.bridgeUser.next(bridgeUser);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('bridgeUserData', JSON.stringify(bridgeUser))
  }

}
