import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ENVIRONMENT } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class Base64ConverterService {

  constructor(private http: HttpClient) { }

  startConversionBuffer(input: string) {
    const bufferData = new BehaviorSubject<string[]>([]);
    this.getBufferDataAsync(input, bufferData);
    return bufferData;

  }

  private async getBufferDataAsync(input: string, observer: BehaviorSubject<string[]>) {
    const params = new URLSearchParams({ input });
    const req = new HttpRequest('GET', `${ENVIRONMENT.apiURL}?${params}`, { responseType: 'text', reportProgress: true });

    this.http.request(req)
      .subscribe((data: any) => {
        (data.type === 3) && observer.next(JSON.parse(`${data.partialText}${data.partialText.endsWith("]") ? '' : ']'}`));
        (data.type === 4) && observer.complete();
      });
  }
}
