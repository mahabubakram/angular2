import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';

//custome module and components
import {DashboardSensorModule} from './dashboard-sensor/dashboard-sensor.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule}   from './app-routing.module';
import {PageNotFoundModule} from './page-not-found/page-not-found.module';
import {AppComponent} from './app.component';



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        HttpModule,
        DashboardSensorModule,
        SharedModule,
        CoreModule,
        PageNotFoundModule,
        AppRoutingModule,
        StoreModule.provideStore({
        }),
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
