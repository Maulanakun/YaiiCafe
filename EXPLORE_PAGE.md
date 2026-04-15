# Explore Page - YaiiCafe

Dokumentasi lengkap untuk Explore Page yang menampilkan member, moments, dan avatar 3D.

## 📋 Struktur Halaman

### 1. **Member Komunitas** (`/explore`)
Menampilkan daftar semua member komunitas YaiiCafe dengan fitur:
- **Member Cards**: Grid layout yang responsive (1, 2, atau 4 kolom)
- **Status Indicator**: Menampilkan status online/idle/offline
- **Detail Modal**: Klik member untuk melihat detail lengkap
- **Informasi Detail**:
  - Nama dan role (Admin, Moderator, Member)
  - Tanggal bergabung
  - Game favorit
  - Bio/deskripsi
  - Tombol DM untuk menghubungi

### 2. **Moment Mabar**
Galeri foto dan tangkapan layar dari sesi bermain bersama dengan fitur:
- **Grid Layout**: Menampilkan 3 moment per baris (responsive)
- **Image Hover**: Zoom effect saat di-hover
- **Engagement**:
  - Like button (interaktif)
  - Comment button
  - Share button
- **Metadata**: 
  - Judul moment
  - Nama author
  - Deskripsi singkat
  - Tanggal
  - Like dan comment count

### 3. **Avatar 3D**
Galeri avatar Roblox dengan viewer 3D menggunakan Three.js:
- **Grid Cards**: Thumbnail avatar dengan deskripsi
- **3D Viewer Modal**: Interactive 3D model viewer
- **Interaksi**:
  - Drag mouse untuk rotate model
  - Auto-rotate untuk showcase
  - Reset button untuk kembali ke posisi awal
  - Loading state untuk model
  - Error handling jika file tidak ditemukan

## 🔧 Komponen Utama

```
app/explore/
└── page.tsx              # Main explore page

components/
├── members-list.tsx      # Wrapper komponen members
├── member-card.tsx       # Individual member card
├── member-detail-modal.tsx # Modal detail member
├── moments-section.tsx   # Galeri moments
├── avatars-section.tsx   # Galeri avatars
└── avatar-viewer.tsx     # 3D model viewer
```

## 🎨 Desain & Styling

- **Color Scheme**: Dark theme (slate 900-950) dengan accent purple
- **Typography**: Font Geist untuk consistency
- **Animations**:
  - Smooth transitions (300ms)
  - Hover effects pada cards
  - Fade-in animations untuk modals
  - Auto-rotate pada 3D models

## 📦 Data Mock

Saat ini menggunakan data mock (hardcoded) untuk demonstration:

### Member Data
```typescript
{
  id: string;
  name: string;
  role: 'Admin' | 'Moderator' | 'Member';
  avatar: string; // URL
  joinedDate: string; // ISO date
  gamesFavorite: string[];
  bio: string;
  status: 'online' | 'idle' | 'offline';
}
```

### Moment Data
```typescript
{
  id: string;
  title: string;
  image: string; // URL
  author: string;
  likes: number;
  comments: number;
  date: string; // ISO date
  description: string;
}
```

### Avatar Data
```typescript
{
  id: string;
  memberName: string;
  avatarName: string;
  modelUrl: string; // Path ke GLB file
  thumbnail: string; // URL
  description: string;
}
```

## 🎬 3D Avatar Setup

### Requirements
- **Three.js**: Sudah terinstall di project
- **GLTFLoader**: Digunakan untuk load file `.glb`

### File Struktur
```
public/avatars/
├── knight.glb
├── explorer.glb
├── princess.glb
├── geek.glb
├── popstar.glb
├── casual.glb
└── README.md (panduan)
```

### Cara Menambah Avatar Baru

1. **Persiapkan file GLB**
   - Export dari Roblox Studio atau download dari 3D model repository
   - Konversi ke format GLB jika perlu

2. **Simpan file**
   - Letakkan di `/public/avatars/[namafile].glb`

3. **Update avatars-section.tsx**
   ```typescript
   const mockAvatars = [
     {
       id: '1',
       memberName: 'Member Name',
       avatarName: 'Avatar Name',
       modelUrl: '/avatars/[namafile].glb',
       thumbnail: 'https://...',
       description: 'Deskripsi avatar',
     },
     // ...
   ];
   ```

## 🔄 Migrasi ke Database

Untuk production, ganti mock data dengan data dari database:

### Members
```typescript
// Ganti mockMembers dengan API call
const [members, setMembers] = useState([]);

useEffect(() => {
  fetch('/api/members')
    .then(res => res.json())
    .then(data => setMembers(data));
}, []);
```

### Moments
```typescript
// Ganti mockMoments dengan API call dari database
const [moments, setMoments] = useState([]);

useEffect(() => {
  fetch('/api/moments')
    .then(res => res.json())
    .then(data => setMoments(data));
}, []);
```

### Avatars
```typescript
// Ganti mockAvatars dengan API call
const [avatars, setAvatars] = useState([]);

useEffect(() => {
  fetch('/api/avatars')
    .then(res => res.json())
    .then(data => setAvatars(data));
}, []);
```

## 🎯 Navigasi

Explore page dapat diakses melalui:
1. **Dari home page**: Klik tombol "Explore ↓" di hero section
2. **Direct URL**: `/explore`

## 📱 Responsive Design

Layout responsive di semua ukuran:
- **Mobile** (< 768px): 1 kolom
- **Tablet** (768px - 1024px): 2 kolom
- **Desktop** (> 1024px): 3-4 kolom

## 🚀 Performance Tips

1. **Image Optimization**
   - Gunakan Next.js Image component (sudah diimplementasikan)
   - Lazy load images saat scroll

2. **3D Model Optimization**
   - Compress file GLB dengan online tools
   - Target ukuran: 5-15 MB per file
   - Baked textures lebih efficient

3. **Infinite Scroll** (Optional)
   - Implement untuk moments yang banyak
   - Load lebih banyak saat scroll ke bawah

## ⚙️ Konfigurasi External Images

Next.js config sudah dikonfigurasi untuk menerima images dari Unsplash:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
```

Untuk menambah hostname lain:
```typescript
{
  protocol: 'https',
  hostname: 'example.com',
}
```

## 🐛 Troubleshooting

### 3D Model tidak muncul
- Pastikan file `.glb` ada di `/public/avatars/`
- Check browser console untuk error messages
- File size terlalu besar? Compress dengan Blender atau online tools

### Images tidak muncul
- Pastikan URL valid dan accessible
- Untuk external images, pastikan hostname sudah di-config di `next.config.ts`
- Untuk local images, simpan di `/public/` folder

### Performance lambat
- Reduce model quality dengan Blender
- Implement image lazy loading
- Consider virtualization untuk list yang panjang

## 🔐 Security Notes

- Validate all user inputs sebelum save ke database
- Implement proper authentication untuk DM feature
- Use signed URLs untuk sensitive image/model files
- Implement rate limiting untuk API endpoints

---

**Last Updated**: April 2025
**Version**: 1.0
