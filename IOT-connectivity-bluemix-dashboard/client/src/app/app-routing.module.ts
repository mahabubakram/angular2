import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard-sensor/dashboard-sensor.component";

export const routes: Routes = [
    {path: 'dashboard-sensor1',data: {sensor: 'sensor1'}, component: DashboardComponent, pathMatch: 'full'},
    {path: 'dashboard-sensor2', data: {sensor: 'sensor2'}, component: DashboardComponent, pathMatch: 'full'},
    {path: '**', redirectTo: 'page-not-found', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
