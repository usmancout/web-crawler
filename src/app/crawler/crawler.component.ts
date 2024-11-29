import { Component, OnInit } from '@angular/core';
import { CrawlerService } from '../crawler.service';
import * as cheerio from 'cheerio';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.css'],
  imports: [NgForOf, NgIf],
  standalone: true,
})
export class CrawlerComponent implements OnInit {
  headerExplanation: { header: string; explanation: string }[] = [];
  errorMessage: string = '';

  constructor(private crawlerService: CrawlerService) {
  }

  ngOnInit(): void {
  }

  fetchAndParse(): void {
    this.crawlerService.fetchPage().subscribe({
      next: (response) => {
        this.extractHeadersAndDescription(response);
      },
      error: () => {
        this.errorMessage = 'Error fetching data';
      },
    });
  }

  extractHeadersAndDescription(html: string): void {
    try {
      const $ = cheerio.load(html);
      const headers = $('h1, h2, h3');
      this.headerExplanation = [];
      const seenHeaders = new Set();

      headers.each((index, headerElement) => {
        const headerText = $(headerElement).text().trim();


        if (seenHeaders.has(headerText)) {
          console.log('Skipping duplicate header:', headerText);
          return;
        }

        let explanation = '';
        console.log('Processing header:', headerText);

        const nextElement = $(headerElement).next('p');
        if (nextElement.length) {
          explanation = nextElement.text().trim();
          console.log('Found explanation directly after header:', explanation);
        }

        if (!explanation) {
          const container = $(headerElement).closest('section, article');
          if (container.length) {

            // @ts-ignore
            container.find('p').each((_, paragraph) => {
              const text = $(paragraph).text().trim();

              if (text && !seenHeaders.has(text)) {
                explanation = text;
                console.log('Found explanation within container:', explanation);
                return false;
              }
            });
          }
        }

        if (!explanation) {
          explanation = 'No explanation found';
          console.log('No explanation available for header:', headerText);
        }


        this.headerExplanation.push({
          header: headerText,
          explanation: explanation,
        });


        seenHeaders.add(headerText);
        seenHeaders.add(explanation);
      });

      console.log('Extracted headers and explanations:', this.headerExplanation);
    } catch (error) {
      console.error('Error parsing HTML:', error);
      this.errorMessage = 'Error parsing content';
    }
  }

  downloadData(): void {
    const jsonData = JSON.stringify(this.headerExplanation, null, 2);
    const blob = new Blob([jsonData], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bbc_data.json';
    link.click();

  }
}
