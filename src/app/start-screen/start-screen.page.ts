import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../app-routing.module';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.page.html',
  styleUrls: ['./start-screen.page.scss'],
})
export class StartScreenPage implements OnInit {

  doctor: any = {
    tenant_logo: '',
    tenant_name: '',
    client_mobile_number: ''

  };

  constructor(private route: ActivatedRoute, private router: Router,public ApiProvider: ApiService,public alertCtrl: AlertController,) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.doctor = JSON.parse(params['doctor']);
        // this.ApiProvider.setPrimaryColor(this.doctor.tenant_theme)
        if (this.doctor.tenant_theme_palette) {
          this.ApiProvider.setPrimaryColor(this.doctor.tenant_theme_palette);
        } else {
          this.ApiProvider.setPrimaryColor(Constants.DEFAULT_PRIMARY_COLOR);
        }
        if (localStorage.getItem(Constants.RUN_SERVER) == 'local') {
          localStorage.setItem(Constants.SELECTED_TENANT, Constants.HTTP + this.doctor.domain_url + ':8055' + '/api/');
          localStorage.setItem(Constants.SELECTED_TENANT_URL, Constants.HTTP + this.doctor.domain_url + ':8055');
        } else {
          localStorage.setItem(Constants.SELECTED_TENANT, Constants.HTTPS + this.doctor.domain_url + '/api/');
          localStorage.setItem(Constants.SELECTED_TENANT_URL, Constants.HTTPS + this.doctor.domain_url);
        }
        localStorage.setItem(Constants.SELECTED_TENANT_OBJ, params['doctor']);

        // this.geofence.initialize().then(() => this.addGeofence(this.doctor), (err) => console.log(err.message));

        setTimeout(async () => {
          if (localStorage.getItem(Constants.USER_TYPE) === Constants.USER_TYPES.DOC) {
            this.router.navigateByUrl('doc-home');
          } else {
            if (!localStorage.getItem(Constants.PIN_OBJ)) {
              const alert = await this.alertCtrl.create({
                header: 'Pin Number',
                message: 'Would you like to set up a 4 digit pin number to access the app for privacy reasons?',

                buttons: [
                  {
                    text: 'No', handler: () => {
                      this.router.navigateByUrl('date-list');
                    }
                  },
                  {
                    text: 'Yes', handler: () => {
                      this.router.navigateByUrl('date-list');
                    }
                  }
                ],
                backdropDismiss: false
              });
              await alert.present();
            } else {
              const data_ = JSON.parse(localStorage.getItem(Constants.PIN_OBJ)|| '{}');
              if (data_.has_pincode || (data_.status && data_.code)) {
                this.router.navigate(['pin-number'], { queryParams: { isPin: true } });
              } else {
                this.router.navigateByUrl('date-list');
              }
            }
          }
        }, 2000);
      });
  }

}
