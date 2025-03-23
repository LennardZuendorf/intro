# Site Structure

## Overview

The website follows a main single-page approach for the homepage with dedicated pages for individual projects and legal content.

## Main Page Structure

The homepage (`/`) is organized into distinct sections:

1. **Hero Section** - Introduction and main visual elements
2. **About Section** - Personal information and background
3. **Projects Section** - Overview of portfolio projects

This single-page approach allows visitors to scroll through the main content while maintaining easy navigation between sections.

## Navigation Architecture

### Main Routes

- `/` - Homepage with all main sections
- `/projects` - Routes to the projects section on the homepage
- `/projects/[project-name]` - Individual project detail pages (e.g., `/projects/intro`)
- `/legal` - Legal information page (privacy policy, terms, etc.)

### Navigation Flow

- Users can navigate between sections on the homepage through scrolling or navigation menu
- The projects section serves as both an overview and gateway to individual project pages
- Individual project pages provide detailed information about specific projects
- Legal pages are accessible but kept separate from the main content flow

## Content Organization

### Home Page Sections

Each section on the homepage serves a specific purpose:

- **Hero**: Creates first impression and establishes visual identity
- **About**: Provides personal/professional background information
- **Projects**: Showcases portfolio work with links to detailed pages

### Project Pages

Each project has its own dedicated page with:

- Detailed project information
- Technologies used
- Project outcomes
- Visual elements/screenshots
- Links to live sites or repositories (if applicable)

### Legal Pages

Contains necessary legal information separated from the main content experience.

## Implementation

- The site structure is implemented using Next.js App Router
- Sections on the homepage are organized as components
- Project pages use dynamic routing with the project identifier
- All content is managed through Payload CMS
