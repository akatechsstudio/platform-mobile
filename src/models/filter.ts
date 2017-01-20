import { Injectable } from '@angular/core';

import { Model, TEXT, INTEGER, DOUBLE, PRIMARY_KEY } from '../models/model';
import { User } from '../models/user';
import { Form } from '../models/form';
import { Post } from '../models/post';

import { Table } from '../decorators/table';
import { Column } from '../decorators/column';

@Injectable()
@Table("filters")
export class Filter extends Model {

  constructor(values:any=null) {
    super(values);
    this.copyInto(values);
  }

  public newInstance<M extends Filter>(values:any=null) : Filter {
    return new Filter(values);
  }

  @Column("id", INTEGER, PRIMARY_KEY)
  public id: number = null;

  @Column("deployment_id", INTEGER, PRIMARY_KEY)
  public deployment_id: number = null;

  @Column("search_text", TEXT)
  public search_text: string = null;

  @Column("show_inreview", INTEGER)
  public show_inreview: boolean = null;

  @Column("show_published", INTEGER)
  public show_published: boolean = null;

  @Column("show_archived", INTEGER)
  public show_archived: boolean = null;

  @Column("show_forms", TEXT)
  public show_forms: string = null;

  public showForm(form:Form) : boolean {
    if (this.show_forms != null && this.show_forms.length > 0) {
      let forms:string[] = this.show_forms.split(",");
      return forms.indexOf(form.id.toString()) > -1;
    }
    return false;
  }

  public addForm(form:Form) {
    if (this.show_forms != null && this.show_forms.length > 0) {
      let forms:string[] = this.show_forms.split(",");
      forms.push(form.id.toString());
      this.show_forms = forms.join(",");
    }
    else {
      this.show_forms = form.id.toString();
    }
  }

  public removeForm(form:Form) {
    if (this.show_forms != null && this.show_forms.length > 0) {
      let forms:string[] = this.show_forms.split(",");
      var index = forms.indexOf(form.id.toString(), 0);
      if (index > -1) {
        forms.splice(index, 1);
      }
      this.show_forms = forms.join(",");
    }
  }

}