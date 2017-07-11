import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PageNotFoundComponent} from './page-not-found.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'page-not-found', component: PageNotFoundComponent}
  ])],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule {
}
