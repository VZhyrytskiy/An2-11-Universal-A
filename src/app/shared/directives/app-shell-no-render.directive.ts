import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  PLATFORM_ID,
  OnInit,
  Inject
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Directive({
  selector: '[appShellNoRender]'
})
export class AppShellNoRenderDirective implements OnInit {
  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
