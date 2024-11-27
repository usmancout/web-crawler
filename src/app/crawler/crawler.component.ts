import { Component, OnInit } from '@angular/core';
import { CrawlerService } from '../crawler.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./crawler.component.css']
})
export class CrawlerComponent implements OnInit {
  htmlContent: string = '';
  errMsg: string = '';

  constructor(private crawlerService: CrawlerService) {}

  fetchData (){
    this.crawlerService.fetchPage().subscribe({
      next: (response) => {
        this.htmlContent = response;
      },
      error: () => {
        this.errMsg = 'Error fetching data';
      }
    });
  }

  ngOnInit(): void {
  }
}
