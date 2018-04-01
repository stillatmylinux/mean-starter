import { Component, NgZone, OnInit, HostListener, isDevMode, OnDestroy } from '@angular/core';

import { AuthService } from "../auth/auth.service";
import { CssModeService } from "../service/css.mode.service";
import { User } from '../auth/user.model';

declare var $;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    public user: User;
    public themeMode: string;
    public devMode: boolean;
    public subscriptions: any[] = [];

    constructor(
        private ngZone: NgZone,
        private cssmodeservice: CssModeService,
        private authService: AuthService
    ) { }

    ngOnInit() {

        let component = this;
        this.subscriptions.push( this.cssmodeservice.cssMode().subscribe(themeMode => {
            this.themeMode = themeMode
        }) );
        this.devMode = isDevMode();

        this.user = this.authService.checkLoginStorage();

        this.subscriptions.push( this.authService.loginStatus().subscribe((user) => {

            // Allow the view to be updated after login
            // https://angular.io/api/core/NgZone
            this.ngZone.run(() => {
                component.user = user;
            });
        }) );
    }

    logout() {
        $('.button-collapse').sideNav('hide');
        this.authService.logout();
    }

    switchTheme(event: any) {
        console.log('switch theme');
        event.preventDefault();
        event.stopPropagation();
        this.cssmodeservice.toggleMode();
    }

    ngOnDestroy() {
        for(let i=0;i<this.subscriptions.length;i++) {
            this.subscriptions[i].unsubscribe();
        }
    }
}