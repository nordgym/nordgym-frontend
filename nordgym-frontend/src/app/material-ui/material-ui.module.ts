import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {AppRoutingModule} from '../app-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';

const modules = [
  AppRoutingModule,
  CommonModule,
  MatTableModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatSelectModule,
  MatCheckboxModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatTabsModule,
  MatCardModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialUiModule {}
