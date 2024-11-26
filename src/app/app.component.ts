import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CrawlerComponent} from './crawler/crawler.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrawlerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebCrawler';
}
