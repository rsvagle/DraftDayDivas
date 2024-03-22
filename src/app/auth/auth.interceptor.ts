import { HttpInterceptorFn } from '@angular/common/http';

// Function to add the auth token to requests
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // read the token
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    const cloneRequest = req.clone({
      headers: req.headers.set('Authorization', `Token ${authToken}`),
    });

    return next(cloneRequest);
  }

  // pass unchanged if no token
  return next(req);
};
