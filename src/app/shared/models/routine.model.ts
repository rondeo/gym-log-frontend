export class Routine {
  public _id: string;
  public name: string;
  public icon: string;
  public exercises: any[];

  constructor(name: string, exercises: any[], icon: string) {
    this._id = null;
    this.name = name;
    this.exercises = exercises;
    this.icon = icon;
  }
}
