# API Structure untuk Explore Page

Dokumentasi struktur API yang direkomendasikan untuk backend integration.

## 🔌 Endpoints

### 1. GET /api/members
Mengambil daftar semua member komunitas.

**Query Parameters:**
- `page` (optional): Halaman untuk pagination (default: 1)
- `limit` (optional): Jumlah member per halaman (default: 20)
- `status` (optional): Filter by status (online, idle, offline)
- `role` (optional): Filter by role (Admin, Moderator, Member)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Reza Wijaya",
      "role": "Admin",
      "avatar": "https://images.unsplash.com/...",
      "joinedDate": "2023-01-15",
      "gamesFavorite": ["Roblox", "Minecraft"],
      "bio": "Founder dan admin YaiiCafe...",
      "status": "online",
      "createdAt": "2023-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 247,
    "totalPages": 13
  }
}
```

---

### 2. GET /api/members/:id
Mengambil detail member spesifik.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Reza Wijaya",
    "role": "Admin",
    "avatar": "https://images.unsplash.com/...",
    "joinedDate": "2023-01-15",
    "gamesFavorite": ["Roblox", "Minecraft"],
    "bio": "Founder dan admin YaiiCafe...",
    "status": "online",
    "email": "reza@yaicafe.com",
    "discordHandle": "@reza_wijaya",
    "robloxUsername": "RezaWijaya123",
    "followerCount": 145,
    "postCount": 89,
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2024-04-10T15:45:00Z"
  }
}
```

---

### 3. GET /api/moments
Mengambil daftar moments/foto gameplay.

**Query Parameters:**
- `page` (optional): Halaman untuk pagination
- `limit` (optional): Jumlah per halaman (default: 12)
- `memberId` (optional): Filter by member
- `sortBy` (optional): Sort order (latest, popular, trending)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Epic Roblox Adventure",
      "image": "https://images.unsplash.com/...",
      "author": "Reza Wijaya",
      "authorId": "1",
      "likes": 128,
      "comments": 24,
      "shares": 12,
      "date": "2024-04-10",
      "description": "Jelajahi dunia fantasi bersama teman-teman...",
      "tags": ["roblox", "adventure", "squad"],
      "createdAt": "2024-04-10T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 324,
    "totalPages": 27
  }
}
```

---

### 4. GET /api/moments/:id
Mengambil detail moment spesifik dengan comments.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Epic Roblox Adventure",
    "image": "https://images.unsplash.com/...",
    "author": {
      "id": "1",
      "name": "Reza Wijaya",
      "avatar": "https://images.unsplash.com/..."
    },
    "likes": 128,
    "comments": 24,
    "shares": 12,
    "date": "2024-04-10",
    "description": "Jelajahi dunia fantasi bersama teman-teman...",
    "tags": ["roblox", "adventure", "squad"],
    "commentsList": [
      {
        "id": "c1",
        "author": {
          "id": "2",
          "name": "Aditya Kusuma",
          "avatar": "https://..."
        },
        "content": "Keren banget! 🔥",
        "createdAt": "2024-04-10T12:30:00Z"
      }
    ],
    "createdAt": "2024-04-10T10:30:00Z"
  }
}
```

---

### 5. POST /api/moments/:id/like
Menambah like pada moment (requires auth).

**Request Body:**
```json
{}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "likes": 129,
    "liked": true
  }
}
```

---

### 6. POST /api/moments/:id/unlike
Menghapus like dari moment (requires auth).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "likes": 128,
    "liked": false
  }
}
```

---

### 7. GET /api/avatars
Mengambil daftar semua avatar 3D.

**Query Parameters:**
- `page` (optional): Halaman untuk pagination
- `limit` (optional): Jumlah per halaman (default: 12)
- `memberId` (optional): Filter by member

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "memberName": "Reza Wijaya",
      "memberId": "1",
      "avatarName": "Royal Knight",
      "modelUrl": "/avatars/knight.glb",
      "thumbnail": "https://images.unsplash.com/...",
      "description": "Avatar premium dengan costume knight...",
      "modelSize": "12.5MB",
      "downloads": 145,
      "createdAt": "2023-05-20T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 98,
    "totalPages": 9
  }
}
```

