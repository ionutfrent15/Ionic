import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from './item';
import {ItemService} from './items.service';
import {IonInfiniteScroll, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {

  subscriptions = [];
  items: Item[];
  private error: Error;
  private loading: any;

  constructor(private itemService: ItemService,
              private loadingController: LoadingController,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadItems();
  }

  async showItemDetails(item: Item) {
      this.router.navigate([`/items/detail/${item._id}`]);
  }

  async presentLoading() {
  }

  async loadItems() {
     this.loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 2000
     });
     await this.loading.present();

     this.subscriptions.push(this.itemService.getAll().subscribe(items => {
     // this.subscriptions.push(this.itemService.getPaginated(this.page).subscribe(items => {
      this.items = items;
      this.loading.dismiss();
      }, error => {
      this.error = error;
      this.loading.dismiss();
      }));

     this.subscriptions.push(this.itemService.refresh().subscribe());
  }

  retry() {
    this.loadItems();
  }

  ngOnDestroy(): void {
    this.loading.dismiss();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
