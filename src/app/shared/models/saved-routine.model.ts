import {Exercise} from './exercise.model';

export class SavedRoutine {
  public name: string;
  public date: string;
  public exercises: Exercise[];
  public icon: string;

  constructor(name: string, exercises: Exercise[], icon: string) {
    let date = new Date();
    let day = date.getDate();
    let month = (date.getMonth() + 1);
    let year = date.getFullYear();
    let currentDate = `${month}/${day}/${year}`;
    this.name = name;
    this.date = currentDate;
    this.exercises = exercises;
    this.icon = icon;
  }
}
