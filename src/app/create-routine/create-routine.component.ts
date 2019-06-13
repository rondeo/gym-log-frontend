import {Component, OnInit} from '@angular/core';
import {RoutineService} from '../shared/services/routine.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css'],
  providers: []
})

export class CreateRoutineComponent implements OnInit {
  createRoutineForm: FormGroup;
  addName = true;
  addExercise = false;
  addIcon = false;
  selectedIcon: string;
  buttonUrls = [
    '../../assets/abs.png',
    '../../assets/arms.png',
    '../../assets/back.png',
    '../../assets/cardio.png',
    '../../assets/chest.png',
    '../../assets/legs.png',
    '../../assets/shoulders.png'
  ];

  constructor(private routineService: RoutineService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
    this.buttonUrls.forEach(image => {
      console.log(image);
    });
  }

  private initForm() {
    const title = '';
    const exercises = new FormArray([
      new FormGroup({
        'exerciseName': new FormControl('')
      })
    ]);

    this.createRoutineForm = new FormGroup({
      'routineTitle': new FormControl(title),
      'routineExercises': exercises
    });
  }

  onAddName() {
    this.addName = true;
    this.addExercise = false;
    this.addIcon = false;
  }

  onAddExercise() {
    this.addName = false;
    this.addExercise = true;
    this.addIcon = false;
  }

  onAddIcon() {
    this.addName = false;
    this.addExercise = false;
    this.addIcon = true;
  }

  selectIcon(i) {
    console.log(`select icon function works! array number ${i}`);
    this.selectedIcon = this.buttonUrls[i];
  }

  onAddExcercise() {
    (<FormArray>this.createRoutineForm.get('routineExercises')).push(
      new FormGroup({
        'exerciseName': new FormControl('')
      })
    );
  }

  async onSubmit() {
    await this.routineService.addRoutine(this.createRoutineForm.value['routineTitle'],
    this.createRoutineForm.value['routineExercises'], this.selectedIcon);
    this.router.navigate(['/routines']);
  }

}
