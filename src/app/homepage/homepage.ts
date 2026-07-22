import { Component } from '@angular/core';
import { MyTasks } from '../my-tasks/my-tasks';

@Component({
  selector: 'app-homepage',
  imports: [MyTasks],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {}
