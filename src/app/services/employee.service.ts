import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  backUrl = 'https://localhost:44328/';
  apiUrl = 'api/employees/';

  constructor(private http: HttpClient) { }

  getEmployeesList() : Observable<any> {
    return this.http.get(this.backUrl + this.apiUrl);
  }

  deleteAnEmployee(id: number): Observable<any>{
    return this.http.delete(this.backUrl + this.apiUrl + id);
  }

  addAnEmployee(employee: any): Observable<any>{
    return this.http.post(this.backUrl + this.apiUrl, employee)
  }

  updateAnEmployee(id: number, employee: any): Observable<any>{
    return this.http.put(this.backUrl + this.apiUrl + id, employee);
  }

}
