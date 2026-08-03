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

  readonly WHATSAPP_NUMBER = '918830425162'; // ← Replace with actual number

  submitted = false;

  form: any = {
    name:'', phone:'', email:'', city:'',
    willowType:'', grade:'', size:'', weight:'', handle:'',
    sweetSpot:'', spine:'', edges:'', balance:'',
    surface:'', playerLevel:'', playStyle:'',
    gripColor:'', stickerDesign:'', edgeTape:'', toeGuard:'',
    namePrinting:'', jerseyNumber:'', logoText:'',
    antiScuff:false, knockingService:false, oilingService:false,
    budget:'', specialRequirements:''
  };

  willowTypes    = ['English Willow', 'Kashmir Willow'];
  grades         = ['Grade 1+ (Elite)', 'Grade 1 (Professional)', 'Grade 2 (Club)', 'Grade 3 (Practice)', 'Grade A (Kashmir)'];
  sizes          = ['Size 1 (Age 4-5)', 'Size 2 (Age 6-7)', 'Size 3 (Age 8-9)', 'Size 4 (Age 9-10)', 'Size 5 (Age 11-12)', 'Size 6 (Age 13-14)', 'Harrow (Age 14-15)', 'Short Handle (Adult)', 'Long Handle (Adult)'];
  weights        = ['Below 1100g', '1100-1120g', '1120-1140g', '1140-1160g', '1160-1180g', '1180-1200g', 'Above 1200g'];
  handles        = ['Oval (Standard)', 'Round', 'Semi-Oval', 'Flat'];
  sweetSpots     = ['Low', 'Mid-Low', 'Mid', 'Mid-High', 'High'];
  spines         = ['Below 60mm', '60-64mm', '64-68mm', '68-72mm', 'Above 72mm'];
  edgeSizes      = ['Below 36mm', '36-40mm', '40-44mm', 'Above 44mm'];
  balances       = ['Balanced', 'Mid Balanced', 'End Loaded', 'Handle Heavy'];
  surfaces       = ['Turf (Leather Ball)', 'Hard Court', 'Tennis Ball', 'Tape Ball', 'All Surfaces'];
  playerLevels   = ['Beginner', 'Intermediate', 'Advanced', 'Club Level', 'Professional'];
  playStyles     = ['Aggressive (Power Hitting)', 'Defensive (Technique)', 'All-Rounder', 'Top Order', 'Middle Order', 'Pinch Hitter'];
  gripColors     = ['Black', 'Red', 'Blue', 'White', 'Green', 'Purple', 'Navy', 'Grey', 'Orange', 'Dual Tone'];
  stickerDesigns = ['Classic Gold', 'Carbon Black', 'Heritage Red', 'Royal Blue', 'Stealth Dark', 'Flame Orange', 'White Minimal', 'Custom (Describe below)'];
  edgeTapes      = ['None', 'Clear (Transparent)', 'Black', 'White', 'Gold'];
  toeGuards      = ['None', 'Standard', 'Reinforced', 'Full Toe Protection'];
  budgets        = ['Under ₹5,000', '₹5,000–₹10,000', '₹10,000–₹15,000', '₹15,000–₹20,000', '₹20,000–₹30,000', 'Above ₹30,000', 'Flexible'];

  get isFormValid(): boolean {
    return !!(this.form.name && this.form.phone && this.form.willowType && this.form.size && this.form.playerLevel);
  }

  sendOnWhatsApp(): void {
    if (!this.isFormValid) return;
    const extras = [
      this.form.antiScuff       ? 'Anti-Scuff Sheet'  : '',
      this.form.knockingService ? 'Knocking Service'  : '',
      this.form.oilingService   ? 'Oiling Service'    : '',
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
• Sweet Spot: ${this.form.sweetSpot || '-'}
• Spine: ${this.form.spine || '-'}
• Edges: ${this.form.edges || '-'}
• Balance: ${this.form.balance || '-'}
━━━━━━━━━━━━━━━━━━━━━━
🏟️ *PLAYING DETAILS*
• Surface: ${this.form.surface || '-'}
• Level: ${this.form.playerLevel || '-'}
• Play Style: ${this.form.playStyle || '-'}
━━━━━━━━━━━━━━━━━━━━━━
🎨 *AESTHETICS*
• Grip: ${this.form.gripColor || '-'}
• Sticker: ${this.form.stickerDesign || '-'}
• Edge Tape: ${this.form.edgeTape || '-'}
• Toe Guard: ${this.form.toeGuard || '-'}
━━━━━━━━━━━━━━━━━━━━━━
✍️ *PERSONALIZATION*
• Name: ${this.form.namePrinting || 'None'}
• Jersey No: ${this.form.jerseyNumber || 'None'}
• Logo/Text: ${this.form.logoText || 'None'}
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
    this.form = { name:'',phone:'',email:'',city:'',willowType:'',grade:'',size:'',weight:'',handle:'',sweetSpot:'',spine:'',edges:'',balance:'',surface:'',playerLevel:'',playStyle:'',gripColor:'',stickerDesign:'',edgeTape:'',toeGuard:'',namePrinting:'',jerseyNumber:'',logoText:'',antiScuff:false,knockingService:false,oilingService:false,budget:'',specialRequirements:'' };
  }
}
