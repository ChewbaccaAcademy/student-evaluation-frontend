import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  componentRef: ComponentRef<SpinnerComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  fetchingStatusChanged(input: boolean): void {
    if (input) {
      this.show();
    } else {
      this.hide();
    }
  }

  hide() {
    // this.appRef.detachView(this.componentRef.hostView);
    // this.componentRef.destroy();
  }

  show() {
    // this.componentRef = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent).create(this.injector);

    // this.appRef.attachView(this.componentRef.hostView);

    // const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // document.body.appendChild(domElem);
  }
}
