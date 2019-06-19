import { Routine } from '../models/routine.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// @ts-ignore
@Injectable({providedIn: 'root'})
export class RoutineService {
  private routines: Routine[] = [];
  private routinesUpdated = new Subject<Routine[]>();
  private routine: Routine;

  constructor( private http: HttpClient, private router: Router) {}

  getRoutines() {
<<<<<<< HEAD
    this.http.get<{message: string, routines: Routine[]}>('api/routine')
=======
    this.http.get<{ message: string, routines: Routine[] }>('http://localhost:8080/api/routine')
>>>>>>> 513e077... Added form validation for signin and signup + fixed default picture for avatar
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
    this.http.post<{message: string}>('api/routine', routine)
      .subscribe(responseData => {
        this.routines.push(routine);
        this.routinesUpdated.next([...this.routines]);
        this.router.navigate(['/routines']);
      });
  }

  deleteRoutine(routineId: string) {
    this.http.delete('api/routine/' + routineId)
      .subscribe(() => {
        const updatedRoutines = this.routines.filter(routine => routine._id !== routineId);
        this.routines = updatedRoutines;
        this.routinesUpdated.next([...this.routines]);
      });
  }
}
