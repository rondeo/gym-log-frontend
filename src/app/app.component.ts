import {Component, OnInit} from '@angular/core';
import { RoutineService } from './shared/services/routine.service';
import { LogRoutineService } from './shared/services/log-routine.service';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RoutineService, LogRoutineService]
})
export class AppComponent implements OnInit{
	
  constructor( public routineService: RoutineService, public logRoutineService: LogRoutineService, private authService: AuthService ) { }
  
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
