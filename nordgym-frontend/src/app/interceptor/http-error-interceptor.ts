import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';


export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          const errorMessages = [];

          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessages.push(`Error: ${error.error.message}`);
          } else {
            // server-side error
            // errorMessages.push(`Error Code: ${error.status}`);
            Object.keys(error.error).forEach(key => {
              errorMessages.push(`${error.error[key]}`);
            });
          }
          return throwError(errorMessages);
        })
      );
  }
}
