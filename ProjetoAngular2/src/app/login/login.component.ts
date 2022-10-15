import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name : string = '';
  telefone : string = '';
  valid : boolean = false;
  constructor(private httpClient : HttpClient, private router : Router) { }

  ngOnInit(): void {
  }
  public logar(){
    this.httpClient.post('http://localhost:3007/login', {name : this.name, tel : this.telefone}).toPromise().then((response : any)=> {
      console.log(response);
      if(response.auth){
        this.valid = true;
        window.localStorage.setItem('token', response.token);
        this.router.navigate(['/cadastro'])
        console.log("Logado");
      }

    })

  }

}
