import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobApplication } from 'src/app/dashboard/job-application.model';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() application: JobApplication; // Pass the application data

  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete() {
    this.activeModal.close('delete'); // Signal the delete action
  }
}
