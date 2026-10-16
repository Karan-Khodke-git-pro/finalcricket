import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-bat',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './custom-bat.component.html',
  styleUrls: ['./custom-bat.component.scss']
})
export class CustomBatComponent {

  readonly WHATSAPP_NUMBER = '918669049802'; // ← Replace with actual number

  submitted = false;

  form: any = {
    name:'', phone:'', email:'', city:'',
    willowType:'', grade:'', size:'', weight:'', handle:'',
    scoopDesign:'', edges:'',
    surface:'',
    toeGuard:'',
    oilingService:false,
    budget:'', specialRequirements:''
  };

  willowTypes    = ['English Willow', 'Kashmir Willow'];
  grades         = ['Grade 1+ (Elite)', 'Grade 1 (Professional)', 'Grade 2 (Club)', 'Grade 3 (Practice)', 'Grade A (Kashmir)'];
  sizes          = ['31 - Junior (Age 11 to 12)', '32 - Junior (Age 12 to 15)', '33 - Junior (Age 14 to 16)', '34 - Adult (5 to 5.5 Feet)', '35 - Adult (5.5 to 6 Feet)', '36 - Adult (5.10 to 6.5 Feet)'];
  weights        = ['800g', '875g', '950g', '1025g', '1100g'];
  handles        = ['Half Cane', 'Full Cane'];
  scoopDesigns   = ['Diamond Scoop', 'Four Scoop', 'Warrior Scoop'];
  edgeSizes      = ['30 mm (Single Blade)', '35 mm (Single Blade)', '40 mm (Single Blade)', '45 mm (Double Blade)', '55 mm (Double Blade)'];
  surfaces       = ['Turf (Leather Ball)', 'Hard Court', 'Tennis Ball', 'Tape Ball', 'All Surfaces'];
  toeGuards      = ['None', 'Standard', 'Reinforced', 'Full Toe Protection'];
  budgets        = ['₹1100 – ₹1500', '₹1500 – ₹1900', '₹1900 – ₹2300', '₹2300 – ₹2700', '₹2700 – ₹3000'];

  get isFormValid(): boolean {
    return !!(this.form.name && this.form.phone && this.form.willowType && this.form.size);
  }

  sendOnWhatsApp(): void {
    if (!this.isFormValid) return;
    const extras = [
      this.form.oilingService ? 'Oiling Service' : '',
    ].filter(Boolean).join(', ') || 'None';

    const msg =
`🏏 *SG Cricket — Custom Bat Order*
━━━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER*
• Name: ${this.form.name}
• Phone: ${this.form.phone}
• Email: ${this.form.email || 'N/A'}
• City: ${this.form.city || 'N/A'}
━━━━━━━━━━━━━━━━━━━━━━
🪵 *BAT SPECS*
• Willow: ${this.form.willowType || '-'}
• Grade: ${this.form.grade || '-'}
• Size: ${this.form.size || '-'}
• Weight: ${this.form.weight || '-'}
• Handle: ${this.form.handle || '-'}
• Scoop Design: ${this.form.scoopDesign || '-'}
• Edges: ${this.form.edges || '-'}
━━━━━━━━━━━━━━━━━━━━━━
🏟️ *PLAYING DETAILS*
• Surface: ${this.form.surface || '-'}
━━━━━━━━━━━━━━━━━━━━━━
🎨 *AESTHETICS*
• Toe Guard: ${this.form.toeGuard || '-'}
━━━━━━━━━━━━━━━━━━━━━━
➕ Add-ons: ${extras}
💰 Budget: ${this.form.budget || 'Not specified'}
📝 Notes: ${this.form.specialRequirements || 'None'}
━━━━━━━━━━━━━━━━━━━━━━
Please confirm this custom bat order.`;

    const url = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    this.submitted = true;
  }

  reset(): void {
    this.submitted = false;
    this.form = { name:'',phone:'',email:'',city:'',willowType:'',grade:'',size:'',weight:'',handle:'',scoopDesign:'',edges:'',surface:'',toeGuard:'',oilingService:false,budget:'',specialRequirements:'' };
  }
}
