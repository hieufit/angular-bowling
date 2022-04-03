import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {IBowlingFrame} from "./ibowling-frame.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BowlingService {
  protected baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.server_ip}`;
  }

  computeScore(frames: IBowlingFrame[]): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/score', frames).pipe(map(res => res));
  }

}
