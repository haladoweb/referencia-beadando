import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = `${environment.apiUrl}/auth`;
  private readonly http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.get<{ accessToken: string }>(`${this.authUrl}`);
  }
}
