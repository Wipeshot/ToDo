import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoCompComponent } from '../components/todo-comp/todo-comp.component';
import { IndexComponent } from '../components/index/index.component';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { UpdateCompComponent } from '../components/update-comp/update-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoCompComponent,
    IndexComponent,
    TodoFormComponent,
    HeaderComponent,
    UpdateCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
