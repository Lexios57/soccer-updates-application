import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class Interceptors implements HttpInterceptor {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ headers: req.headers.set('x-rapidapi-key', environment.API_SECRET) });

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 404:
            this.snackBar.open('🚨 Impossible de récupérer les données', 'Fermer', {
              panelClass: ['error-snackbar'],
              duration: 3000,
            });
            break;
          case 401:
            this.snackBar.open('🚨 La session a expiré, veuillez vous reconnecter', 'Fermer', {
              panelClass: ['error-snackbar'],
              duration: 5000,
            });
            break;
          default:
            this.snackBar.open('🚨 Impossible de récupérer les données', 'Fermer', {
              panelClass: ['error-snackbar'],
              duration: 3000,
            });
            break;
        }

        return throwError(() => new Error(err.error));
      })
    );
  }
}
