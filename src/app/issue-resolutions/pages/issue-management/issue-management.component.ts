import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { IssueResolutionApiService } from "../../services/issue-resolution-api.service";
import { Issue } from "../../model/issue.entity";
import { IssueResolutionCreateAndEditComponent } from "../../components/issue-resolution-create-and-edit/issue-resolution-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-issue-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatSortModule, MatIconModule, IssueResolutionCreateAndEditComponent, MatTableModule, NgClass, TranslateModule, MatLabel, MatFormField, MatInput, MatCheckboxModule],
  templateUrl: './issue-management.component.html',
  styleUrl: './issue-management.component.css'
})
export class IssueManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  issueData: Issue;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'id', 'description', 'issue_to_solve', 'inspection_date', 'inspector', 'personal_responsible', 'inspection_area', 'inspection_status', 'recommendation', 'actions'];
  isEditMode: boolean;
  selection = new SelectionModel<any>(true, []);


  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;//@ViewChild(MatSort) sort!: MatSort;

  // Constructor
  constructor(private issueResolutionApiService: IssueResolutionApiService) {
    this.isEditMode = false;
    this.issueData = {} as Issue;
    this.dataSource = new MatTableDataSource<any>();

  }






  // Private Methods



  private resetEditState(): void {
    this.isEditMode = false;
    this.issueData = {} as Issue;
  }

  // CRUD Actions

  private getAllIssues(): void {
    this.issueResolutionApiService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createIssue(): void {
    this.issueResolutionApiService.create(this.issueData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los students actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((issue: Issue) => {
            return issue;
          });
      });
  };

  private updateIssue(): void {
    let issueToUpdate: Issue = this.issueData;
    this.issueResolutionApiService.update(this.issueData.id, issueToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((issue: Issue) => {
            if (issue.id === response.id) {
              return response;
            }
            return issue;
          });
      });
  };

  private deleteIssue(issueId: number): void {
    this.issueResolutionApiService.delete(issueId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((issue: Issue) => {
            return issue.id !== issueId ? issue : false;
          });
      });
  };

  // UI Event Handlers

  onEditItem(element: Issue) {
    this.isEditMode = true;
    this.issueData = element;
  }

  onDeleteItem(element: Issue) {
    this.deleteIssue(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllIssues();
  }

  onIssueAdded(element: Issue) {
    this.issueData = element;
    this.createIssue();
    this.resetEditState();
  }

  onIssueUpdated(element: Issue) {
    this.issueData = element;
    this.updateIssue();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllIssues();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
