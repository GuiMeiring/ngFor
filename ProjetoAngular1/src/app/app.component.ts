import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Login';
  cpf : string = '';
  senha : string = '';

  constructor(private httpClient : HttpClient){

  }

  public login(){

    this.httpClient.get('http://localhost:3007/clientes',).toPromise().then((response : any)=> {
      console.log(response);

    })}

    public logar(){
      this.httpClient.post('http://localhost:3007/login', {cpf : this.cpf, password : this.senha}).toPromise().then((response : any)=> {
        console.log(response);
      })

    }}
