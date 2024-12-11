import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrawlerInterceptor } from './crawler.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([
        { provide: HTTP_INTERCEPTORS, useClass: CrawlerInterceptor, multi: true }
      ])
    )
  ]
});