---

### 8. GET /api/avatars/:id
Mengambil detail avatar spesifik.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "memberName": "Reza Wijaya",
    "memberId": "1",
    "avatarName": "Royal Knight",
    "modelUrl": "/avatars/knight.glb",
    "thumbnail": "https://images.unsplash.com/...",
    "description": "Avatar premium dengan costume knight...",
    "modelSize": "12.5MB",
    "modelFormat": "glTF Binary (.glb)",
    "downloads": 145,
    "creator": {
      "id": "1",
      "name": "Reza Wijaya",
      "avatar": "https://..."
    },
    "tags": ["roblox", "knight", "premium"],
    "createdAt": "2023-05-20T14:30:00Z",
    "updatedAt": "2024-04-10T15:45:00Z"
  }
}
```

---

### 9. POST /api/members/:id/send-dm
Mengirim direct message ke member (requires auth).

**Request Body:**
```json
{
  "message": "Halo! Mau mabar?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "msg1",
    "from": "current-user-id",
    "to": "1",
    "message": "Halo! Mau mabar?",
    "createdAt": "2024-04-10T16:30:00Z"
  }
}
```

---

## 🗄️ Database Schema

### Members Table
```sql
CREATE TABLE members (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  discord_handle VARCHAR(255),
  roblox_username VARCHAR(255),
  role ENUM('Admin', 'Moderator', 'Member') DEFAULT 'Member',
  avatar VARCHAR(500),
  bio TEXT,
  status ENUM('online', 'idle', 'offline') DEFAULT 'offline',
  game_favorites JSON,
  follower_count INT DEFAULT 0,
  post_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Moments Table
```sql
CREATE TABLE moments (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  author_id VARCHAR(36) NOT NULL,
  likes INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  shares INT DEFAULT 0,
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES members(id)
);
```

### Avatars Table
```sql
CREATE TABLE avatars (
  id VARCHAR(36) PRIMARY KEY,
  member_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  model_url VARCHAR(500) NOT NULL,
  thumbnail VARCHAR(500),
  description TEXT,
  model_size VARCHAR(50),
  model_format VARCHAR(50),
  downloads INT DEFAULT 0,
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id)
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id VARCHAR(36) PRIMARY KEY,
  moment_id VARCHAR(36) NOT NULL,
  author_id VARCHAR(36) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (moment_id) REFERENCES moments(id),
  FOREIGN KEY (author_id) REFERENCES members(id)
);
```

### Likes Table
```sql
CREATE TABLE likes (
  id VARCHAR(36) PRIMARY KEY,
  moment_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_like (moment_id, user_id),
  FOREIGN KEY (moment_id) REFERENCES moments(id),
  FOREIGN KEY (user_id) REFERENCES members(id)
);
```

---

## ✅ Error Handling

Standar error response:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Member tidak ditemukan"
  }
}
```

**Common Error Codes:**
- `NOT_FOUND` (404): Resource tidak ditemukan
- `BAD_REQUEST` (400): Invalid request parameters
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): No permission
- `INTERNAL_ERROR` (500): Server error

---

## 🔐 Authentication

Semua endpoint dengan `(requires auth)` memerlukan:
- Bearer token di header: `Authorization: Bearer <token>`
- Valid session/JWT

---

## 📊 Rate Limiting

Recommended rate limits:
- Public endpoints: 100 requests/minute per IP
- Authenticated endpoints: 1000 requests/minute per user
- Upload endpoints: 50 requests/hour per user

---

## 🚀 Implementation Example (Next.js)

### Fetch Members
```typescript
// app/explore/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ExplorePage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members?limit=20');
        const result = await response.json();
        
        if (result.success) {
          setMembers(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    // ... render members
  );
}
```

---

**Last Updated**: April 2025
**Version**: 1.0
