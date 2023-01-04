export interface Person {
  name: string;
  firstName: string;
  dateOfBirth: Date;
  size: number; // la size sera en cm
  weight: number;
}

export interface shortDescription {
  name: string;
  firstName: string;
  age: number;
}

export interface longDescription {
  name: string;
  age: number;
  size: string;
}

export interface completeDescription {
  name: string;
  firstName: string;
  dateOfBirth: string; // la date sera sous la forme jj/mm/aaaa
  size: string; // la size sera sous la forme '?m??'
  weight: string; // le poids sera sous la forme '??kg'
}
