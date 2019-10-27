import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthResponseData } from './auth-response-data.model';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Service which will be responsible for
 * signing user in, signing in, managing token of user
 */
@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    // Sign up 
    signup(email: string, password: string) {
        const api_key = "AIzaSyAGLtWjTAT6UiDmKYo4QGfh-6ayNrS5QWY"
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+api_key;
        
        return this.http.post<AuthResponseData>(url, 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    // Login
    login(email: string, password: string) {
        const api_key = "AIzaSyAGLtWjTAT6UiDmKYo4QGfh-6ayNrS5QWY"
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+api_key;
        
        return this.http.post<AuthResponseData>(url, 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if(!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'You entered an incorect password!'
                break;
            case 'EMAIL_NOT_FOUND': 
                errorMessage = 'Email does not exist!'
                break;
        }
        return throwError(errorMessage);
    }
}