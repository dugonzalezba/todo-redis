import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ServiciosProvider } from "../../providers/servicios/servicios";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hash: number = 0;
  todo: any;
  keys: string[];
  items: any;
  responseData: any;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public _service: ServiciosProvider) {

  }

  public mostrarToast(mensaje:any){
    
      let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 3000,
        position: 'middle'
      });
    
      toast.present();
     }
    

enviarDatos(){
this.hash+=1;
this._service.post(this.hash, this.todo ,'insertHash').then((result) => { 
  this.responseData = result;
  console.log(this.responseData);
  this.listarDatos();
 }, (err) => {
  this.mostrarToast(JSON.stringify(err));
  console.error(JSON.stringify(err));
});
}

listarDatos(){
this._service.get('getHash').then((result) => { 
  this.todo = "";
  if( result == null ){
    this.mostrarToast("NO HAY HAY TAREAS REGISTRADAS D:!"); 
    this.items={}; 
   }
   else{
    this.items = result;
    this.keys = Object.keys(this.items);
   }

 }, (err) => {
  this.mostrarToast(JSON.stringify(err));
  console.error(JSON.stringify(err));
});
}


borrarLlave(hash){
  this._service.delete(hash,'deleteHash').then((result) => { 
  console.log(this.responseData);
  this.listarDatos();
 }, (err) => {
  this.mostrarToast(JSON.stringify(err));
  console.error(JSON.stringify(err));
});
}



}
