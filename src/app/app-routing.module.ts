import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from 'src/components/index/index.component';
import { UpdateCompComponent } from 'src/components/update-comp/update-comp.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'update/:id', component: UpdateCompComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
