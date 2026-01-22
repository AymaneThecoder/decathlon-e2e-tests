# 🧪 Tests E2E - Decathlon.fr

Tests End-to-End automatisés pour le site Decathlon.fr avec **Playwright**, **Page Object Model** et **Cucumber/Gherkin**.

## 📋 Table des matières

- [À propos](#à-propos)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Scénarios testés](#scénarios-testés)
- [Exécution des tests](#exécution-des-tests)
- [Architecture](#architecture)
- [Auteurs](#auteurs)

---

## 📖 À propos

Projet de tests automatisés End-to-End développé dans le cadre du module de **Qualité Logiciels** à **ESIEA Paris**.

---

## 🛠️ Technologies utilisées

- **[Playwright](https://playwright.dev/)** v1.49.0 - Framework de test E2E
- **[Cucumber](https://cucumber.io/)** v11.1.1 - BDD (Behavior Driven Development)
- **[TypeScript](https://www.typescriptlang.org/)** v5.7.3 - Langage typé
- **[Node.js](https://nodejs.org/)** v18+ - Environnement d'exécution

---

## ✅ Prérequis

- Node.js version 18 ou supérieure
- npm ou yarn
- Git

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/AymaneThecoder/decathlon-e2e-tests.git
cd decathlon-e2e-tests
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Installer les navigateurs Playwright

```bash
npx playwright install
```

---

## 📁 Structure du projet

```
decathlon-e2e-tests/
├── pages/                      # Page Object Model (POM)
│   ├── HomePage.ts             # Page d'accueil et recherche
│   ├── SearchResultsPage.ts   # Résultats de recherche et filtres
│   ├── ProductPage.ts          # Fiche produit
│   ├── CartPage.ts             # Gestion du panier
│   ├── StoreLocatorPage.ts    # Recherche de magasins
│   ├── ProductReviewsPage.ts  # Avis clients
│   └── MockHelper.ts           # Helper pour les mocks
├── tests/                      # Tests Playwright
│   ├── search*.spec.ts         # Tests de recherche
│   ├── cart*.spec.ts           # Tests du panier
│   ├── filter*.spec.ts         # Tests de filtrage
│   ├── sort*.spec.ts           # Tests de tri
│   ├── modify-quantity*.spec.ts # Tests de quantité
│   ├── store-locator*.spec.ts  # Tests store locator
│   ├── product-reviews*.spec.ts # Tests avis clients
│   └── mock*.spec.ts           # Tests avec mocks
├── features/                   # Scénarios Gherkin (BDD)
│   ├── search.feature          # Recherche de produits
│   ├── cart.feature            # Gestion du panier
│   ├── filter.feature          # Filtrage
│   ├── sort.feature            # Tri
│   ├── quantity.feature        # Modification quantité
│   ├── store-locator.feature   # Recherche magasins
│   ├── product-reviews.feature # Avis clients
│   ├── mock.feature            # Mock localStorage
│   └── step_definitions/       # Définitions des steps
│       └── search.steps.ts
├── playwright.config.ts        # Configuration Playwright
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances du projet
```

---

## 🎯 Scénarios testés

### 1. 🔍 Recherche de produits

- Rechercher un produit par mot-clé
- Vérifier l'affichage des résultats

### 2. 🛒 Gestion du panier

- Ajouter un produit au panier
- Supprimer un produit du panier
- Modifier la quantité d'un produit

### 3. 🔧 Filtrage et tri

- Filtrer les produits par prix maximum
- Trier les résultats par prix décroissant

### 4. 📍 Recherche de magasins

- Accéder à la page Store Locator
- Vérifier la présence de la carte et des fonctionnalités

### 5. ⭐ Avis clients

- Consulter les avis d'un produit
- Vérifier l'affichage de la section avis

### 6. 🎭 Mock localStorage

- Injecter des données fictives dans localStorage
- Vérifier la persistence des données mockées

---

## ▶️ Exécution des tests

### Tests Playwright (tous les scénarios)

```bash

# Mode headed (avec interface graphique)
npm run test:headed
```

### Tests BDD/Cucumber

```bash
# Exécuter tous les scénarios Gherkin
npm run test:bdd
```

### Générer un rapport

```bash
# Rapport HTML Playwright
npm run report
```

### Codegen (générer des tests)

```bash
# Ouvrir l'outil de génération de code
npm run codegen
```

---

## 🏗️ Architecture

### Page Object Model (POM)

Le projet utilise le design pattern **Page Object Model** pour :

- ✅ **Réutilisabilité** : Les méthodes sont centralisées
- ✅ **Maintenabilité** : Un changement dans l'UI = une seule modification
- ✅ **Lisibilité** : Les tests sont plus clairs et expressifs

**Exemple :**

```typescript
// Au lieu de :
await page.getByRole("button", { name: "Ajouter au panier" }).click();

// On utilise :
await productPage.addToCart();
```

### Behavior Driven Development (BDD)

Les scénarios sont écrits en **Gherkin** (langage naturel) :

```gherkin
Scenario: Ajouter un produit au panier
  Given je suis sur la page Decathlon
  When je refuse les cookies
  And je recherche "ballon de football"
  And je clique sur le premier produit
  And j'ajoute au panier
  Then le panier contient 1 produit
```

**Avantages :**

- ✅ Compréhensible par les non-techniques
- ✅ Documentation vivante
- ✅ Collaboration facilitée

---

## 👥 Auteurs

- **Aymane** - [AymaneThecoder](https://github.com/AymaneThecoder)
- **Mehdi** - [ze-programeuuuuuuuur](https://github.com/ze-programeuuuuuuuur)

**École :** ESIEA Paris  
**Formation :** 5ème année Génie Logiciel  
**Module :** Qualité Logiciels  
**Année :** 2025-2026

---

## 📄 Licence

Ce projet est un projet académique réalisé dans le cadre de la formation à ESIEA Paris.

---

## 📌 Notes techniques

### Choix du site

Decathlon.fr a été choisi pour sa :

- Stabilité et disponibilité
- Richesse fonctionnelle (e-commerce complet)
- Accessibilité (pas d'authentification complexe requise)
- Structure HTML bien formée

### Limitations connues

- Le mock localStorage est limité au badge du panier (Decathlon recharge les données depuis son API)
- Certains sélecteurs peuvent être fragiles (dépendent de la structure DOM de Decathlon)

### Bonnes pratiques appliquées

- ✅ Commits clairs et réguliers
- ✅ Architecture POM modulaire
- ✅ Tests Playwright + BDD pour couvrir différents niveaux
- ✅ Configuration TypeScript stricte
- ✅ Gestion des cookies et états
