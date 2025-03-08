import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {}

  handleError(error: HttpErrorResponse) {
    let summary: string = 'Error';
    let detail: string = 'An unexpected error occured. Please try again later.';

    if (error.status === 0) {
      summary = 'Network Error';
      detail =
        'Unable to connect to the server. Please check your internet connection or try again later.';
    } else {
      summary = error.statusText;
      detail = error.error.message;
    }

    this.messageService.add({ severity: 'error', summary, detail });
  }
}
