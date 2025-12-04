import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  chevronBack, 
  ellipsisVertical, 
  timeOutline, 
  locationOutline,
  person,
  chatbubbles,
  calendar,
  helpCircle,
  menuOutline
} from 'ionicons/icons';

interface CalendarEvent {
  day: string;
  month: string;
  title: string;
  time: string;
  type: 'exam' | 'holiday' | 'meeting' | 'activity'; 
}

interface WeekGroup {
  label: string;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CalendarPage implements OnInit {

  selectedDate: string = new Date().toISOString();
  isMenuOpen = false;

  weekGroups: WeekGroup[] = [];

  constructor(private navCtrl: NavController) {
    addIcons({ 
      chevronBack, 
      ellipsisVertical, 
      timeOutline, 
      locationOutline,
      person,
      chatbubbles,
      calendar,
      helpCircle,
      menuOutline
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.weekGroups = [
      {
        label: 'Esta Semana',
        events: [
          { day: '08', month: 'OUT', title: 'Aula de Reforço - Matemática', time: '14:00 - 15:30', type: 'activity' },
          { day: '10', month: 'OUT', title: 'Reunião de Pais e Mestres', time: '18:00', type: 'meeting' },
          { day: '11', month: 'OUT', title: 'Festa do Dia das Crianças', time: '09:00 - 12:00', type: 'activity' }
        ]
      },
      {
        label: 'Próxima Semana',
        events: [
          { day: '15', month: 'OUT', title: 'Prova de Matemática 2TRI', time: '07:30', type: 'exam' },
          { day: '17', month: 'OUT', title: 'Entrega de Trabalho de História', time: 'Até as 23:59', type: 'activity' }
        ]
      },
      {
        label: 'Final do Mês',
        events: [
          { day: '28', month: 'OUT', title: 'Feriado Escolar', time: 'Dia todo', type: 'holiday' }
        ]
      }
    ];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  goToChat() {
    this.navCtrl.navigateForward('/chat');
  }
}