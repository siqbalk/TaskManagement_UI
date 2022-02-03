import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
  } from "@angular/common/http";
  import { Injectable } from "@angular/core";
  import { Observable, throwError } from "rxjs";
  import { catchError, finalize, map } from "rxjs/operators";
  
  @Injectable({
    providedIn: "root"
  })
  export class InterceptService implements HttpInterceptor {
    constructor() { }
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken != null && typeof accessToken != "undefined") {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers":
              "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Accept-Encoding, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name",
            "Access-Control-Allow-Methods": "POST,GET,PUT,PATCH,DELETE,OPTIONS"
          }
        });
      }
      return next.handle(request).pipe(
        map(event => {
          return event;
        }),
        finalize(() => { }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = "";
          if (error.error instanceof ErrorEvent) {
            console.log("this is client side error");
            console.log(error);
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log("this is server side error");
            console.log(error);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log("Something unexpected happened!");
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      );
    }
  }
  