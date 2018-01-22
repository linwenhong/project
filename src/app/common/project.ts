export class Project {
  name: string;
  place: string;
  contacts: string;
  telephone: number;
  contract_number: string;
  entrustment_unit: string;
  entrustment_number: string;
  entrustment_project: string;
  testing_requirements: string;
  information_of_the_client: string;

  department: string;
  approach: string;
  complete: string;
  person_in_charge: number;
  manager: number;

  id: number;
  create_time: number;
  progress_index: number;

  is_person_in_charge_pass: boolean;
  is_manager_pass: boolean;
  person_in_charge_pass_remake: string;
  manager_pass_remake: string;

  author: number;
  checker: number;
  examine: number;
  leader: number;
}
