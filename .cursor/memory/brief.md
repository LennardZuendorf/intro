# Project Brief: intro-zuendorf.me

## Overview

intro-zuendorf.me (Intro V2) is a personal website and portfolio page built by Lennard Zuendorf. It serves as a digital showcase of projects, experiences, and content managed through a custom CMS integration. The site features a distinctive Neobrutalism design aesthetic.

## Purpose

The project aims to provide a modern, visually appealing personal website that seamlessly integrates portfolio functionality with content management capabilities. It allows for on-the-fly content changes through Payload CMS while maintaining a polished user experience with a unique Neobrutalism design language.

## Key Features

- Personal website and portfolio showcase
- Custom UI components based on shadcn/ui with Neobrutalism design (from neobrutalism.dev)
- Content management through Payload CMS
- Project portfolio display
- Responsive design for various devices
- Legal pages (privacy policy, imprint, etc.)
- Bold, distinctive visual style following Neobrutalism principles

## Site Structure

The website employs a hybrid approach with a single-page scrollable homepage and dedicated detail pages:

### Main Page Layout

The homepage (`/`) is organized into distinct sections:

- **Hero Section**: Introduction and main visual elements
- **About Section**: Personal information and background
- **Projects Section**: Overview of portfolio projects

### Navigation Architecture

- **Homepage** (`/`): Contains all main sections in a single scrollable page
- **Projects Route** (`/projects`): Redirects to the projects section on the homepage
- **Project Detail Pages** (`/projects/[project-name]`): Individual pages for each project
- **Legal Page** (`/legal`): Contains privacy policy and terms in multiple languages

### Content Organization

- **Homepage Sections**: Each section serves a specific purpose (introduction, background, portfolio showcase)
- **Project Pages**: Provide detailed information about specific projects including technologies, outcomes, and visual elements
- **Legal Pages**: Contains necessary legal information with language switching capability

## Design Philosophy

The website follows the Neobrutalism design trend, characterized by:

- Bold, contrasting colors
- Strong borders and distinct visual elements
- Playful yet functional interface elements
- High contrast and distinctive typography
- Visual hierarchy that draws attention to important content

## Implementation Approach

- Next.js App Router for page routing and structure
- Single-page scrollable homepage with section-based navigation
- Dynamic routes for project pages using slug-based identification
- All content managed through Payload CMS for easy updates
- Responsive design approach for optimal viewing on all devices

## Author

Developed by Lennard Zuendorf (GitHub: @LennardZuendorf) 