# 🚀 Explore Page - Setup & Quick Start

Panduan lengkap untuk menjalankan dan mengkustomisasi Explore Page.

## 📝 Fitur Utama

✅ **Member List** - Daftar member dengan detail modal
✅ **Moments Gallery** - Galeri foto gaming session
✅ **3D Avatar Viewer** - Interactive 3D model dengan Three.js
✅ **Responsive Design** - Mobile, tablet, dan desktop friendly
✅ **Dark Theme** - Beautiful dark UI dengan purple accent

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **3D Graphics**: Three.js + GLTFLoader
- **Styling**: Tailwind CSS 4
- **Images**: Next.js Image component
- **State**: React hooks (useState)
- **Language**: TypeScript

## 📂 Project Structure

```
YaiiCafe/
├── app/
│   ├── explore/
│   │   └── page.tsx              # Main explore page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/
│   ├── hero-section.tsx          # Home hero section
│   ├── members-list.tsx          # Members container
│   ├── member-card.tsx           # Member card component
│   ├── member-detail-modal.tsx   # Member detail modal
│   ├── moments-section.tsx       # Moments gallery
│   ├── avatars-section.tsx       # Avatar gallery
│   └── avatar-viewer.tsx         # 3D avatar viewer
│
├── public/
│   ├── avatars/                  # 3D model files (.glb)
│   │   └── README.md             # Avatar setup guide
│   └── [other assets]
│
├── package.json
├── next.config.ts                # Next.js configuration
├── EXPLORE_PAGE.md               # Feature documentation
├── API_STRUCTURE.md              # API integration guide
└── EXPLORE_SETUP.md              # This file
```

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Maulanakun/YaiiCafe.git
cd YaiiCafe
```

### 2. Install Dependencies
```bash
npm install
# atau
pnpm install
# atau
yarn install
```

### 3. Jalankan Development Server
```bash
npm run dev
# atau
pnpm dev
```

Server akan berjalan di `http://localhost:3000`

### 4. Akses Explore Page
- **Home**: http://localhost:3000
- **Explore**: http://localhost:3000/explore

## 🎨 Customization

### Mengganti Data Member

Edit file `/components/members-list.tsx`:

```typescript
const mockMembers = [
  {
    id: '1',
    name: 'Your Name',
    role: 'Admin', // Admin | Moderator | Member
    avatar: 'https://your-image-url.com/avatar.jpg',
    joinedDate: '2024-01-15',
    gamesFavorite: ['Roblox', 'Minecraft'],
    bio: 'Your bio here',
    status: 'online', // online | idle | offline
  },
  // Add more members
];
```

### Mengganti Data Moments

Edit file `/components/moments-section.tsx`:

```typescript
const mockMoments = [
  {
    id: '1',
    title: 'Your Moment Title',
    image: 'https://your-image-url.com/moment.jpg',
    author: 'Member Name',
    likes: 100,
    comments: 20,
    date: '2024-04-10',
    description: 'Your moment description',
  },
  // Add more moments
];
```

### Mengganti Data Avatar

Edit file `/components/avatars-section.tsx`:

```typescript
const mockAvatars = [
  {
    id: '1',
    memberName: 'Member Name',
    avatarName: 'Avatar Name',
    modelUrl: '/avatars/your-model.glb', // Path ke file GLB
    thumbnail: 'https://your-image-url.com/thumb.jpg',
    description: 'Avatar description',
  },
  // Add more avatars
];
```

### Mengubah Warna Tema

Edit `/app/globals.css` untuk mengubah color tokens:

```css
:root {
  --primary: oklch(...); /* Change accent color */
  --secondary: oklch(...);
  --background: oklch(...);
  /* etc */
}
```

Atau gunakan Tailwind classes langsung di components:
- `bg-purple-500` (primary accent)
- `bg-slate-800` (dark background)
- `text-white` (text color)

## 📤 Menambah Avatar 3D

### Step 1: Persiapkan File GLB

Dapatkan model 3D dalam format GLB:
- Export dari Roblox Studio
- Download dari website 3D model (Sketchfab, TurboSquid, dll)
- Convert ke GLB menggunakan Blender atau online tools

