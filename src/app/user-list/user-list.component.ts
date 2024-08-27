import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { User, Users } from './user.model';
import { MatCardModule } from '@angular/material/card';
import { usersMock } from './user.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  searchTerm = '';
  filterBy = 'name';
  filterLabel = '';
  sortLabel = '';
  sortBy = '';
  viewMode = 'list';
  control = new FormControl();
  users: Users = usersMock;

  ngOnInit() {
    this.control.valueChanges.subscribe((value) => {
      this.searchTerm = value;
      this.filteredUsers();
    });
  }

  filteredUsers(): User[] {
    return this.users
      .filter((user) => {
        switch (this.filterBy) {
          case 'name':
            return user.name
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase());
          case 'whatsapp':
            return user.whatsapp
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase());
          case 'instagram':
            return user.instagram
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase());
          default:
            return true;
        }
      })
      .sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'id':
            return Number(a.id) - Number(b.id);
          default:
            return 0;
        }
      });
  }

  toggleViewMode(mode: string) {
    this.viewMode = mode;
  }

  onKeyUp() {
    this.filteredUsers();
  }

  setFilterBy(value: string) {
    this.filterBy = value;
    this.updateFilterLabel();
  }

  setSortBy(value: string) {
    this.sortBy = value;
    this.updateFilterLabel();
  }

  updateFilterLabel() {
    switch (this.filterBy) {
      case 'name':
        this.filterLabel = 'Nome';
        break;
      case 'instagram':
        this.filterLabel = '@Instagram';
        break;
      case 'whatsapp':
        this.filterLabel = 'Whatsapp';
        break;
      default:
        this.filterLabel = '';
    }
    switch (this.sortBy) {
      case 'name':
        this.sortLabel = 'Alfabética';
        break;
      case 'id':
        this.sortLabel = 'Cronológica';
        break;
      default:
        this.sortLabel = '';
    }
  }
}
