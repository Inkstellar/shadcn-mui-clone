---
title: Cascade Components Library
category: Design Guidelines
---

# Components Library

Components list holding information based on their adaptive capability and style hooks availability.

## Available Components

### Foundation
- Colors
- Typography

### Form Controls
- Input Field
- Text Field
- Checkbox
- Radio Button
- Toggle
- Sliders
- Multi Select
- Dropdown Menu
- Search Input

### Navigation
- Tabs
- Pagination
- Context Menu
- Search Results

### Data Display
- Table
- Cards
- Chips
- Icons
- Accordion
- Calendar

### Feedback
- Modal
- Toast
- Notification
- Segment

### Actions
- Button
- Button Group

---

## Colors

Cascade's themes are derived from the FE fundinfo color palette.

### Contrast Requirements

Always ensure colors meet **WCAG 2.0 AA** requirements:
- **4.5:1** contrast for normal text
- **3:1** contrast for large text

### Usage

- **Primary color (aqua)**: Used prominently in interactive elements like buttons, links, inputs
- **Secondary color (dark gray)**: Used for non-interactive elements like text, tables, disabled buttons
- **Shades**: Used to highlight active and hover states

---

## Typography

Good typography establishes a strong visual hierarchy and sets the product's overall tone.

Cascade follows:
- Typeface consistency
- Clear hierarchy
- Proper contrast
- Consistent alignment
- Appropriate white space
- Accessible color

Typography system is based on the **4pt baseline grid + 8pt grid system**.

### Font Hierarchy

**Headings**
- H1 - H6 for document structure

**Body**
- Body1, Body2, Body3 for content

**Small labels**
- For secondary information

---

## Button Component

Buttons are interactive components where the category plays a major role in interaction design.

### Variants

- **Primary** - Main call to action
- **Secondary** - Secondary actions
- **Tertiary** - Least priority actions

### Sizes

- Large: 48px height
- Regular: 40px height  
- Small: 28px height

### Icon Buttons

- Icon-left
- Icon-right
- Only-icon

### Button Groups

Group related actions together with proper visual separation.

### Guidelines

- Use primary buttons minimally for the main page goal
- Provide clear, action-oriented labels
- Always include alt text for icon buttons
- Avoid disabled buttons in forms - use validation instead

---

## Cards

Simple containers that hold diverse content in different scenarios.

### Structure

Cards can include:
- Header with title and actions
- Content area
- Footer with actions

### Guidelines

- Keep cards simple
- Don't overcomplicate with too many actions
- Use consistent padding
- Maintain visual hierarchy

---

## Input Fields

Where users enter and edit text.

### Features

- Label support
- Validation states
- Helper text
- Error messages
- Disabled state
- Required indicator

### Types

- Text input
- Email input
- Password input
- Number input
- Search input
- Calendar input

---

## Modal

Overlay component for critical information or user decisions.

### When to Use

- Grab user's attention
- Require user input (sign-up, login)
- Show additional information in context
- Display notifications

### Best Practices

- Keep content focused
- Provide clear actions
- Allow easy dismissal (ESC key, backdrop click)
- Manage focus properly
- Lock scroll on body

---

## Accessibility

All components follow WCAG accessibility guidelines:

- Keyboard navigation support
- Proper ARIA labels
- Focus management
- Screen reader compatibility
- Color contrast compliance
- Touch target sizes
