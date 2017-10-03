import {Component, OnDestroy, OnInit} from '@angular/core';

import { ServersService } from '../../_services/servers.service';
import {ActivatedRoute, CanDeactivate, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";
import {CanDeactivateGuard} from "../../_services/can-deactivate-guard.service";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy, CanDeactivate<CanDeactivateGuard> {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit:boolean = false;
  parameterSubscription: Subscription;
  changesSaved = false;

  constructor(private serversService: ServersService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.params['id'];
    this.loadServerData(id);

    this.route.queryParams.subscribe((params: Params) => {
      this.allowEdit = params['allowEdit'] === '1' ? true : false;
    });

    this.parameterSubscription = this.route.params.subscribe((param: Params) =>{
      const id: number = +param['id'];
      this.loadServerData(id);
    });
  }

  loadServerData(id){
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  ngOnDestroy(){
    this.parameterSubscription.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;

    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate (): Observable<boolean> | Promise<boolean> | boolean{
    if(!this.allowEdit){
      return true;
    }

    if((this.server.name !== this.serverName || this.server.status !== this.serverStatus) && !this.changesSaved){
      return confirm("Do you want to discard the changes?");
    }
    else
    {
      return true;
    }
  }
}
