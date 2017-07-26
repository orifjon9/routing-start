import {Component, OnDestroy, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  parameterSubscription: Subscription;
  constructor(private serversService: ServersService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {
    //const _id: number = this.route.snapshot.params['id'];

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
/*
    this.parameterSubscription = this.route.params.subscribe((param: Params) =>{
      const _id: number = param['id'];

      this.server = this.serversService.getServer(_id);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });*/
  }

  ngOnDestroy(){
    //this.parameterSubscription.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
