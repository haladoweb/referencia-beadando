import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerStore } from '../store/spinner.store';
import { delay, finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerStore);
  spinner.show();
  return next(req).pipe(
    delay(1000),
    finalize(() => spinner.hide())
  );
};
