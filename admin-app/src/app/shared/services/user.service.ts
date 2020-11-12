import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Function, User } from '../models';
import { environment } from '../../../environments/environment';
import { UtilitiesService } from './utilities.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

    constructor(private http: HttpClient,
        private utilitiesService: UtilitiesService) {
        super();
    }
    getAll() {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json'
            })
        };
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`, httpOptions)
        .pipe(catchError(this.handleError));
    }
    getMenuByUser(userId: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json'
            })
        };
        return this.http.get<Function[]>(`${environment.apiUrl}/api/users/${userId}/menu`, httpOptions)
        .pipe(map(response => {
            const fuctions = this.utilitiesService.UnflatteringForLeftMenu(response);
            return fuctions;
            }),
            catchError(this.handleError));
    }
}
