import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordPage {

  email: string = '';
  isSent: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  // Validação de Email
  get isValidEmail(): boolean {
    // Regra: Texto + @ + Texto + . + Texto (Ex: nome@site.com)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.email);
  }

  async onRecover() {
    if (this.isValidEmail) {
      this.isSent = true;

      const toast = await this.toastCtrl.create({
        message: 'Email de recuperação enviado!',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      toast.present();

    } else {
      // Segurança extra caso o botão seja forçado
      const toast = await this.toastCtrl.create({
        message: 'Por favor, digite um e-mail válido.',
        duration: 2000,
        color: 'warning',
        position: 'bottom'
      });
      toast.present();
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/login');
  }
}