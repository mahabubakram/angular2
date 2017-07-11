//import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PageNotFoundRoutingModule} from './page-not-found-routing.module';

import {PageNotFoundComponent} from './page-not-found.component';

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        PageNotFoundRoutingModule
    ],
    exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {
}
