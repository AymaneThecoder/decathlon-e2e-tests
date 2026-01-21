Feature: Recherche de produits Decathlon

  Scenario: Rechercher des chaussures de running
    Given je suis sur la page Decathlon
    When je refuse les cookies
    And je recherche "chaussure running"
    Then je vois des résultats

