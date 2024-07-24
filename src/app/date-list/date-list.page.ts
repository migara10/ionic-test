import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as moment from "moment-timezone";
import { Constants } from '../app-routing.module';

interface Payload {
  id: string | null;
  timezone: string;
  mobilenumber?: string;
}

@Component({
  selector: 'app-date-list',
  templateUrl: './date-list.page.html',
  styleUrls: ['./date-list.page.scss'],
})



export class DateListPage implements OnInit {

  isLoad = false;
  data_list: any;

  constructor(private router: Router, public ApiProvider: ApiService,private zone: NgZone,) { }

  ngOnInit() {
    this.getAllContents()
  }

  getAllContents() {
    const payload: Payload = {
      id: null,
      timezone: moment.tz.guess(),
    };
    
    this.ApiProvider.getResponse(
      Constants.METHODS.POST,
      "customercontentdetails",
      Constants.CONTENT_TYPES.APPLICATION_JSON,
      payload,
    ).subscribe(
      (data) => {
        // this.data_list = this.createBackColor(data);
        // this.startProgress(false);
        this.isLoad = true;

        // if (!this.data_list.message_info.is_viewed) {
        //   setTimeout(() => {
        //     this.openMessageModel();
        //   }, 1000);
        // }

        this.zone.run(() => {
          console.log("force update the screen");
        });
      },
      async (error) => {
        console.log(error)
        // this.startProgress(false);
       /*  const toast = await this.toastCtrl.create({
          message: "Internal Server error, Please Try again",
          duration: 1500,
          position: "bottom",
        });
        toast.present(); */
      }
    );
  }

   // making button list color combination dynamically
   createBackColor(list: any) {
    const colors_list = JSON.parse(localStorage.getItem(Constants.PRIMARY_COLOR) || '{}');
    
    if (!colors_list || typeof colors_list !== 'object') {
      console.error('Colors list is invalid or not found in localStorage.');
      return list;
    }
  
    if (!Array.isArray(list.datescontent)) {
      console.error('datescontent is not an array.');
      return list;
    }
  
    if (list.datescontent.length == 2) {
      list.datescontent[0].back_groundcolor = colors_list.color_8 || '#defaultColor';
      list.datescontent[1].back_groundcolor = colors_list.color_1 || '#defaultColor';
    } else {
      list.datescontent.forEach((prop: any, index: any) => {
        const colorKey = `color_${this.getarrayindex(index)}`;
        prop.back_groundcolor = colors_list[colorKey] || '#defaultColor';
      });
    }
  
    return list;
  }
  
  getarrayindex(index: number): number {
    // Assuming you have a function that returns an appropriate index
    return index % 10; // Example: returns a number from 0 to 9
  }

  Logout() {
    // this.router.navigate(["settings"], {});
  }

}
