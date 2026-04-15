import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastMessage, ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm = '';
  readonly toasts$: Observable<ToastMessage[]>;

  constructor(
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {
    this.toasts$ = this.toastService.toasts$;
  }

  onSearch(): void {
    this.router.navigate(['/movies'], { queryParams: { q: this.searchTerm || null } });
  }

  dismissToast(id: number): void {
    this.toastService.dismiss(id);
  }
}