import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AprendendoAngular';
  name : string ='';
  telefone : string ='';
  public users : Array<any> = []
  valid : boolean =false;
  
  
  
  constructor(private httpClient : HttpClient , private router : Router){

  }

  
  
  ngOnInit(): void {
  }
  public list(){
     // this.validar();
       this.httpClient.get('http://localhost:3007/', {}).toPromise().then((response : any)=> {
      this.users = response;
      })
  }
  
 // public validar(){
//    this.httpClient.post('http://localhost:3007/validar', {tokenavalidar: localStorage.getItem('Meutoken')}).toPromise().then((response : any)=> {

 //   })
//  }
  public delet(){
      this.httpClient.post('http://localhost:3007/deletarCliente', {name : this.name, tel : this.telefone}).toPromise().then((response : any)=> {
        console.log("apagou")
      this.list();
    })
    
  }
  public addCadastro(){
     // this.validar();
      this.httpClient.post('http://localhost:3007/', {name : this.name, tel : this.telefone}).toPromise().then((response : any)=> {
        this.list();
      })
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
    


