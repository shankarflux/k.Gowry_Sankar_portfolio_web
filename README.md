# Kosuri Gowry Sankar - Portfolio Website

A modern, responsive portfolio website showcasing my skills in cybersecurity, AI/ML, and web development.

## 🌟 Features

- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Toggle between themes
- **Contact Form** - EmailJS integration for direct contact
- **Project Showcase** - Detailed project cards with technologies used
- **Skills Display** - Interactive progress bars
- **Social Links** - Connect on various platforms

## 🚀 Live Demo

Visit the live website: [https://yourusername.github.io/portfolio](https://yourusername.github.io/portfolio)

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Radix UI
- **Animations**: Framer Motion
- **Email**: EmailJS
- **Deployment**: GitHub Pages

## 📧 Contact Form Setup

The contact form uses EmailJS to send emails directly from the website. To set up:

1. Create an EmailJS account
2. Create a service with Gmail
3. Create an email template
4. Update the configuration in `client/lib/emailjs.ts`

## 🏗️ Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the project
npm run build:client

# Preview the build
npm run preview
```

## 📦 Deployment to GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select "GitHub Actions" as source
4. The site will automatically deploy on every push to main branch

## 📁 Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Main pages
│   ├── lib/               # Utility functions
│   └── global.css         # Global styles
├── public/                # Static assets
├── .github/workflows/     # GitHub Actions
└── package.json
```

## 🎨 Customization

### Colors
Update the theme colors in `client/global.css` and `tailwind.config.ts`

### Content
- Update personal information in component files
- Replace project data in `client/components/sections/projects.tsx`
- Update skills in `client/components/sections/skills.tsx`

### Contact Information
Update contact details in `client/components/sections/contact.tsx`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: 23jr1a05b3@gmail.com
- **LinkedIn**: [Gowry Sankar Kosuri](https://www.linkedin.com/in/gowry-sankar-kosuri-03990231a/)
- **GitHub**: [shankarflux](https://github.com/shankarflux/)
