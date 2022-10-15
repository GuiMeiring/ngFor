import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  name : string ='';
  telefone : string ='';
  public users : Array<any> = []
  valid : boolean =false;

  

  constructor(private httpClient : HttpClient,) { }

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
}
