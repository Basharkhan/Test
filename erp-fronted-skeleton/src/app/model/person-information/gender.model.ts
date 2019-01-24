export class Gender {
  public id: string;
  public type: string;

  constructor(gender?)
  {
    gender = gender || {};
      this.id = gender.id || null;
      this.type = gender.type || null;
  }
}
