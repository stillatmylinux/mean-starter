import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject"

export class CssModeService {

	private cssModeObs = new Subject<string>()
	private currentMode: string;

	constructor() {

		let theme = localStorage.getItem('theme');
		if(theme)
			this.currentMode = theme;
		else
			this.currentMode = 'day';

		this.changeMode(this.currentMode)
	}

	toggleMode() {
		this.currentMode = (this.currentMode == 'day') ? 'night' : 'day'
		this.changeMode(this.currentMode)
	}

	getCurrentMode() {
		return this.currentMode;
	}

	changeMode(mode) {

		this.currentMode = mode;

		let cssMode: string;
		
		switch(mode) {
			case 'night':
				cssMode = 'grey darken-3 night'
				break
			case 'day':
			cssMode = 'grey lighten-5 day'
			default:
				break
		}

		window.document.getElementsByTagName('body')[0].setAttribute('class', cssMode)
		localStorage.setItem('theme', this.currentMode)

		this.cssModeObs.next(this.currentMode)
	}

	cssMode() {
		return this.cssModeObs
	}
}