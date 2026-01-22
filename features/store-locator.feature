Feature: Recherche de magasins Decathlon

  Scenario: Accéder à la recherche de magasins
    Given je suis sur la page Decathlon
    When je refuse les cookies
    And je clique sur "Mon magasin"
    Then la page recherche de magasins s'affiche
    And je vois la barre de recherche
    And je vois le bouton de géolocalisation