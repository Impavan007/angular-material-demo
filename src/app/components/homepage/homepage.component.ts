import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user-service.service';

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
  user_role: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  user: User = {
    name: '',
    contactNumber: '',
    age: 0,
    profilePic: '',
    coverImage: '',
    posts: [],
    user_role: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const parsedData = JSON.parse(userData);
      this.user = {
        name: parsedData.username || '',
        contactNumber: parsedData.phone || '',
        age: this.calculateAge(parsedData.dob),
        profilePic: 'images.jfif',
        coverImage: 'images.jfif',
        posts: [
          { title: 'First project', content: 'This is the content of the first post.' },
          { title: 'Second project', content: 'This is the content of the second post.' }
        ],
        user_role: parsedData.user_role || ''
      };
    } else {
      console.log('User not found');
    }
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
