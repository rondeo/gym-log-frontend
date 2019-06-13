import {Component, OnDestroy, OnInit} from '@angular/core';
import { Routine } from '../shared/models/routine.model';
import { RoutineService } from '../shared/services/routine.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit, OnDestroy {

  //VARS
  routines: Routine[] = [];
  private routinesSub: Subscription;

  //INITIALIZE SERVICES
  constructor( public routineService: RoutineService ) { }

  //INITIAL METHOD
  ngOnInit() {
	  this.routineService.getRoutines();
	  this.routinesSub = this.routineService.getRoutineUpdateListener()
	    .subscribe((routines: Routine[]) => {
			this.routines = routines;
			console.log(this.routines);
		});
  }
  
  onDelete(routineId: string){
	  this.routineService.deleteRoutine(routineId);
  }
  
  //AVOID MEMORY LEAKS
  ngOnDestroy() {
	  this.routinesSub.unsubscribe();
  }

}