**Tools Konversi Online:**
- https://products.aspose.app/3d/conversion
- https://convertio.co/glb-obj/
- https://model-viewer.glitch.me/

### Step 2: Optimasi File

Compress file GLB untuk performa:
- Target ukuran: 5-15 MB
- Gunakan Blender untuk bake textures
- Hapus unused geometry

**Blender Optimization:**
```
1. Open file di Blender
2. Model > Optimize Geometry (remove unused)
3. Bake textures (Shader Editor > Bake)
4. Export as glTF Binary (.glb)
```

### Step 3: Simpan File

Letakkan file di folder `/public/avatars/`:
```
public/avatars/
├── knight.glb
├── explorer.glb
├── princess.glb
├── geek.glb
├── popstar.glb
├── casual.glb
└── your-new-avatar.glb  ← Tambah di sini
```

### Step 4: Update Component

Update `/components/avatars-section.tsx`:

```typescript
const mockAvatars = [
  // ... existing avatars
  {
    id: '7',
    memberName: 'Your Name',
    avatarName: 'Avatar Name',
    modelUrl: '/avatars/your-new-avatar.glb', // Sesuaikan nama file
    thumbnail: 'https://your-image-url.com/thumb.jpg',
    description: 'Your avatar description',
  },
];
```

## 🖼️ Menambah External Images

Project sudah dikonfigurasi untuk menerima images dari Unsplash. Untuk menambah source lain:

### Edit `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'your-domain.com',
      },
      // Add more domains as needed
    ],
  },
};
```

## 🔗 API Integration

Untuk connect ke backend API, replace mock data dengan fetch calls:

### Example: Fetch Members dari API

```typescript
// components/members-list.tsx
'use client';

import { useEffect, useState } from 'react';

export default function MembersList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members');
        const result = await response.json();
        
        if (result.success) {
          setMembers(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}
```

## 🚢 Deployment

### Deploy ke Vercel

1. Push code ke GitHub
2. Login ke https://vercel.com
3. Import project dari GitHub
4. Configure environment variables (jika ada)
5. Deploy

```bash
# Atau deploy dari command line
npm install -g vercel
vercel
```

### Build & Deploy Manual

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 📊 Performance Tips

1. **Image Optimization**
   - Gunakan Next.js Image component
   - Compress images sebelum upload
   - Gunakan format modern (WebP)

2. **3D Model Optimization**
   - Compress GLB files (max 15MB)
   - Bake textures di Blender
   - Remove unused geometry

3. **Code Splitting**
   - Lazy load components jika needed
   - Use dynamic imports untuk heavy components

4. **Caching**
   - Static generation untuk content yang jarang berubah
   - ISR (Incremental Static Regeneration) untuk semi-dynamic content

## 🐛 Troubleshooting

### 3D Model tidak muncul
```
❌ File .glb tidak ada di /public/avatars/
✅ Pastikan path file benar di component

❌ File too large
✅ Compress dengan Blender atau online tools

❌ CORS error
✅ Semua files harus di /public folder
```

### Images tidak muncul
```
❌ Hostname tidak di-whitelist
✅ Add hostname ke next.config.ts

❌ Image URL invalid
✅ Check URL di browser - pastikan accessible

❌ 404 error
✅ Pastikan images exist di /public folder
```

### Layout/Styling issues
```
❌ Tailwind classes tidak applied
✅ Pastikan globals.css diimport di layout.tsx
✅ Restart dev server: Ctrl+C then npm run dev

❌ Dark mode tidak jalan
✅ Check body className di layout.tsx
```

## 📚 Useful Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Three.js Docs**: https://threejs.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Blender Manual**: https://docs.blender.org/
- **glTF Format**: https://www.khronos.org/gltf/

## 🤝 Contributing

Untuk contribute atau improvement:
1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open Pull Request

## 📞 Support

Jika ada masalah atau pertanyaan:
- Check dokumentasi di EXPLORE_PAGE.md dan API_STRUCTURE.md
- Review kode di components folder
- Check console untuk error messages
- Open issue di GitHub repository

## 📄 License

Project ini adalah bagian dari YaiiCafe Discord Server community project.

---

**Terakhir diupdate**: April 2025
**Version**: 1.0
**Status**: ✅ Production Ready

Happy exploring! 🚀
