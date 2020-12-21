import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '@app/shared/services/base.service';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';
import { PermissionScreen, PermissionUpdateRequest } from '@app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService extends BaseService {
  private _sharedHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    super();
    this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }
  save(roleId: string, request: PermissionUpdateRequest) {
    return this.http.put(`${environment.apiUrl}/api/role/${roleId}/permissons`, JSON.stringify(request), {headers: this._sharedHeaders})
      .pipe(catchError(this.handleError));
  }
  getFunctionWithCommand() {
    return this.http.get<PermissionScreen>(`${environment.apiUrl}/api/permissons`,{headers: this._sharedHeaders})
      .pipe(catchError(this.handleError));
  }
}
