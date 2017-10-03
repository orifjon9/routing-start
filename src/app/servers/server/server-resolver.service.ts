import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Server} from "../../_models/server";
import {Observable} from "rxjs/Observable";
import {ServersService} from "../../_services/servers.service";
import {Injectable} from "@angular/core";


@Injectable()
export class ServerResolver implements Resolve<Server> {

  constructor(private serversService: ServersService) {}
  resolve(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
