import { UserService } from '@/app/core/service/ws/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  imports: [],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent implements OnInit {

  users:any[] =[];
  constructor(
    private userService:UserService
  ){

  }
  ngOnInit(): void {
    this.initUsers();
  }

  initUsers(){
    this.userService.getUsers().subscribe(
      (response:any) =>{
        this.users = response
      },
      (err) =>{},
      () =>{},
    )
  }

}
