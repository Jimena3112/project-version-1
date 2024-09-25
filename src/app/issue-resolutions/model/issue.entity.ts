export class Issue {

  id: number;
  description: string;
  issueToSolve: string;
  inspectionDate: string;
  inspectionArea: string;
  inspector: string;
  personalResponsible: string;
  inspectionStatus: string;
  recommendation: string;

  constructor() {
    this.id = 0;
    this.description = '';
    this.issueToSolve = '';
    this.inspectionDate = '';
    this.inspectionArea = '';
    this.inspector = '';
    this.personalResponsible = '';
    this.inspectionStatus = '';
    this.recommendation = '';
  }
}
