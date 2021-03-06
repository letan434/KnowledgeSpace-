import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Pagination, Report } from '@app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseService {
  private _sharedHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    super();
    this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }
  getDetail(knowledgeBaseId, commentId) {
    return this.http.get(`${environment.apiUrl}/api/knowledgeBases/${knowledgeBaseId}/reports/${commentId}`,
      {headers: this._sharedHeaders})
      .pipe(catchError(this.handleError));
  }
  getAllPaging(knowledgeBaseId, filter, pageIndex, pageSize) {
    return this.http.get<Pagination<Report>>(`${environment.apiUrl}/api/knowledgeBases/${knowledgeBaseId}/reports/filter?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`, { headers: this._sharedHeaders })
      .pipe(map((response: Pagination<Report>) => {
        return response;
      }), catchError(this.handleError));
  }

  delete(knowledgeBaseId, commentId) {
    return this.http.delete(environment.apiUrl + '/api/knowledgeBases/' + knowledgeBaseId + '/reports/' + commentId,
      { headers: this._sharedHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }
}
