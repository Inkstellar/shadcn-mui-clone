---
title: Accessibility Guidelines
category: Design Guidelines
---

# Accessibility

Accessible designs ensure people of different abilities have a similar experience with the web products or properties across the board.

Our target user groups are people with vision, hearing, cognitive, or motor impairments. So it is our prime responsibility to make our designs usable through information and user experience design, development, and help and support. It is about understanding the users' journeys and proactively anticipating their needs.

---

## i) Principles

To make sure our products are accessible to everyone, follow the four principles of the Web Content Accessibility Guidelines (WCAG):

**Principles at a glance:**

- **Perceivable** - It can be perceived by at least one of a person's senses.
- **Operable** - All interactions are operable through a variation of input methods.
- **Understandable** - Information and operation of the interface must be understandable.
- **Robust** - Content can be interpreted by a variety of assistive technologies and withstand changes in these technologies.

---

## ii) Key Points

### Structure and hierarchy

- Consistent, clear hierarchy helps people who navigate the page using links or headers.
- Use headings and titles to outline the page so people can see the structure and how sections relate to each other.
- Be predictable with structure and use patterns and layouts familiar to people.
- Content should be visible, so avoid putting important information inside accordions.

### Keyboard navigation

Some people can't use a mouse and navigate through applications using tools such as a keyboard, mouth wand, or eye tracking system.

When creating an application, check if a keyboard can be used to:
- Navigate
- Perform the same tasks as people who use a mouse
- Locate where you are on the page
- Tell where the keyboard focus is

### Manage focus

- Be conscious of the order of elements on the page
- Indicate where focus is
- Avoid using input focus to select, trigger events, or display messages
- Keep in mind where the focus moves when the element in focus disappears

### Text scaling

- Test the UI to ensure the layout works for different languages and assistive technologies
- Consider languages that require longer text fields and text wrapping
- Consider how the UI looks at **200% magnification**

### Meaningful text

All text should support accessibility, whether it's:
- **Visible**: UI labels, headings, buttons, forms, hyperlinks, help text
- **Non-visible**: Alternative text for images and buttons

### Colors

- Don't convey information using color alone
- Use multiple visual cues (stroke weight, patterns, shape, text, illustrations)
- Maintain high contrast: 4.5:1 for standard text, 3:1 for larger text

### Images and video

- Provide meaningful alt text for informative images
- Leave alt attribute empty for decorative images
- Provide transcripts and in-sync captioning for videos
- Allow users to control when videos start and stop
