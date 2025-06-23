# NodeCracker - Cybersecurity Portfolio

A responsive, accessible cybersecurity portfolio website showcasing NodeCracker's expertise in secure technological solutions and security culture development.

## 🌟 Features

### Core Functionality
- **Multi-page Website**: Home, Projects, About, and Contact pages
- **Dynamic Project Showcase**: Real-time GitHub API integration to display portfolio projects
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations

### Accessibility Features (WCAG 2.1 AA Compliant)
- **Semantic HTML5**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- **Keyboard Navigation**: Full keyboard accessibility with visible focus indicators
- **Screen Reader Support**: ARIA labels, roles, and descriptions throughout
- **Skip Links**: "Skip to main content" link for keyboard users
- **High Contrast**: Enhanced focus styles and color contrast ratios
- **Form Accessibility**: Proper labels, error handling, and validation feedback
- **Reduced Motion**: Respects user preferences for reduced motion
- **Dark Mode Support**: Automatic dark mode detection and styling
- **Print Styles**: Optimized printing experience

## 🚀 Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with accessibility considerations
- **Bootstrap 5**: Responsive framework with custom accessibility enhancements
- **JavaScript**: Interactive features and GitHub API integration
- **Font Awesome**: Accessible icon library
- **GitHub API**: Dynamic project loading

## 📁 Project Structure

```
FigmaDesing/
├── index.html          # Home page with hero section
├── services.html       # Projects showcase with GitHub API
├── about.html          # Team and mission information
├── contact.html        # Contact form with validation
├── styles.css          # Main stylesheet with accessibility features
├── github-api.js       # GitHub API integration
├── assets/             # Images and logos
│   ├── me_image.png
│   ├── s_logo_w.png
│   ├── sc_logo_b.png
│   └── sc_logo_w.png
└── README.md           # Project documentation
```

## ♿ Accessibility Implementation

### HTML Semantics
- Proper heading hierarchy (H1-H6)
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels and roles for interactive elements
- Descriptive alt text for all images
- Form labels and error associations

### Keyboard Navigation
- Tab navigation through all interactive elements
- Visible focus indicators with high contrast
- Skip to main content link (Ctrl+M shortcut)
- Arrow key navigation for carousel components
- Enter key support for form submission

### Screen Reader Support
- ARIA live regions for dynamic content
- Proper list semantics (`role="list"`, `role="listitem"`)
- Descriptive link text (no "click here")
- Form field instructions and error announcements
- Current page indicators (`aria-current="page"`)

### Visual Accessibility
- High contrast color schemes
- Sufficient text size and spacing
- Clear visual hierarchy
- Focus indicators visible on all interactive elements
- Reduced motion support for users with vestibular disorders

### Form Accessibility
- Proper label associations
- Required field indicators
- Real-time validation with error messages
- Success/error announcements for screen readers
- Keyboard-friendly form navigation

## 🎨 Design Features

### Responsive Layout
- Mobile-first approach
- Flexible grid system
- Optimized typography scaling
- Touch-friendly interface elements

### Visual Design
- Modern gradient backgrounds
- Smooth hover animations
- Professional color scheme
- Consistent spacing and typography

### Interactive Elements
- Hover effects on cards and buttons
- Smooth scrolling navigation
- Carousel functionality for projects
- Form validation with visual feedback

## 🔧 Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd FigmaDesing
   ```

2. **Open in browser**:
   - Simply open `index.html` in any modern web browser
   - No build process required - pure HTML, CSS, and JavaScript

3. **Local development**:
   - Use a local server for best experience
   - Recommended: Live Server extension in VS Code

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Testing

### Manual Testing
- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
- **Color Contrast**: Verify sufficient contrast ratios
- **Focus Indicators**: Ensure visible focus on all elements

### Automated Testing
- **Lighthouse**: Run accessibility audit
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool

### Keyboard Shortcuts
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Ctrl+M**: Skip to main content
- **Arrow Keys**: Navigate carousel (on projects page)

## 🌐 Live Demo

Visit the live website: [NodeCracker Portfolio](https://your-username.github.io/FigmaDesing/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with accessibility in mind
4. Test with keyboard navigation and screen readers
5. Submit a pull request

## 📞 Contact

- **Email**: info@nodecracker.com
- **Phone**: +1 (555) 123-4567
- **Website**: [NodeCracker](https://nodecracker.com)

---

**Built with ♥ and accessibility in mind** 