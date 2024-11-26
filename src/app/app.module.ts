import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrawlerInterceptor } from './crawler.interceptor';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CrawlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
