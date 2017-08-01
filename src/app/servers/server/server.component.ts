import {Component, OnDestroy, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  paramSubscription: Subscription;

  constructor(private serversService: ServersService,
            private route: ActivatedRoute,
            private router:Router) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.params['id'];
    this.loadServer(id);

    this.paramSubscription = this.route.params.subscribe((params:Params) =>{
      this.loadServer(+params['id']);
    });

  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }

  private loadServer(id: number){
    this.server = this.serversService.getServer(id);
  }
}
