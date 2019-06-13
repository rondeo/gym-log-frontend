import {SavedRoutine} from '../models/saved-routine.model';
import {Exercise} from '../models/exercise.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable, OnDestroy} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LogRoutineService implements OnDestroy {

  constructor(private http: HttpClient) {
  }

  savedRoutines: SavedRoutine[] = [];

  private savedRoutinesUpdated = new Subject<SavedRoutine[]>();

  getWorkouts() {
    this.http.get<{ message: string, workouts: SavedRoutine[] }>('http://localhost:8080/api/workouts')
      .subscribe((workoutData) => {
        this.savedRoutines = workoutData.workouts;
        this.savedRoutinesUpdated.next([...this.savedRoutines]);
      });
  }

  getSavedRoutinesUpdateListener() {
    return this.savedRoutinesUpdated.asObservable();
  }

  async saveRoutine(name: string, exercises: any[], icon: string) {
    const routine = await new SavedRoutine(name, exercises, icon);
    console.log(exercises[0]);
    this.http.post<{ message: string }>('http://localhost:8080/api/workouts', routine)
      .subscribe(responseData => {
        //console.log(responseData.message);
        this.savedRoutines.push(routine);
        this.savedRoutinesUpdated.next([...this.savedRoutines]);
      });
  }

  deleteRoutine(workout: any) {
    this.http.delete<{message: string}>('http://localhost:8080/api/workouts/' + workout._id)
    .subscribe(responseData => {
      //console.log(responseData.message);
      //this.savedRoutines.push(routine);
      //this.savedRoutinesUpdated.next([...this.savedRoutines]);
    });
  }

  ngOnDestroy(): void {
    this.savedRoutinesUpdated.unsubscribe();
  }

}
