import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { environment } from 'src/environments/environment';
// import { AccountService } from '@app/_services';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  // constructor(private accountService: AccountService) { }
  constructor() { }
  private authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkplbSIsImlhdCI6MTY5OTMwMjI2NX0.bwUGQkGt5KBnF8N-RZnNTY8J092ASXue2mXPlEvPpdY';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if user is logged in and request is to the api url
      // const user = this.accountService.userValue;
      // const isLoggedIn = user && user.token;
      // const isApiUrl = request.url.startsWith(environment.apiUrl);
      // if (isLoggedIn && isApiUrl) {
      // if (isApiUrl) {
      //     request = request.clone({
      //         setHeaders: {
      //             Authorization: `Bearer ${user.token}`
      //         }
      //     });
      // }

      const authReq = request.clone({ setHeaders: { Authorization: this.authToken } });
      return next.handle(authReq);
  }
}


