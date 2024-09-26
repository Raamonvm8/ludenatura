import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialLinksComponent } from "../social-links/social-links.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  facebook: string = 'https://www.facebook.com/AuladelaNaturalezaLaLaurisilva/';
  twitter: string = 'https://x.com/ludenatura?s=11&t=53afhvyRV-eK66mFMst6vA';
  instagram: string = 'https://www.instagram.com/ludenatura/';
  tiktok: string = 'https://www.tiktok.com/@ludenatura?is_from_webapp=1&sender_device=pc';
  whatsapp: string = 'https://wa.me/34600420871'

  

}
