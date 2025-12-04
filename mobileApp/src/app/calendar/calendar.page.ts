import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  chevronBack, ellipsisVertical, timeOutline, locationOutline, 
  person, chatbubbles, calendar, helpCircle, menuOutline, alertCircle, chevronForward
} from 'ionicons/icons';

interface DaySlot {
  fullDate: Date;
  dayNumber: string;
  weekDay: string;
  active: boolean;
  hasEvent: boolean;
}

interface ScheduleItem {
  id: number;
  date: Date;
  timeStart: string; // Mudou de 'time' para 'timeStart' para bater com o layout novo
  timeEnd: string;
  title: string;
  location: string;
  type: 'class' | 'exam' | 'activity';
  status: 'now' | 'pending' | 'future';
  duration?: string; // Ex: "em 45min"
  alert?: string;    // Ex: "Pendente"
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CalendarPage implements OnInit {

  isMenuOpen = false;
  currentMonth: string = '';
  days: DaySlot[] = [];
  
  // Lista que aparece na tela
  filteredSchedule: ScheduleItem[] = [];
  
  // Simulação de banco de dados
  allEvents: ScheduleItem[] = [];

  constructor(private navCtrl: NavController) {
    addIcons({ 
      chevronBack, ellipsisVertical, timeOutline, locationOutline, 
      person, chatbubbles, calendar, helpCircle, menuOutline, alertCircle, chevronForward 
    });
  }

  ngOnInit() {
    this.initializeData();
    this.generateWeekDays();
    this.selectToday();
  }

  initializeData() {
    const today = new Date();
    
    // Criando dados fictícios para Hoje e Amanhã
    this.allEvents = [
      { 
        id: 1,
        date: today,
        timeStart: '09:10', timeEnd: '10:00',
        title: 'Matemática - Álgebra', 
        location: 'Sala 101', 
        type: 'class', 
        status: 'now',
        duration: 'Agora'
      },
      { 
        id: 2,
        date: today,
        timeStart: '10:10', timeEnd: '11:00',
        title: 'História Geral', 
        location: 'Sala 302', 
        type: 'class', 
        status: 'pending',
        duration: 'em 10min'
      },
      { 
        id: 3,
        date: today,
        timeStart: '11:10', timeEnd: '12:00',
        title: 'Entrega de Trabalho', 
        location: 'Secretaria', 
        type: 'activity', 
        status: 'future',
        alert: 'Pendente', // Isso aciona o badge vermelho
        duration: 'em 1h'
      },
      // Evento para amanhã para testar a troca de dias
      { 
        id: 4,
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        timeStart: '08:00', timeEnd: '09:30',
        title: 'Educação Física', 
        location: 'Quadra', 
        type: 'activity', 
        status: 'future',
        duration: '08:00'
      }
    ];
  }

  generateWeekDays() {
    const today = new Date();
    const daysToShow = 5; 
    this.days = [];

    // Formata título (Ex: "Dezembro de 2025")
    const monthName = today.toLocaleDateString('pt-BR', { month: 'long' });
    this.currentMonth = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${today.getFullYear()}`;

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const hasEvent = this.allEvents.some(e => 
        e.date.getDate() === date.getDate() && 
        e.date.getMonth() === date.getMonth()
      );

      this.days.push({
        fullDate: date,
        dayNumber: date.getDate().toString(),
        weekDay: date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
        active: false,
        hasEvent: hasEvent
      });
    }
  }

  selectToday() {
    if (this.days.length > 0) {
      this.selectDay(this.days[0]);
    }
  }

  selectDay(selectedDay: DaySlot) {
    this.days.forEach(d => d.active = false);
    selectedDay.active = true;

    // Filtra os eventos do dia selecionado
    this.filteredSchedule = this.allEvents.filter(e => 
      e.date.getDate() === selectedDay.fullDate.getDate() &&
      e.date.getMonth() === selectedDay.fullDate.getMonth()
    );
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  goBack() { this.navCtrl.navigateBack('/home'); }
  goToChat() { this.navCtrl.navigateForward('/chat'); }
}