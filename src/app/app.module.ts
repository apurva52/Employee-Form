import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { DropdownModule } from 'primeng-lts/dropdown';
import { AppComponent } from './app.component';



// primeng
import { ToolbarModule } from 'primeng-lts/toolbar';
import { TableModule } from 'primeng-lts/table';
import { ButtonModule } from 'primeng-lts/button';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';
import { CardModule } from 'primeng-lts/card';
import { InputTextModule } from 'primeng-lts/inputtext';
import { PasswordModule } from 'primeng-lts/password';
import { ToastModule } from 'primeng-lts/toast';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfirmDialogModule,
    DropdownModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // primeng
    ToolbarModule,
    CheckboxModule,
    ButtonModule,
    OverlayPanelModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
