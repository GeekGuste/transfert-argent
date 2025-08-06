import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(){
      return this.httpClient.get(this.endpoint+'/users/users');
  }

  getUser(user:any){
    return this.httpClient.get(this.endpoint+'/users/'+user.key);
}

  createUser(userForm:any){
    return this.httpClient.post(this.endpoint+'/users/invite',userForm);
  }

  updateUser(user:any){
    console.log(user);
    return this.httpClient.put(this.endpoint+'/users/users/'+user.id,user);
  }

  deleteUser(user:any){
    return this.httpClient.delete(this.endpoint+'/users/delete',user);
  }

   deactivateUser(user:any){
    return this.httpClient.post(this.endpoint+'/users/users/' + user.id + '/disable',user);
  }

   activateUser(user:any){
    return this.httpClient.post(this.endpoint+'/users/users/' + user.id + '/enable',user);
  }
}
