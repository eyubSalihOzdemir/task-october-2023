import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  id: number,
  name: string,
  surname: string,
  status: string,
  gender: string,
  dateOfBirth: string,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/users').pipe(
      map(users => users.map(user => ({ ...user, isUpdating: false })))
    );
  }

  deleteUser(id: number): Observable<any> {
    const url = `${API_URL}/users/${id}`;
    const requestBody = {};

    return this.http.delete<void>(url, requestBody).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(error);
      }),
      map(() => {
        return null;
      })
    );
  }

  addUser(user: User): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<User>(API_URL + '/users', user, { headers });
  }

  editUser(user: User): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // Use the user.id to construct the URL
    const url = `${API_URL}/users/${user.id}`;
  
    return this.http.put<User>(url, user, { headers });
  }
  
}
