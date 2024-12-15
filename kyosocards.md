# **Angular Application for [KyosoCards.com](https://kyosocards.com)**

This project is an Angular-based web application for the website [KyosoCards.com](https://kyosocards.com). 
Some features include managing custom cards, user authentication, shopping cart functionalities, and order processing. The app features dynamic components, robust validation, and integrates with external services like Stripe for payments.

---
<p><a href="{{ '/' | relative_url }}">← Back to home</a></p>
---

## **Table of Contents**
1. [Deployment](#deployment)
2. [Features](#features)
3. [Folder Structure](#folder-structure)
4. [Core Components](#core-components)
5. [Authentication](#authentication)
6. [Card Management](#card-management)
7. [Shopping Workflow](#shopping-workflow)
8. [Services](#services)
9. [Technology Stack](#technology-stack)

---

## **Deployment**

### Production Environment
KyosoCards is deployed and accessible at [kyosocards.com](https://kyosocards.com)

### Infrastructure
- **Hosting**: Azure Static Web Apps
- **CI/CD**: GitHub Actions
- **Domain**: Custom domain with SSL/TLS encryption
- **Region**: Canada Central

### Deployment Architecture
- Frontend application built with Angular
- Static assets served through Azure's global CDN
- Automatic deployments triggered on main branch updates
- Zero-downtime deployments with staging environments

### Build and Deploy Process
1. Code pushed to main branch triggers GitHub Actions workflow
2. Angular application is built in production mode
3. Static assets are deployed to Azure Static Web Apps
4. Built artifacts are distributed across Azure's global CDN
5. SSL/TLS certificates are automatically managed

### Environment Configuration
- Production environment variables managed through Azure
- Secure secrets handling using Azure Key Vault
- Multiple staging environments for testing
- Automated rollbacks available if needed

### Monitoring and Analytics
- Azure Application Insights integration
- Real-time performance monitoring
- User behavior analytics
- Error tracking and logging

### Security Features
- Azure DDoS protection
- Automated SSL/TLS certificate management
- Web application firewall (WAF)
- Regular security audits and updates

---

## **Features**

### **Core Features**
- Navigation bar with dynamic links based on authentication status:
  - **Not Authenticated**: Home, Game Rules, Logo, Cart, Contact Us, Sign Up, Login.
  - **Authenticated**: Home, Game Rules, Logo, Cart, Contact Us, View Your Cards, Logout.

- **Authentication**: Login, Registration, and Profile management.
- **Card Management**: Create, View, Delete, and Search cards.
- **Shopping Cart**: Manage cart items, checkout, and process orders.
- **Checkout**:
  - Multi-step process with address validation and Stripe integration.
- **Extra Pages**: Contact Us, Game Rules, and FAQ.

---

## **Folder Structure**
```
client/
├── src/
│   ├── app/
│   │   ├── authentication/   # Login, Register, Profile components
│   │   ├── card/             # Card components (list, create, format)
│   │   ├── shopping/         # Cart, Checkout, and Order confirmation
│   │   ├── home/             # Home, Search, FAQ components
│   │   ├── extra-pages/      # Contact, Game Rules components
│   │   ├── navigation/       # Navigation component
│   ├── assets/               # Images and resources
│   ├── environments/         # Environment configs
├── angular.json
├── package.json
├── tsconfig.json
```

---

## **Core Components**
### **App Component**
- **Files**: `app.component.ts`, `app.component.html`, `app.component.css`
- **Purpose**: Main layout and navigation bar with dynamic links.

### **Navigation Component**
- **Files**: `navigation.component.ts`, `navigation.component.html`, `navigation.component.css`
- **Purpose**: Navigation bar with dynamic links based on authentication status.

## **Authentication**

### **Login Component**
- **Files**: `login.component.ts`, `login.component.html`, `login.component.css`
- **Features**:
  - Email/Password login form.
  - Error handling and validation.
  - Redirect to home after successful login.

### **Register Component**
- **Files**: `register.component.ts`, `register.component.html`, `register.component.css`
- **Features**:
  - Registration form with password strength validation.
  - Automatic login after registration.
  - Email verification.

### **Profile Component**
- **Files**: `profile.component.ts`, `profile.component.html`, `profile.component.css`
- **Features**:
  - Protected route (requires authentication).
  - Displays user cards.

---

## **Card Management**

### **Card Format Component**
- **Files**: `card.component.ts`, `card.component.html`, `card.component.css`
- **Features**:
  - Template design with background (`cardbackground.png`).
  - Upload custom images and correctly position text fields.

### **Card List Component**
- **Files**: `card-list.component.ts`, `card-list.component.html`, `card-list.component.css`
- **Features**:
  - Display user's cards in a grid layout.
  - Delete cards and add to cart.
  - Modal confirmations for actions.

### **Card Create Component**
- **Files**: `card-create.component.ts`, `card-create.component.html`, `card-create.component.css`
- **Features**:
  - Form for creating new cards.
  - Image upload and cropping with validation.
  - Success and error handling.

---

## **Shopping Workflow**

### **Cart Component**
- **Files**: `cart.component.ts`, `cart.component.html`, `cart.component.css`
- **Features**:
  - Display cart items with quantity management.
  - Calculate totals and remove items.

### **Checkout Component**
- **Files**: `checkout.component.ts`, `checkout.component.html`, `checkout.component.css`
- **Features**:
  - Multi-step checkout process:
    - Review cart.
    - Enter shipping details.
    - Stripe payment integration.
  - Form validation and error handling.

### **Order Confirmation Component**
- **Files**: `order-confirmation.component.ts`, `order-confirmation.component.html`, `order-confirmation.component.css`
- **Features**:
  - Display order summary.
  - Success message with return to home button.

---

## **Home Page**

### **Home Component**
- **Files**: `home.component.ts`, `home.component.html`, `home.component.css`
- **Features**:
  - Display **Create Card** component on the left.
  - Display **Search** component on the right.
  - Show FAQ section below.

### **Search Component**
- **Files**: `search.component.ts`, `search.component.html`, `search.component.css`
- **Features**:
  - Search for cards by name.

### **FAQ Component**
- **Files**: `faq.component.ts`, `faq.component.html`, `faq.component.css`
- **Features**:
  - Display frequently asked questions.

---

## **Extra Pages**

### **Contact Us Component**
- **Files**: `contact.component.ts`, `contact.component.html`, `contact.component.css`
- **Features**:
  - Form to send emails via Email Service.

### **Game Rules Component**
- **Files**: `game-rules.component.ts`, `game-rules.component.html`, `game-rules.component.css`
- **Features**:
  - Display detailed game rules.

---

## **Services**

### **Authentication Service**
- **File**: `auth.service.ts`
- **Features**:
  - Login, logout, and registration.
  - Token management and verification.

### **Card Service**
- **File**: `card.service.ts`
- **Features**:
  - CRUD operations for cards.
  - Image handling and search functionality.

### **Cart Service**
- **File**: `cart.service.ts`
- **Features**:
  - Add/remove items from the cart.
  - Update quantities and calculate totals.

### **Storage Service**
- **File**: `storage.service.ts`
- **Features**:
  - Manage token and cart storage in localStorage.

### **Email Service**
- **File**: `email.service.ts`
- **Features**:
  - Send emails via Email Service.

---

## **Technology Stack**
- **Frontend**: Angular, TypeScript, HTML, CSS.
- **Authentication**: JWT Token.
- **Payment Integration**: Stripe API.
- **Storage**: LocalStorage for cart and token management.
---

<p><a href="{{ '/' | relative_url }}">← Back to home</a></p>

