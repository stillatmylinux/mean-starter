import { Component, Input, Output } from "@angular/core";

@Component({
	selector: 'process-animation',
	templateUrl: './process-animation.component.html',
	styleUrls: ['./process-animation.component.scss']
})
export class ProcessAnimation {
	@Input() animate: boolean;
	
}