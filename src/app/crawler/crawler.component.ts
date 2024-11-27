
import { Component, OnInit } from '@angular/core';
import { CrawlerService } from '../crawler.service';
import * as cheerio from 'cheerio';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.css'],
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class CrawlerComponent implements OnInit {
  headersWithExplanations: { header: string; explanation: string }[] = [];
  errorMessage: string = '';

  constructor(private crawlerService: CrawlerService) {}

  ngOnInit(): void {}

  fetchAndParse(): void {
    this.crawlerService.fetchPage().subscribe({
      next: (response) => {
        this.extractHeadersAndExplanations(response);
      },
      error: () => {
        this.errorMessage = 'Error fetching data';
      },
    });
  }

  extractHeadersAndExplanations(html: string): void {
    try {
      const $ = cheerio.load(html);
      const headers = $('h1, h2, h3');
      this.headersWithExplanations = [];
      headers.each((index, headerElement) => {
        const headerText = $(headerElement).text().trim();

        let explanation = '';
        let nextSibling = $(headerElement).next();

        if (nextSibling && nextSibling[0]?.name === 'p') {
          explanation = nextSibling.text().trim();
        }
        this.headersWithExplanations.push({ header: headerText, explanation });
      });

    } catch (error) {
      console.error('Error parsing HTML:', error);
      this.errorMessage = 'Error parsing content';
    }
  }
}
