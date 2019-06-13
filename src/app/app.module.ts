import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CreateRoutineComponent } from './create-routine/create-routine.component';
import { LogWorkOutComponent } from './log-work-out/log-work-out.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WorkoutHistoryListComponent } from './workout-history-list/workout-history-list.component';
import { Routes, RouterModule} from '@angular/router';
import { RoutinesComponent } from './routines/routines.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { AuthGuard } from "./auth/auth.gaurd";
import { MatSidenavModule } from '@angular/material/sidenav';

const appRoutes: Routes = [
{ path: '', component: WorkoutHistoryListComponent },
{ path: 'workout-history', component: WorkoutHistoryListComponent },
{ path: 'routines', component: RoutinesComponent },
{ path: 'create-routine', component: CreateRoutineComponent, canActivate: [AuthGuard] },
{ path: 'log-workout', component: LogWorkOutComponent, canActivate: [AuthGuard] },
{ path: 'signup', component: SignupComponent },
{ path: 'signin', component: SigninComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateRoutineComponent,
    LogWorkOutComponent,
    NavBarComponent,
    WorkoutHistoryListComponent,
    RoutinesComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
