import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Function } from '../models';


@Injectable({
  providedIn: 'root'
})
export class FunctionService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }
    getAll() {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json'
            })
        };
        return this.http.get<Function[]>(`${environment.apiUrl}/api/users`, httpOptions).pipe(catchError(this.handleError));
    }
}
