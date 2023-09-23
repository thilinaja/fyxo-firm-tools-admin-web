import { Component ,OnInit} from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import {getISOWeek} from "ngx-bootstrap/chronos/units/week";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { AnnouncementService } from '../shared/services/announcement.service';
import { Announcement, AnnouncementCreate, AnnouncementUpdate } from '../shared/module/announcement';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
  uploadedGraphicId = '';
  time: Date | null = null;
  listOfDisplayData!: Announcement[];
  selectedAnnouncement:string = '';
  constructor(
    private fb: FormBuilder,
    private i18n: NzI18nService,
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private router: Router
    ) {
    // Form initialization
    this.form = this.fb.group({
      aTitle: [null, [Validators.required]],
      comment: [null, [Validators.maxLength(220)]],
      fileUpload: [null],
      url: [null],
      startDate: [null, [Validators.required]],
      startTime: [null],
      endDate: [null],
      endTime: [null],
      timezone: [null]
    });

    let valid = localStorage.getItem('validuser');

    if(valid != 'true'){
      this.router.navigate(['/login']);
    }
    
  }

  submitForm(): void {
    if (this.form.valid) {
      if(this.selectedAnnouncement === ''){
        this.createAnnoucencement(this.form.value);
      }else{
        this.updateAnnouncement(this.form.value);
      }
    } else {
      this.markFormControlsAsDirty();
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }

      return file;


    });

    this.fileList = fileList;
  }

  markFormControlsAsDirty(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });
  }



  open(): void {
    this.selectedAnnouncement = '';
    this.visible = true;
  }

  update(id:string): void{
    this.selectedAnnouncement = id;
    this.loadAnnouncementData(id);
    this.visible = true;

  }

  close(): void {
    this.visible = false;
  }

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
  fileList: NzUploadFile[] = [];

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
    this.loadAnnouncement();
  }

  private loadAnnouncement(){
    this.announcementService.GetAllAnnouncement().subscribe((val) => {

      //change date format
      val.forEach(element => {
        element.startDateString = moment(element.startDate).format('YYYY-MM-DD hh:mm a');
        element.endDateString = moment(element.endDate).format('YYYY-MM-DD hh:mm a');
      });

      debugger
      this.listOfDisplayData = val;
    })
  }

  private createAnnoucencement(values: any){

    const syy = new Date(values.startDate).getFullYear();
    const smm = new Date(values.startDate).getMonth() + 1;    
    const sdd = new Date(values.startDate).getDate();

    const sh = new Date(values.startTime).getHours();
    const sm = new Date(values.startTime).getMinutes();

    const startDateProcessed = new Date(syy + "-" + smm + "-" + sdd + " " + sh + ":" + sm);

    const eyy = new Date(values.endDate).getFullYear();
    const emm = new Date(values.endDate).getMonth() + 1;    
    const edd = new Date(values.endDate).getDate();

    const eh = new Date(values.endTime).getHours();
    const em = new Date(values.endTime).getMinutes();

    const endDateProcessed = new Date(eyy + "-" + emm + "-" + edd + " " + eh + ":" + em);

    var obj:AnnouncementCreate = {
        syndicateUserId:environment.siu,
        title:values.aTitle,
        graphicPath:this.uploadedGraphicId,
        redirectUrl:values.url,
        startDate:moment(startDateProcessed),
        endDate:moment(endDateProcessed),
        status:0,
        description: values.comment,
        utcOffset: values.timezone
    }
    this.announcementService.CreateAnnouncement(obj).subscribe((val) => {
      this.uploadedGraphicId = '';
      alert('saved successfully');
      location.reload();
    })
  }

  private updateAnnouncement(values:any){

    const syy = new Date(values.startDate).getFullYear();
    const smm = new Date(values.startDate).getMonth() + 1;    
    const sdd = new Date(values.startDate).getDate();

    const sh = new Date(values.startTime).getHours();
    const sm = new Date(values.startTime).getMinutes();

    const startDateProcessed = new Date(syy + "-" + smm + "-" + sdd + " " + sh + ":" + sm);

    const eyy = new Date(values.endDate).getFullYear();
    const emm = new Date(values.endDate).getMonth() + 1;    
    const edd = new Date(values.endDate).getDate();

    const eh = new Date(values.endTime).getHours();
    const em = new Date(values.endTime).getMinutes();

    const endDateProcessed = new Date(eyy + "-" + emm + "-" + edd + " " + eh + ":" + em);

    var obj:AnnouncementUpdate = {
      id:this.selectedAnnouncement,
      syndicateUserId:environment.siu,
      title:values.aTitle,
      graphicPath:this.uploadedGraphicId,
      redirectUrl:values.url,
      startDate:moment(startDateProcessed),
      endDate:moment(endDateProcessed),
      status:0,
      description: values.comment,
      utcOffset: values.timezone
    }
    this.announcementService.UpdateAnnouncement(obj).subscribe((val) => {
      this.uploadedGraphicId = '';
      alert('saved successfully');
      location.reload();
    })
  }

  deleteAnnouncement(announcementId:any): void{
    this.announcementService.DeleteAnnouncement(announcementId).subscribe((val) => {
      alert('successfully removed');
      location.reload();
    })
  }

  async onFileSelected(event:any):Promise<void>{
    const file:File = event.target.files[0];
    
    const formData = new FormData(); 
    formData.append('file', file);
    
    this.announcementService.postProjectFile(formData).subscribe((val) => {
      var res:any = val;
      this.uploadedGraphicId = res.data;
    });
    console.log(this.uploadedGraphicId);
  }

  loadAnnouncementData(id:string):void{
    this.announcementService.getAnnouncement(id).subscribe((val) => {
      this.form.controls['aTitle'].setValue(val.title);
      this.form.controls['comment'].setValue(val.description);
      this.form.controls['url'].setValue(val.redirectUrl);
      this.form.controls['startDate'].setValue(val.startDate);
      this.form.controls['startTime'].setValue(val.startDate);
      this.form.controls['endDate'].setValue(val.endDate);
      this.form.controls['endTime'].setValue(val.endDate);
      this.form.controls['timezone'].setValue(val.utcOffset);
      this.uploadedGraphicId = val.graphicPath;
    })
  }

  pause(id:string):void{
    this.announcementService.Pause(id).subscribe((val) => {
      alert('saved successfully');
      location.reload();
    })
  }

  play(id:string):void{
    this.announcementService.Play(id).subscribe((val) => {
      alert('saved successfully');
      location.reload();
    })
  }

  sortFn = (a: ProjectBooked, b: ProjectBooked) => a.cTitle.localeCompare(b.cTitle);
}
