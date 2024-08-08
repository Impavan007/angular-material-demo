import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

interface Post {
  title: string;
  content: string;
}

interface User {
  name: string;
  contactNumber: string;
  age: number;
  profilePic: string;
  coverImage: string;
  posts: Post[];
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  user: User = {
    name: '',
    contactNumber: '',
    age: 0,
    profilePic: '',
    coverImage: '',
    posts: []
  };

  ngOnInit() {
    // Dummy user data
    this.user = {
      name: 'John Doe',
      contactNumber: '123-456-7890',
      age: 30,
      profilePic: 'images.jfif',
      coverImage: 'images.jfif',
      posts: [
        { title: 'First Post', content: 'This is the content of the first post.' },
        { title: 'Second Post', content: 'This is the content of the second post.' }
      ]
    };
  }
}
