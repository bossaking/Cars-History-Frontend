import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {User} from "../models/users/user";
import {RequestDecision} from "../models/users/request-decision";

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.scss']
})
export class RegistrationRequestsComponent implements OnInit {

  users: User[] | null = null;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.registrationRequests().subscribe(result => {
      this.users = result.users;
    });
  }


  decision(userId: number, decision: boolean) {

    let decisionRequest: RequestDecision = {
      userId: userId,
      decision: decision
    };

    this.usersService.registrationRequestsDecision(decisionRequest).subscribe(result => {
      if(result){
       this.users?.splice(this.users?.indexOf(this.users?.find(u => u.id === userId)!), 1);
      }
    });
  }
}
