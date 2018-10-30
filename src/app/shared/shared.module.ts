import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerComponent } from './spinner/spinner.component';
import { AppShellNoRenderDirective } from './directives/app-shell-no-render.directive';
import { AppShellRenderDirective } from './directives/app-shell-render.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SpinnerComponent, AppShellNoRenderDirective, AppShellRenderDirective],
  exports: [FormsModule, SpinnerComponent, AppShellNoRenderDirective, AppShellRenderDirective]
})
export class SharedModule {}
