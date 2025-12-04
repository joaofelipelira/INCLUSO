import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  chevronBack, ellipsisVertical, timeOutline, locationOutline, 
  person, chatbubbles, calendar, helpCircle, menuOutline, alertCircle 
} from 'ionicons/icons';

interface DaySlot {
  fullDate: Date; // Data completa para comparação
  dayNumber: string; // Ex: "18"
  weekDay: string; // Ex: "Seg"
  active: boolean;
  hasEvent: boolean;
}

interface ScheduleItem {
  id: number;
  date: Date; // Data do evento para filtro
  time: string;
  endTime: string;
  title: string;
  location: string;
  type: 'class' | 'exam' | 'activity';
  status: 'now' | 'pending' | 'done' | 'future';
  description?: string;
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
  
  // Lista FILTRADA que aparece na tela
  filteredSchedule: ScheduleItem[] = [];

  // "Banco de Dados" Local (Todos os eventos)
  allEvents: ScheduleItem[] = [];

  constructor(private navCtrl: NavController) {
    addIcons({ chevronBack, ellipsisVertical, timeOutline, locationOutline, person, chatbubbles, calendar, helpCircle, menuOutline, alertCircle });
  }

  ngOnInit() {
    this.initializeData();
    this.generateWeekDays();
    this.selectToday();
  }

  // 1. Simula dados vindos do banco
  initializeData() {
    const today = new Date();
    
    this.allEvents = [
      { 
        id: 1,
        date: today, // Evento de HOJE
        time: '09:10', endTime: '10:00',
        title: 'Matemática - Álgebra', location: 'Sala 101', 
        type: 'class', status: 'now'
      },
      { 
        id: 2,
        date: today, // Evento de HOJE
        time: '10:10', endTime: '11:00',
        title: 'História Geral', location: 'Sala 302', 
        type: 'class', status: 'pending'
      },
      { 
        id: 3,
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), // Evento de AMANHÃ
        time: '08:00', endTime: '09:30',
        title: 'Educação Física', location: 'Quadra', 
        type: 'activity', status: 'future'
      },
      { 
        id: 4,
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), // Evento DEPOIS DE AMANHÃ
        time: '07:30', endTime: '09:00',
        title: 'Prova de Geografia', location: 'Sala 105', 
        type: 'exam', status: 'future', description: 'Conteúdo: Cap 4 e 5'
      }
    ];
  }

  // 2. Gera os dias da semana dinamicamente
  generateWeekDays() {
    const today = new Date();
    const daysToShow = 5; // Mostrar 5 dias na barra
    this.days = [];

    // Formata Mês/Ano do título (Ex: "Outubro, 2025")
    this.currentMonth = today.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    this.currentMonth = this.currentMonth.charAt(0).toUpperCase() + this.currentMonth.slice(1);

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      // Verifica se tem evento nesse dia para por a "bolinha"
      const hasEvent = this.allEvents.some(e => 
        e.date.getDate() === date.getDate() && 
        e.date.getMonth() === date.getMonth()
      );

      this.days.push({
        fullDate: date,
        dayNumber: date.getDate().toString(),
        weekDay: date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').slice(0, 3),
        active: i === 0, // O primeiro (hoje) começa ativo
        hasEvent: hasEvent
      });
    }
  }

  // 3. Seleciona o dia de hoje ao abrir
  selectToday() {
    if (this.days.length > 0) {
      this.selectDay(this.days[0]);
    }
  }

  // 4. Lógica ao clicar no dia
  selectDay(selectedDay: DaySlot) {
    // Atualiza visual ativo
    this.days.forEach(d => d.active = false);
    selectedDay.active = true;

    // Filtra a lista de eventos
    this.filteredSchedule = this.allEvents.filter(e => 
      e.date.getDate() === selectedDay.fullDate.getDate() &&
      e.date.getMonth() === selectedDay.fullDate.getMonth()
    );
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  goBack() { this.navCtrl.navigateBack('/home'); }
  goToChat() { this.navCtrl.navigateForward('/chat'); }
}