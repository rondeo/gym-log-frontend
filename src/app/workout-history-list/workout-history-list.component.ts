import { Component, OnInit } from '@angular/core';
import { LogRoutineService } from '../shared/services/log-routine.service';
import { Routine } from '../shared/models/routine.model';
import { RoutineService } from '../shared/services/routine.service';
import { SavedRoutine } from '../shared/models/saved-routine.model';
import {Subscription, from} from "rxjs";

@Component({
  selector: 'app-workout-history-list',
  templateUrl: './workout-history-list.component.html',
  styleUrls: ['./workout-history-list.component.css'],
})

export class WorkoutHistoryListComponent implements OnInit {
  showClasses = {show: false};
  private workoutsSub: Subscription;
  savedRoutines: {}[] = [];
  lastWorkout: {};
  currentWorkout: any;
  currentExercises = [];
  constructor(private logRoutineService: LogRoutineService, private routineService: RoutineService) {}

  async ngOnInit() {
    await this.logRoutineService.getWorkouts();
    this.workoutsSub = await this.logRoutineService.getSavedRoutinesUpdateListener()
      .subscribe((savedWorkouts: SavedRoutine[]) => {
        this.savedRoutines = savedWorkouts;
        this.savedRoutines = this.savedRoutines.reverse();
        this.lastWorkout = savedWorkouts[0];
        this.currentWorkout =  savedWorkouts[0];
        console.log(savedWorkouts);
      });
  }

  async openModal(i) {
    if (i) {
      this.currentWorkout = await this.savedRoutines[i];
    } else {
      this.currentWorkout = await this.lastWorkout;
    }
    this.showClasses.show === false ? this.showClasses.show = true : this.showClasses.show = false;
  }

  closeModal() {
    this.showClasses.show === true ? this.showClasses.show = false : this.showClasses.show = true;
    console.log(this.currentWorkout);
  }

  onDeleteWorkout() {
    this.logRoutineService.deleteRoutine(this.currentWorkout);
  }

}

