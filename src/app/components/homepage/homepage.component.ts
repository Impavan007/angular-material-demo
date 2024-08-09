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
    this.userService.getUserData().subscribe(
      response => {
        console.log('User data retrieved successfully:', response);
        this.user = {
          name: response.username || '',
          contactNumber: response.phone || '',
          age: this.calculateAge(response.dob),
          profilePic: 'images.jfif',  // Placeholder image
          coverImage: 'images.jfif',  // Placeholder image
          posts: response.posts || [], // Assuming posts are included in the response
          user_role: response.user_role || ''
        };
      },
      error => {
        console.error('Error retrieving user data:', error);
      }
    );
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
