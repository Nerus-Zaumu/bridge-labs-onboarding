import { NotifierService } from 'angular-notifier';
import { tap } from 'rxjs/operators';
import { CloudCard } from './interfaces/card.model';
import { catchError, map, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SingleItemComponent } from './home/single-item/single-item.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Inject, Injectable, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  imageForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
    description: new FormControl()
  })

  dialogCard: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl('')
  })

  loadedCard!: CloudCard | undefined;
  errorMessage!: string;
  cloudCards!: CloudCard[];

  constructor(public dialog: MatDialog, private router: Router, private http: HttpClient, private notifierService: NotifierService) { }

  openDialog(cardID: string): void {
    this.router.navigate(['dashboard/home', cardID])
    const dialogRef = this.dialog.open(SingleItemComponent, {
      width: '100vh',
      data: {router: ActivatedRoute}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['dashboard/home'])
    });
  }

  getCurrentCard(cardID: string){
    return this.cloudCards.find(card => {
      {return card.id.toString() === cardID}
    })
  }

  createCard(){
    const card = {
      name: this.imageForm.get('name')?.value,
      image: this.imageForm.get('image')?.value,
      description: this.imageForm.get('description')?.value

    }
    this.http.post<CloudCard>(`${environment.BASE_URL}/api/category/create`, card)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = error.message
        this.notifierService.notify('failure', this.errorMessage)
        this.imageForm.reset()
        return throwError(() => {})
      })
    )
    .subscribe(
      card => {
        this.notifierService.notify('success', 'Added new Card successfully!')
        this.imageForm.reset()
        console.log('New Card created: ', card);
      }
    )
  }

  getAllCards(){
    this.http.get<CloudCard[]>(`${environment.BASE_URL}/api/category/categories`)
    .pipe(
      catchError(
        (error: HttpErrorResponse) => {
          this.notifierService.notify('failure', error.message)
          return throwError(() => {})
        }
      ),
      map(cards => {
        this.cloudCards = cards
      })
    ).subscribe(
      cards => {
        //Get all cards from backend
      }
    )
  }

  deleteCard(id: string){
    this.http.delete(`${environment.BASE_URL}/api/category/delete/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifierService.notify('failure', error.message)
        return throwError(() => {})
      }),
      map(card => {
        if(!card){
          return;
        }
      })
    ).subscribe(
      card => {
        //Delete card
        this.notifierService.notify('success', `Successfully deleted with ID ${id}`)
        this.getAllCards()
        this.router.navigate(['dashboard/home'])
      }
    )
  }

  updateCard(id: string){
    this.http.put(`${environment.BASE_URL}/api/category/update/${id}`, this.dialogCard.value)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifierService.notify('failure', error.message)
        return throwError(() => {})
      })
    ).subscribe(
      card => {
        this.notifierService.notify('success', 'Card successfully updated!')
        this.getAllCards()
        this.router.navigate(['dashboard/home'])
      }
    )
  }

}

