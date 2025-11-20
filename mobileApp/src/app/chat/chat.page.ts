import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  ellipsisVertical, 
  person, 
  chatbubbles, 
  calendar, 
  helpCircle, 
  chevronBack,
  menuOutline 
} from 'ionicons/icons';

interface ChatConversation {
  id: number;
  name: string;
  avatar: string; // URL da imagem ou Texto (ex: '6D')
  isGroup: boolean; // Define se mostra foto redonda ou sigla da turma
  lastMessage: string;
  senderName?: string; // Para grupos: "Michelle Souza: ..."
  time: string;
  unreadCount: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ChatPage implements OnInit {

  conversations: ChatConversation[] = [];
  isMenuOpen = false;

  constructor(private navCtrl: NavController) {
    addIcons({ 
      ellipsisVertical, 
      person, 
      chatbubbles, 
      calendar, 
      helpCircle, 
      chevronBack,
      menuOutline
    });
  }

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    this.conversations = [
      {
        id: 1,
        name: 'Diretora Lívia Villar',
        avatar: 'https://i.pinimg.com/736x/e9/11/db/e911dbc10c23f33b8b271abdc61e9fb4.jpg', // NOVA IMAGEM
        isGroup: false,
        lastMessage: 'Bom dia, Maria! Tudo bem? Conseguiu os documentos p...',
        time: '09:55',
        unreadCount: 1
      },
      {
        id: 2,
        name: 'Psicóloga Adelaide Hamej',
        avatar: 'https://i.pinimg.com/736x/bd/54/b0/bd54b0d61c8012ca4379fd512f3cf82c.jpg', // NOVA IMAGEM
        isGroup: false,
        lastMessage: 'Sim, se possível pegar todos esses listados, é melhor ain...',
        time: '08:12',
        unreadCount: 1
      },
      {
        id: 3,
        name: 'Turma 6º Ano - D',
        avatar: '6D', // Voltou para a sigla "6D"
        isGroup: true,
        senderName: 'Michelle Souza',
        lastMessage: 'Lívia me disse ontem. Mesmo assim obri...',
        time: 'Ontem',
        unreadCount: 0
      },
      {
        id: 4,
        name: 'Festa do Dia das Crianças - 6º D',
        avatar: 'https://i.pravatar.cc/150?img=25', // Mantido como exemplo
        isGroup: false, 
        senderName: 'Lívia Villar',
        lastMessage: 'Lembrando que é importante a presença de ...',
        time: 'Ontem',
        unreadCount: 1
      }
    ];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToHome() {
    this.navCtrl.navigateBack('/home');
  }
}