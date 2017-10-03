import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedIn = false;
  paramSubscription: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    //this.loggedIn = authService.loggedIn;
  }

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn;

    console.log("home on init executed!");
    /*this.paramSubscription = this.route.params.subscribe((params: Params) => {

    });*/
  }

  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: 1 }, fragment: 'loading'});
  }

  ngOnDestroy() {
    //this.paramSubscription.unsubscribe();
  }

  onLogin() {
    this.authService.login();
    this.onRefresh();
  }

  onLogout() {
    this.authService.logOut();
    this.onRefresh();
  }

  onRefresh() {
    this.router.navigate(['/servers'], {relativeTo: this.route});
  }
}
