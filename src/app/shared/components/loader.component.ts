import { Component, Input } from '@angular/core';

/**
 * The component displayed in the confirmation modal opened by the ConfirmService.
 */
@Component({
    selector: 'app-loader',
    template: `<div [class.inline]="type == 0" class="loading-wrap"  [class.fullscreen]="type == 1" [class.triggerScreen]="type == 2">
                <div class="loading-container">
                    <div class="loading-icon">
                        <img alt="Loading..." src="assets/images/img_loading.gif"/>
                    </div>
                </div>
              </div>`
})
export class LoaderComponent {
    @Input() type: any;
    constructor() {
        this.type = 1;
    }
}