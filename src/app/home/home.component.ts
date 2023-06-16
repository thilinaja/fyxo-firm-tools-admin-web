import { Component ,OnInit} from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {getISOWeek} from "ngx-bootstrap/chronos/units/week";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

interface ProjectBooked {
  key: string;
  cTitle: any;
  cGrapic: any;
  curl: any;
  cstartDate: any;
  cendDate: any;
  cStatus: any;

  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})




export class HomeComponent implements  OnInit{

  // Month Picker
  date = null;
  dateRange = [];
  isEnglish = false;
  form: FormGroup;
  loading = false;
  searchValue = '';
  visible = false;
 // form: UntypedFormGroup;
  checked = true;
  selectedValue = null;
  time: Date | null = null;
  constructor(private fb: FormBuilder,private i18n: NzI18nService,private formBuilder: FormBuilder) {
    // Form initialization
    this.form = this.fb.group({
      aTitle: [null, [Validators.required]],
      comment: [null, [Validators.maxLength(220)]],
      nzUpload: [null, [Validators.required]],
      url: [null],
      startDate: [null, [Validators.required]],
      startTime: [null],
      endDate: [null],
      endTime: [null]
    });
    //Textarea with character count
    /*this.form = this.formBuilder.group({
      comment: [null, [Validators.maxLength(220)]]
    });*/
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log('submit', this.form.value);
    } else {
      this.markFormControlsAsDirty();
    }
  }

  markFormControlsAsDirty(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });
  }



  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  // Project Booked
  listOfData: ProjectBooked[] = [
    {
      key: '1',
      cTitle: 'Test Announcement ',
      cGrapic: 'Announcement.jpg',
      curl: 'https://shglobalhub.com/',
      cstartDate: '06-01-2023',
      cendDate: '06-13-2023',
      cStatus: 'Live',
    },
    {
      key: '2',
      cTitle: 'Test Announcement ',
      cGrapic: 'Announcement.jpg',
      curl: 'https://shglobalhub.com/',
      cstartDate: '06-01-2023',
      cendDate: '06-13-2023',
      cStatus: 'Queued',
    },
    {
      key: '3',
      cTitle: 'Test Announcement ',
      cGrapic: 'Announcement.jpg',
      curl: 'https://shglobalhub.com/',
      cstartDate: '06-01-2023',
      cendDate: '06-13-2023',
      cStatus: 'Completed',
    },

    {
      key: '4',
      cTitle: 'Test Announcement ',
      cGrapic: 'Announcement.jpg',
      curl: 'https://shglobalhub.com/',
      cstartDate: '06-01-2023',
      cendDate: '06-13-2023',
      cStatus: 'Stopped',
    },
  ];
  listOfDisplayData = [...this.listOfData];



  //URL Truncate
  truncateURL(url: string, maxLength: number = 30): string {
    if (url.length <= maxLength) {
      return url;
    }

    const truncatedPath = url.substring(0, maxLength - 3) + '...';
    return truncatedPath;
  }


  //action
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


  log(value: Date): void {
    console.log(value);
  }
//upload
  fileList: NzUploadFile[] = [
    {
      uid: '1',
      name: 'Announcement.jpg',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },

  ];

  editItem(data: ProjectBooked): void {
    // Handle edit action for the item
    console.log('Edit item:', data);
  }

  startItem(data: ProjectBooked): void {
    // Handle start action for the item
    console.log('Start item:', data);
  }

  stopItem(data: ProjectBooked): void {
    // Handle stop action for the item
    console.log('Stop item:', data);
  }

  deleteItem(data: ProjectBooked): void {
    // Handle delete action for the item
    console.log('Delete item:', data);
  }


  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }


  ngOnInit(): void {


  }

  sortFn = (a: ProjectBooked, b: ProjectBooked) => a.cTitle.localeCompare(b.cTitle);
}
