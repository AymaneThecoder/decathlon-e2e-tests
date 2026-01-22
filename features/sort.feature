Feature: Tri des produits Decathlon

  Scenario: Trier les produits par prix décroissant
    Given je suis sur la page Decathlon
    When je refuse les cookies
    And je recherche "bonnet ski"
    And je trie par prix décroissant
    Then le tri est appliqué