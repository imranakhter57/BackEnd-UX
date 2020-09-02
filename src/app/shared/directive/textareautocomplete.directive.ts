import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Injector, Input, OnDestroy, Output, ViewContainerRef } from '@angular/core';
import getCaretCoordinates from 'textarea-caret';
import { takeUntil } from 'rxjs/operators';
import { AppTextAreaAutocompleteComponent } from '../components/textareautocomplete.component';
import { Subject } from 'rxjs';
import { NgControl } from '@angular/forms';

export interface ChoiceSelectedEvent {
  choice: any;
  insertedAt: {
    start: number;
    end: number;
  };
}

@Directive({
  selector:
    'textarea[mwlAppTextInputAutocomplete],input[type="text"][mwlAppTextInputAutocomplete]'
})
export class AppTextInputAutocompleteDirective implements OnDestroy {
  @Input() triggerCharacter = '@';
  @Input() searchRegexp = /^\w*$/;
  @Input() menuComponent = AppTextAreaAutocompleteComponent;
  @Output() menuShown = new EventEmitter();
  @Output() menuHidden = new EventEmitter();
  @Output() choiceSelected = new EventEmitter<ChoiceSelectedEvent>();
  @Input() findChoices: (searchText: string) => any[] | Promise<any[]>;
  @Input() getChoiceLabel: (choice: any) => string = choice => choice;

  /* tslint:disable member-ordering */
  private menu:
    | {
      component: ComponentRef<AppTextAreaAutocompleteComponent>;
      triggerCharacterPosition: number;
      lastCaretPosition?: number;
    }
    | undefined;

  private menuHidden$ = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private control: NgControl,
    private injector: Injector,
    private elm: ElementRef
  ) { }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event) {
    // console.log(event);
    const text = this.elm.nativeElement.value;

    if (event.key === this.triggerCharacter) {
      this.showMenu();
    } else if (event.key == "Tab") {
      // event.preventDefault();
      // event.stopPropagation();
    }
    // else if (event.key == "f") {
    //       const index = this.elm.nativeElement.selectionStart;
    //       if (text.length && text[index-1] == 'i' ) {
    //         let textFun = text + `f (   ) {
    // } else { &nbsp;
    // } ` 
    //         event.stopPropagation();
    //         this.elm.nativeElement.value = textFun;
    //         this.control.control.setValue(textFun);
    //         event.preventDefault();
    //       }
    // }
  }

  @HostListener('input', ['$event.target.value'])
  onChange(value: string) {
    if (this.menu) {
      if (value[this.menu.triggerCharacterPosition] !== this.triggerCharacter) {
        this.hideMenu();
      } else {
        const cursor = this.elm.nativeElement.selectionStart;
        if (cursor < this.menu.triggerCharacterPosition) {
          this.hideMenu();
        } else {
          const searchText = value.slice(
            this.menu.triggerCharacterPosition + 1,
            cursor
          );
          if (!searchText.match(this.searchRegexp)) {
            this.hideMenu();
          } else {
            this.menu.component.instance.searchText = searchText;
            this.menu.component.instance.choices = [];
            this.menu.component.instance.choiceLoadError = undefined;
            this.menu.component.instance.choiceLoading = true;
            this.menu.component.changeDetectorRef.detectChanges();
            Promise.resolve(this.findChoices(searchText))
              .then((choices: any) => {
                if (this.menu) {
                  this.menu.component.instance.choices = choices;
                  this.menu.component.instance.choiceLoading = false;
                  this.menu.component.changeDetectorRef.detectChanges();
                }
              })
              .catch(err => {
                if (this.menu) {
                  this.menu.component.instance.choiceLoading = false;
                  this.menu.component.instance.choiceLoadError = err;
                  this.menu.component.changeDetectorRef.detectChanges();
                }
              });
          }
        }
      }
    }
  }

  @HostListener('blur')
  onBlur() {
    if (this.menu) {
      this.menu.lastCaretPosition = this.elm.nativeElement.selectionStart;
    }
  }

  private showMenu() {
    if (!this.menu) {
      const menuFactory = this.componentFactoryResolver.resolveComponentFactory<AppTextAreaAutocompleteComponent>(this.menuComponent);
      this.menu = {
        component: this.viewContainerRef.createComponent(menuFactory, 0, this.injector),
        triggerCharacterPosition: this.elm.nativeElement.selectionStart
      };
      const { top, left } = getCaretCoordinates(this.elm.nativeElement, this.elm.nativeElement.selectionStart);
      let textAreaHeight = this.elm.nativeElement.clientHeight;
      this.menu.component.instance.position = { top: top < textAreaHeight ? top + 50 : textAreaHeight - 220, left };
      this.menu.component.changeDetectorRef.detectChanges();
      this.menu.component.instance.selectChoice
        .pipe(takeUntil(this.menuHidden$))
        .subscribe(choice => {
          const label = this.getChoiceLabel(choice);
          const textarea: HTMLTextAreaElement = this.elm.nativeElement;
          const value: string = textarea.value;
          const startIndex = this.menu!.triggerCharacterPosition;
          const start = value.slice(0, startIndex);
          const caretPosition = this.menu!.lastCaretPosition || textarea.selectionStart;
          const end = value.slice(caretPosition);
          textarea.value = start + label + end;
          textarea.dispatchEvent(new Event('input'));
          this.hideMenu();
          let setCursorAt, endCursorAt;
          if (typeof choice == "string") {
            setCursorAt = start.length + label.indexOf('(');
            endCursorAt = start.length + label.indexOf(')') - 1;
            textarea.setSelectionRange(setCursorAt, endCursorAt);
          } else {
            setCursorAt = (start + label).length;
            textarea.setSelectionRange(setCursorAt, setCursorAt);
          }
          textarea.focus();
          this.choiceSelected.emit({
            choice, insertedAt: {
              start: startIndex,
              end: startIndex + label.length
            }
          });
        });
      this.menuShown.emit();
    }
  }

  private hideMenu() {
    if (this.menu) {
      this.menu.component.destroy();
      this.menuHidden$.next();
      this.menuHidden.emit();
      this.menu = undefined;
    }
  }

  ngOnDestroy() {
    this.hideMenu();
  }
}