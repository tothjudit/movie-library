import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() maxStars = 5;
  stars = [1, 2, 3, 4, 5];

  value: number | null = null;
  isDisabled = false;

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setRating(star: number): void {
    if (this.isDisabled) {
      return;
    }

    this.value = this.value === star ? null : star;
    this.onChange(this.value);
    this.onTouched();
  }

  isFilled(star: number): boolean {
    return (this.value ?? 0) >= star;
  }

  clearRating(): void {
    if (this.isDisabled) {
      return;
    }

    this.value = null;
    this.onChange(this.value);
    this.onTouched();
  }
}
