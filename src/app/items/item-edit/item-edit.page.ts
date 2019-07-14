import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ItemService} from '../items.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../item';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.page.html',
  styleUrls: ['./item-edit.page.scss'],
})
export class ItemEditPage implements OnInit, OnDestroy {
  @Input() item: Item;
  private subscriptions = [];
  constructor(private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscriptions.push(this.itemService.getById(id).subscribe(
        item => this.item = item,
        error => {
          console.log(error);
        }));
  }

  updateItem() {
    console.log('update');
    this.subscriptions.push(this.itemService.update(this.item).subscribe(
        item => {
          // console.log('updateeeeeeeeeeeee', item);
          const url = `items/detail/${this.item._id}`;
          // console.log('url: ', url);
          this.router.navigate([url]);
        },
        error => {
          console.log(error);
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subcription => subcription.unsubscribe());
  }
}
