Feature: Filtrer les produits Decathlon

  Scenario: Filtrer les produits par prix max
    Given je suis sur la page Decathlon
    When je refuse les cookies
    And je recherche "chaussure"
    And je filtre par prix max "100"
    Then le filtre prix est appliqué à "100"