export class Exercise {
	public name: string;
	public sets: number;
	public reps: number[];
	public weight: number[];
	
	constructor(name: string, sets: number, reps: number[], weight: number[]) {
		this.name = name;
		this.sets = sets;
		this.reps = reps;
		this.weight = weight;
	}
}