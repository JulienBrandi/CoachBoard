import { Sidebar } from './sidebar/sidebar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { routes } from './app.routes';

@NgModule({    
    imports: [
        App,
        BrowserModule,
        Sidebar,
        routes
    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }