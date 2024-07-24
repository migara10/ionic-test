import { Component, OnInit } from '@angular/core';
import { Constants } from '../app-routing.module';
import { NavController, ModalController } from '@ionic/angular';
import { BioModelPage } from '../bio-model/bio-model.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  doctor: any;

  constructor(private navCtrl: NavController,public modalController: ModalController,) { }

  ngOnInit() {
    this.doctor = JSON.parse(localStorage.getItem(Constants.SELECTED_TENANT_OBJ) || '{}')
    /* this.appVersion.getVersionNumber().then(ver => {
      this.AppVersionNumber = ver + "v"
    }).catch(function (error) {
      console.log(error);
    }); */
  }

  goBack() {
    this.navCtrl.pop();
  }

  async openModel() {
    const modal = await this.modalController.create({
      component: BioModelPage,
      componentProps: {
        title: "Bio",
        html: ""
      }
    });
    return await modal.present();
  }

}
