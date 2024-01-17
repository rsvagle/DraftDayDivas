import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'DraftDayDivas';

  // Sample news data. In a real-world scenario, this could come from an API.
  articles = [
    {
        title: "Football Match Highlights",
        author: "Jane Smith",
        date: "October 10, 2023",
        description: "A detailed look at the recent football match and its major highlights...",
        preview_image: "../../assets/images/luis-santoyo-lI0JXf4MRDM-unsplash.jpg"
    },
    {
        title: "Player Injuries Update",
        author: "John Doe",
        date: "October 12, 2023",
        description: "A summary of recent injuries among top-tier players...",
        preview_image: "../../assets/images/luis-santoyo-lI0JXf4MRDM-unsplash.jpg"
    },
    {
        title: "Transfer News",
        author: "Alice Johnson",
        date: "October 14, 2023",
        description: "Latest updates on player transfers for the upcoming season...",
        preview_image: "../../assets/images/luis-santoyo-lI0JXf4MRDM-unsplash.jpg"
    },
    {
        title: "Transfer News",
        author: "Alice Johnson",
        date: "October 14, 2023",
        description: "Latest updates on player transfers for the upcoming season...",
        preview_image: "../../assets/images/luis-santoyo-lI0JXf4MRDM-unsplash.jpg"
    }
];
}
