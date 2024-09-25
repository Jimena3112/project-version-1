import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Issue } from "../../model/issue.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-issue-resolution-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './issue-resolution-create-and-edit.component.html',
  styleUrl: './issue-resolution-create-and-edit.component.css'
})
export class IssueResolutionCreateAndEditComponent {
  // Attributes
  @Input() issue: Issue;
  @Input() editMode: boolean = false;
  @Output() issueAdded: EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() issueUpdated: EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('issueForm', {static: false}) issueForm!: NgForm;

  // Methods
  constructor() {
    this.issue = {} as Issue;
  }

  // Private methods
  private resetEditState(): void {
    this.issue = {} as Issue;
    this.editMode = false;
    this.issueForm.reset();
    this.issueForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.issueForm.form.valid) {
      let emitter: EventEmitter<Issue> = this.editMode ? this.issueUpdated : this.issueAdded;
      emitter.emit(this.issue);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
