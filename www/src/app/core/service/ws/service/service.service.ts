import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getServices(){
      return this.httpClient.get(this.endpoint+'/services');
  }

  getService(service:any){
    return this.httpClient.get(this.endpoint+'/services/'+service.key);
}

  createService(serviceForm:any){
    return this.httpClient.post(this.endpoint+'/services',serviceForm);
  }

  updateService(service:any){
    console.log(service);
    return this.httpClient.put(this.endpoint+'/services/'+service.id,service);
  }

  deleteService(service:any){
    return this.httpClient.delete(this.endpoint+'/services/delete',service);
  }

   deactivateService(service:any){
    service.isEnabled = false;
    return this.httpClient.put(this.endpoint+'/services/' + service.id ,service);
  }

   activateService(service:any){
        service.isEnabled = true;
    return this.httpClient.put(this.endpoint+'/services/' + service.id ,service);
  }
}
