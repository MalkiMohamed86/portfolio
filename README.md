# Developer Portfolio

A stunning, modern portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Dark theme with glassmorphism effects and vibrant gradient accents
- **Smooth Animations**: Fade-in effects, floating elements, and interactive hover states
- **Fully Responsive**: Optimized for all screen sizes
- **SEO Optimized**: Proper meta tags and semantic HTML
- **TypeScript**: Full type safety throughout the application
- **Performance**: Built with Next.js App Router for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page component
├── components/
│   ├── Navigation.tsx        # Sticky navigation with scroll effects
│   ├── Hero.tsx              # Hero section with animated gradients
│   ├── About.tsx             # About section
│   ├── Skills.tsx            # Skills with progress bars
│   ├── Projects.tsx          # Project showcase
│   └── Contact.tsx           # Contact form
├── public/                   # Static assets
└── package.json
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`):
   - Change "Your Name" to your actual name
   - Update social media links (GitHub, LinkedIn, Twitter)

2. **About Section** (`components/About.tsx`):
   - Customize your bio and what you do

3. **Skills Section** (`components/Skills.tsx`):
   - Add/remove skills and adjust proficiency levels

4. **Projects Section** (`components/Projects.tsx`):
   - Replace with your actual projects
   - Update GitHub and demo links

5. **Contact Section** (`components/Contact.tsx`):
   - Update email address
   - Add form submission logic (e.g., EmailJS, Formspree)

6. **Metadata** (`app/layout.tsx`):
   - Update SEO metadata, title, and description

### Color Scheme

Edit CSS variables in `app/globals.css`:
```css
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
  --accent-primary: #6366f1;    /* Indigo */
  --accent-secondary: #8b5cf6;  /* Purple */
  --accent-tertiary: #ec4899;   /* Pink */
}
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Inter Font](https://fonts.google.com/specimen/Inter)** - Typography

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

This portfolio can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

Built with ❤️ using Next.js and Tailwind CSS
