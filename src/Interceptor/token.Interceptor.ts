import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');
    if (token == null) return next.handle(req);

    const cloned = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
    return next.handle(cloned);
  }
}
