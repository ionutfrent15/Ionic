import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ItemService} from '../items.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../item';

@Component({
    selector: 'app-item',
    templateUrl: './item.page.html',
    styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit, OnDestroy {
    private subscriptions = [];
    private item: Item;

    constructor(private itemService: ItemService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.subscriptions.push(this.itemService.getById(id).subscribe(
            item => {
                this.item = item;
                this.itemService.getItemUpdated().subscribe(itemUpd => {
                    if (itemUpd && itemUpd._id === this.item._id) {
                        this.item = itemUpd;
                    }
                });
            },
            error => {
                console.log(error);
            }));


    }

    updateItem() {
        this.router.navigate([`/items/detail/${this.item._id}/edit`]);
    }

    deleteItem() {
        this.subscriptions.push(this.itemService.delete(this.item)
            .subscribe());
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subcription => subcription.unsubscribe());
    }
}
