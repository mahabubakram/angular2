import {CoreModule} from '../core/core.module';
import {CommonModule}        from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        CoreModule
    ],
    entryComponents: [
    ],
    exports: [
        FormsModule,
        CommonModule
    ]
})
export class SharedModule {
}
