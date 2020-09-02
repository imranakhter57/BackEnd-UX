import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'mwl-text-input-autocomplete-menu',
    template: `
				<mat-accordion [style.top.px]="position?.top" [style.left.px]="position?.left" *ngIf="choices && choices.rules && choices.rules.length" class="dropdown-menu dropdownlist" >
					<mat-expansion-panel [expanded]="i == 0" *ngFor="let choice of choices.rules; let i = index; trackBy:trackById">
						<mat-expansion-panel-header>
							<span class="expression">{{ choice.key }}</span>
						</mat-expansion-panel-header>
						<mat-accordion>
							<mat-expansion-panel *ngFor="let rules of choice.value">
								<mat-expansion-panel-header (click)="selectChoice.next(rules)">

									<a href="javascript:;" class="expression-list icon-green">
										{{ rules.aliasName }} <span class="version" *ngIf="rules.version" [innerHTML]="' (V '+rules.version+')'"></span>
									</a>
								</mat-expansion-panel-header>
							</mat-expansion-panel>
						</mat-accordion>
					</mat-expansion-panel>
					<!-- <ng-container *ngIf="choices && choices.inbuiltFun" >
						<mat-expansion-panel [expanded]="i == 0" *ngFor="let choice of choices.inbuiltFun; let i = index; trackBy:trackById">
							<mat-expansion-panel-header (click)="selectChoice.next(choice.display)">
								<a href="javascript:;">
									{{ choice.name }}
								</a>
							</mat-expansion-panel-header>
						</mat-expansion-panel>
					</ng-container> -->
				</mat-accordion>
				`,
    styles: [
        `.dropdown-menu {
			display: block;
			max-height: 200px;
			overflow-y: auto;
		}`
    ]
})
export class AppTextAreaAutocompleteComponent {
    position: { top: number; left: number };
    selectChoice = new Subject();
    searchText: string;
    choiceLoadError: any;
    choiceLoading = false;
    private _choices: any;
    trackById = (index: number, choice: any) =>
        typeof choice.id !== 'undefined' ? choice.id : choice;

    set choices(choices: any) {
        this._choices = choices;
    }
    get choices() {
        return this._choices;
    }
}