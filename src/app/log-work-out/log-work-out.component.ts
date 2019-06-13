import {Component, OnInit, OnDestroy} from '@angular/core';
import {RoutineService} from '../shared/services/routine.service';
import {Routine} from '../shared/models/routine.model';
import {FormArray, FormControl, FormGroup, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Exercise} from '../shared/models/exercise.model';
import {SavedRoutine} from '../shared/models/saved-routine.model';
import {LogRoutineService} from '../shared/services/log-routine.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-work-out',
  templateUrl: './log-work-out.component.html',
  styleUrls: ['./log-work-out.component.css']
})

export class LogWorkOutComponent implements OnInit, OnDestroy {
  logRoutineForm: FormGroup;
  private routinesSub: Subscription;
  currentRoutine: Routine;
  routines: Routine[] = [];
  exercises: any[];


  constructor(private routineService: RoutineService, private logRoutineService: LogRoutineService, private router: Router) {
  }

  async ngOnInit() {
    await this.routineService.getRoutines();
    this.routinesSub = await this.routineService.getRoutineUpdateListener()
      .subscribe((routines: Routine[]) => {
        this.routines = routines;
        this.exercises = routines[0].exercises;
        const currentRoutine = routines[0];
        this.currentRoutine = currentRoutine;
        this.refreshRoutine();
      });
  }

  //https://stackoverflow.com/questions/48436145/angular-reactive-forms-with-nested-form-arrays

  private refreshRoutine() {
    const currentExercises = this.currentRoutine.exercises.map(exercise => {
      return exercise.exerciseName;
    });
    const routineLog = new FormArray([]);
    this.logRoutineForm = new FormGroup({
      'routineLog': routineLog
    });
    currentExercises.forEach(exercise => {
      (<FormArray>this.logRoutineForm.get('routineLog')).push(
        new FormGroup({
          'exerciseName': new FormControl(exercise),
          'sets': new FormArray([
            new FormGroup({
              'reps': new FormControl([]),
              'weight': new FormControl([])
            })
          ])
        })
      );
    });
  }

  onAddSet(exercise) {
    (<FormArray>exercise.get('sets')).push(
      new FormGroup({
        'reps': new FormControl([]),
        'weight': new FormControl([])
      })
    );
  }

  onDeleteSet(exercise) {
    (<FormArray>exercise.get('sets')).removeAt(0);
  }

  changeCurrentRoutine(i: number) {
    this.currentRoutine = this.routines[i];
    const routineLog = new FormArray([]);
    this.logRoutineForm = new FormGroup({
      'routineLog': routineLog
    });
    this.refreshRoutine();
  }

  async onSubmit() {
    const exercises = await [];
    await this.logRoutineForm.get('routineLog').value.forEach(async exercise => {
      const exerciseName = await exercise.exerciseName;
      const reps = await [];
      const weight = await [];
      const sets = await exercise.sets.length;
      exercise.sets.forEach(set => {
        reps.push(set.reps);
        weight.push(set.weight);
      });
      const newExercise = new Exercise(exerciseName, sets, reps, weight);
      exercises.push(newExercise);
      await this.logRoutineService.saveRoutine(this.currentRoutine.name, exercises, this.currentRoutine.icon);
    });
    this.router.navigate(['/workout-history']);
  }

  ngOnDestroy() {
    this.routinesSub.unsubscribe();
  }
}
