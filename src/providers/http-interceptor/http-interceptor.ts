// https://stackoverflow.com/questions/46019771/catching-errors-in-angular-httpclient
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastController) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((err: HttpErrorResponse) => {
        let toastMessage;
        if (err.error instanceof Error) {
          console.log(err);
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred: ', err.error.message);
          toastMessage = 'Something is wrong. Is the API running? Are you connected to the internet? Check the console for more details.';
        } else {
          if (err.error.msg === 'Invalid username\/password') {
            toastMessage = 'Woops! That was an invalid username and password combination.';
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(err);
            console.error(`Backend returned code ${err.status}, body was:`, err.error);;
            toastMessage = 'There was an unsuccessful web request. A status code of ' + err.status + ' was returned.';
          }
        }

        const toast = this.toast.create({
          message: toastMessage,
          duration: 4141
        });
        toast.present();

        // ...optionally return a default fallback value so app can continue (pick one)
        // which could be a default value (which has to be a HttpResponse here)
        // return Observable.of(new HttpResponse({body: [{name: "Default value..."}]}));
        // or simply an empty observable
        return Observable.empty<HttpEvent<any>>();
      });
  }
}