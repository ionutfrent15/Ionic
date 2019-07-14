import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemsPage } from './items.page';
import {ItemService} from './items.service';
import {HttpClientModule} from '@angular/common/http';
import {ItemAddPage} from './item-add/item-add.page';
import {ItemEditPage} from './item-edit/item-edit.page';
import {ItemPage} from './item/item.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsPage
  },
  {
    path: 'detail/:id',
    component: ItemPage
  },
  {
    path: 'detail/:id/edit',
    component: ItemEditPage
  },
  {
    path: 'add',
    component: ItemAddPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemsPage, ItemAddPage, ItemEditPage, ItemPage],
  providers: [ItemService]
})
export class ItemsPageModule {}
