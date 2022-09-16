import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  requestsCount: number = 0;

  constructor(private router: Router, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/admin') {
          this.router.navigate(['/admin/users']);
        }
      }
    });

    this.usersService.requestsCount().subscribe(result => {
      this.requestsCount = result.usersCount;
    });

  }

}
