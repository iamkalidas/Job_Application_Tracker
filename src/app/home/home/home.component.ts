import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  whatToShow = 0; // Variable to determine what content to show

  show(num: number) {
    this.whatToShow = num; // Update the value to show the selected content
  }
}
