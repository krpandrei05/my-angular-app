import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-homepage',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {}
