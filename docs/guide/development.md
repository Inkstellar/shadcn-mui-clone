---
title: Development Guide & Design Tokens
category: Guides
---

# Development

## Design Tokens

Design tokens enable consistency across platforms by creating an abstract identity and centralizing the source of truth.

### What are Design Tokens?

Let's say a product has a **Primary Pink** color. Designers and developers should refer to this color by the same name and identity, regardless of platform (design, web, mobile etc). If the color changes in design, it should also change on all development platforms automatically (and vice versa).

### Use Cases

Design tokens can be used for:
- Colors
- Text styles
- Spacings
- Animation values
- Border radius
- Shadows
- And more

### Token Categories

**Color Tokens**
- Primary colors (aqua, green, teal)
- Secondary colors (blue, orange, red, yellow, purple)
- Gray shades
- Tints and shades for each color
- Background colors
- Border colors
- Text colors

**Typography Tokens**
- Font families (Maven Pro, Roboto)
- Font sizes (H1-H6, Body1-3, Small labels)
- Font weights (Regular, Medium, Bold)
- Line heights
- Letter spacing

**Button Tokens**
- Button colors by variant
- Button sizes
- Button states (default, hover, active, disabled)

**Gradient Tokens**
- FE Gradient
- Legacy gradients

---

## Frontend Best Practices

### Architecture

- Gateway aggregation (APIM)
- Backend for Frontend (BFF) for two-way data
- One experience, one BFF
- Right-sized BFFs
- Clear team ownership

### Application Logic

- BFFs handle only application/presentation logic
- Frontend components remain dumb
- Shared event bus communication

### Repositories

- Distributed repos over monorepos for better scalability

### Resilience

- Fault tolerance
- Retry logic
- Graceful degradation

### Tech Stack

- Freedom of choice within approved stack
- Ensure browser support across target platforms

### Code Structure

- Use contracts and mocks
- Externalize micro frontends
- Merge MFEs if they share significant state

### UI Framework

- Use internal UI framework & style guides
- Consume via Storybook, Bit, Azure Artifacts

### DevSecOps

- Enterprise authentication
- CI/CD automation
- Observability via AppInsights

---

## Micro Frontends Strategy

### Benefits

- Autonomy - Teams can work independently
- Scalability - Scale development teams and deployments
- Single responsibility - Each MFE has a clear purpose
- Reusability - Share components across applications
- Tech agnostic - Use the best tool for each job
- Domain-driven - Align with business domains

### Considerations

- Browser support compatibility
- Operational complexity
- Avoid tech anarchy with governance
- Maintain UX consistency via shared libraries
- Manage payload size and duplication

---

## Integration Tools

### Storybook
Component development and documentation environment

### Bit
Component sharing and collaboration platform

### Mitosis
Write components once, compile to any framework

### Azure Artifacts
Package management and distribution
