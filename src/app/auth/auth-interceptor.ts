import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  //We use interceptors to manipulate the outgoing http request --> here we are simply adding the token to the HTTP requests we put this 'middlewear' on which is why we inject auth service into here
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    //Here we clone the auth request because we do not want to edit it directly - we are editing the headers here
    //Here we are cloning the request and then also manipulating the request headers in here - the set function will just overide the Authorization headerer because we are extracting our token on the backend for authroization which is in the check-auth.js file
    //In summary this will create a request which will add Authorization headers along with the token - intercepting request and adding token
    //Lastly we must go to app,module.ts and add the providers property {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} --> this is the interceptor we created right here! Multi true says don't overide any current interceptors just add it to the current one
    //Remember to add Authorization to our headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
