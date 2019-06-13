import { Routine } from '../models/routine.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// @ts-ignore
@Injectable({providedIn: 'root'})
export class RoutineService implements OnDestroy {
  private routines: Routine[] = [];
  private routinesUpdated = new Subject<Routine[]>();
  private routine: Routine;

  constructor( private http: HttpClient) {}

  getRoutines() {
    this.http.get<{message: string, routines: Routine[]}>('api/routines')
      .subscribe((routineData) => {
        this.routines = routineData.routines;
        this.routinesUpdated.next([...this.routines]);
      });
  }

  getRoutineUpdateListener() {
    return this.routinesUpdated.asObservable();
  }

  addRoutine(name: string, exercises: [], icon: string) {
    const routine = new Routine(name, exercises, icon);
    console.log(exercises);
    this.http.post<{message: string}>('api/routines', routine)
      .subscribe(responseData => {
        this.routines.push(routine);
        this.routinesUpdated.next([...this.routines]);
      });
  }

  deleteRoutine(routineId: string) {
    this.http.delete('api/routines/' + routineId)
      .subscribe(() => {
        const updatedRoutines = this.routines.filter(routine => routine._id !== routineId);
        this.routines = updatedRoutines;
        this.routinesUpdated.next([...this.routines]);
      });
  }
}
