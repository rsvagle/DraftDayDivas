import { Injectable, EventEmitter, isDevMode }      from "@angular/core";
import { Title }                                    from "@angular/platform-browser";
import { Router }                                   from "@angular/router";
import { HttpClient, HttpParams }                   from "@angular/common/http";
import { Observable }                               from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class AppLayoutService {
    constructor(){

    }
  }