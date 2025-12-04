import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController, AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  arrowBack, 
  personOutline, 
  notificationsOutline, 
  moonOutline, 
  lockClosedOutline, 
  logOutOutline, 
  chevronForward,
  helpCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  notificationsEnabled: boolean = true;
  darkModeEnabled: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    // Registrando todos os ícones usados nesta página
    addIcons({ 
      arrowBack, 
      personOutline, 
      notificationsOutline, 
      moonOutline, 
      lockClosedOutline, 
      logOutOutline, 
      chevronForward, 
      helpCircleOutline 
    });
  }

  ngOnInit() { }

  // Voltar para a Home
  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  // Simula ativação/desativação de notificações
  async toggleNotifications() {
    const message = this.notificationsEnabled ? 'Notificações Ativadas' : 'Notificações Desativadas';
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  // Lógica de Logout com Confirmação
  async onLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Sair',
      message: 'Deseja realmente sair do aplicativo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            // Redireciona para o Login e limpa o histórico de navegação
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });
    await alert.present();
  }
}