import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable()
export class AuthService implements CanActivate {

    public token: string;
    public user;

    constructor(private router: Router) { }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.token = localStorage.getItem('rsc.token');
        this.user = JSON.parse(localStorage.getItem('rsc.user'));

        if (!this.token) {
            this.router.navigate(['/cadastro']);
        }

        let claim: any = routeAc.data[0];
        if (claim !== undefined) {
            claim = routeAc.data[0]['claim'];

            if (claim) {
                if (!this.user.claims) {
                    this.router.navigate(['/acesso-negado']);
                }

                let userClaims = this.user.claims.some(x => x.type === claim.nome && x.value === claim.valor);
                if (!userClaims) {
                    this.router.navigate(['/acesso-negado']);
                }
            }
        }

        return true;
    }
}