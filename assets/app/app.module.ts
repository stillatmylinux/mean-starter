import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { routing } from "./app.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { Dashboard } from "../pages/dashboard/dashboard.component";
import { AuthenticationComponent } from "../auth/authentication.component";
import { ErrorComponent } from "../errors/error.component";
import { HomeComponent } from "../pages/home/home.component";
import { PageNotFound } from "../pages/404/404.component";
import { ProcessAnimation } from "../share/process-animation/process-animation.component";
import { SpinnerComponent } from "../share/spinner/spinner.component";
import { DndModule } from 'ng2-dnd';
import { ngfModule, ngf } from "angular-file";
import { AuthService } from "../auth/auth.service";
import { AuthGuardService } from "../auth/auth-guard.service";
import { ErrorService } from "../errors/error.service";
import { CssModeService } from "../service/css.mode.service";
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { UserProfileComponent } from "../pages/dashboard/user-profile/user-profile.component";

@NgModule({
    declarations: [
        AppComponent,
        Dashboard,
        AuthenticationComponent,
        SpinnerComponent,
        HomeComponent,
        PageNotFound,
        ProcessAnimation,
        ErrorComponent,
        UserProfileComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        Ng2GoogleChartsModule,
        routing,
        HttpClientModule,
        ngfModule,
        DndModule.forRoot()
    ],
    providers: [
        AuthService,
        ErrorService,
        AuthGuardService,
        CssModeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}