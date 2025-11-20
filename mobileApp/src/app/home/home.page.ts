import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular'; 
import { addIcons } from 'ionicons'; 
import { 
  settingsSharp, 
  listOutline, 
  barChartOutline, 
  star, 
  checkmarkCircleOutline, 
  chatbubbleEllipsesOutline, 
  chevronForwardCircle, 
  menuOutline,
  person,
  chatbubbles,
  calendar,
  helpCircle,
  chevronBack
} from 'ionicons/icons';

interface DashboardData {
  user: {
    name: string;
    avatar: string;
  };
  student: {
    name: string;
    school: string;
    class: string;
    avatar: string;
  };
  stats: {
    pendingTasks: number;
    nextClassDate: string;
    averageGrade: number;
    nextExam: string;
    messages: number;
  };
  commitments: {
    date: string;
    title: string;
    type: 'party' | 'exam' | 'meeting';
  }[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {

  data: DashboardData | null = null;
  isMenuOpen = false;

  // Injetando o NavController no construtor
  constructor(private navCtrl: NavController) {
    addIcons({ 
      settingsSharp, 
      listOutline, 
      barChartOutline, 
      star, 
      checkmarkCircleOutline, 
      chatbubbleEllipsesOutline, 
      chevronForwardCircle, 
      menuOutline,
      person,
      chatbubbles,
      calendar,
      helpCircle,
      chevronBack
    });
  }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.data = {
      user: {
        name: 'Maria Betânia da Silva',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      student: {
        name: 'Maurício Fabrício da Silva',
        school: 'Escola Estadual Djalma',
        class: '6 Ano D',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      stats: {
        pendingTasks: 2, 
        nextClassDate: '08/10/2025',
        averageGrade: 8.2,
        nextExam: '15/10 • Prova de Matemática 2TRI',
        messages: 4
      },
      commitments: [
        { date: '11/10', title: 'Festa do Dia das Crianças da turma 6D', type: 'party' },
        { date: '14/10', title: 'Sessão bimestral com psicóloga', type: 'meeting' },
        { date: '20/10', title: 'Entrega do Trabalho de História', type: 'exam' }
      ]
    };
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Função para navegar até a página de Chat
  goToChat() {
    this.navCtrl.navigateForward('/chat');
  }
}