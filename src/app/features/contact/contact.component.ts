import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private notif: NotificationService) {}

  form: any = { name: '', email: '', phone: '', subject: '', message: '' };
  submitted = false;

  subjects = ['Product Enquiry', 'Order Status', 'Repair & Service', 'Custom Bat', 'Wholesale/Bulk Order', 'Feedback', 'Other'];

  infoCards = [
    { icon: 'fas fa-map-marker-alt', title: 'Visit Us', lines: ['Block No. 25, Opposite Vijay Medicals,', 'Near Om Driving School, Swami Kripaldas Marg,', 'Jaripatka, Nagpur (Maharashtra) - 440014'] },
    { icon: 'fas fa-phone', title: 'Call Us', lines: ['+91 86690 49802', 'Mon-Sun: 9am-9pm IST'] },
    { icon: 'fas fa-envelope', title: 'Email Us', lines: ['fitforlifenagpur@gmail.com', 'Replies within 24 hrs'] },
    { icon: 'fas fa-clock', title: 'Working Hours', lines: ['Mon-Fri: 9:00am – 7:00pm', 'Saturday: 10:00am – 5:00pm', 'Sunday: Closed'] },
  ];

  submit(): void {
    this.submitted = true;
    this.notif.success('Message sent! We\'ll get back to you within 24 hours.');
    this.form = { name: '', email: '', phone: '', subject: '', message: '' };
    setTimeout(() => this.submitted = false, 5000);
  }
}
