# SMART-25 Conference Website

![SMART-25 Logo](https://smart25.org/images/smart25-logo.jpeg) **The official website for the 4th International Conference on Sustainable Multidisciplinary Artificial Intelligence Research for Global Transformations (SMART-25).**

This project is a modern, fully-responsive, and animated website built with Next.js and Tailwind CSS, designed to provide comprehensive information for attendees, speakers, and authors.

[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployed with Vercel](https://img.shields.io/badge/Deployed_with-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## 🚀 Live Demo

**[smart25.org](https://smart25.org/)** ---

## ✨ Features

* **Modern & Responsive Design:** A premium, mobile-first design that looks great on all devices.
* **Dynamic Hero Section:** Features an auto-playing background carousel and a live countdown timer that updates based on the conference date.
* **Rich Animations:** Smooth page transitions, scroll-triggered animations, and interactive micro-interactions powered by **Framer Motion**.
* **Component-Based Architecture:** Built with a clean, modular structure using React and Next.js App Router. All sections are separated into their own components.
* **Data-Driven Content:** All page content (text, images, links) is managed via simple `.json` files in the `/src/data` directory, making updates easy.
* **Functional Contact Form:** An integrated, beautiful contact form that sends emails directly to the organizers using **EmailJS**.
* **Automated Search Indexing:** A powerful site-wide search that automatically builds its index from all content files during the build process.
* **Advanced SEO:** Fully optimized for search engines with dynamic metadata generation, Open Graph tags, Twitter cards, and JSON-LD structured data for the conference event.
* **Reusable UI Components:** A library of consistent UI elements like `Section`, `SectionTitle`, and `PageHero` for rapid development.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Forms:** [EmailJS](https://www.emailjs.com/)
* **Search:** [Fuse.js](https://fusejs.io/)
* **UI Helpers:** [Headless UI](https://headlessui.com/), [React Icons](https://react-icons.github.io/react-icons/)
* **Deployment:** [Vercel](https://vercel.com)

---

## ⚙️ Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.x or later)
* `npm` or `yarn`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/smart25-website.git](https://github.com/your-username/smart25-website.git)
    cd smart25-website
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

The contact form requires API keys from EmailJS to function.

1.  Create a new file in the root of the project named `.env.local`.
2.  Add your EmailJS credentials to this file:

    ```
    NEXT_PUBLIC_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
    ```

### Running the Development Server

To start the local development server, run:

```
npm run dev
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
```
### Building for Production

To create an optimized production build of the site:

```
npm run build
```

Note: The build command automatically runs the build:search script first to generate the search index.


## 📂 Project Structure
The project is organized with a clear and scalable structure:

```
├── public/              # Static assets (images, fonts, search index)
├── scripts/             # Build scripts (e.g., search index generator)
└── src/
    ├── app/             # Next.js App Router: pages, layouts, API routes
    ├── components/      # Reusable components (UI, page-specific sections)
    ├── data/            # All site content managed in JSON files
    └── ...
```

## 🤝 Contributing
Contributions are welcome! Please feel free to fork the repository, create a new branch, and submit a pull request.

1. Fork the Project

2. Create your Feature Branch (git checkout -b feature/AmazingFeature)

3. Commit your Changes (git commit -m 'Add some AmazingFeature')

4. Push to the Branch (git push origin feature/AmazingFeature)

5. Open a Pull Request


## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.