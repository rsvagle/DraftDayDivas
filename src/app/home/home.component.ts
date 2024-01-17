import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
        preview_image: "../../assets/images/rafik-wahba-z43NxQB68EQ-unsplash.jpg"
    },
    {
        title: "Transfer News",
        author: "Alice Johnson",
        date: "October 14, 2023",
        description: "Latest updates on player transfers for the upcoming season...",
        preview_image: "../../assets/images/myron-mott-PY_5cDlKvM8-unsplash.jpg"
    },
    {
        title: "Article 4",
        author: "Alice Johnson",
        date: "October 14, 2023",
        description: "Latest updates on player transfers for the upcoming season...",
        preview_image: "../../assets/images/ashton-clark-02bN29Dz9Sg-unsplash.jpg"
    }
  ];

  ngOnInit(): void {
    this.shuffleArray(this.articles);
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}
