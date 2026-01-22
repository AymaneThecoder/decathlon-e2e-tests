Feature: Mock - Injection de données localStorage

  Scenario: Vérifier l'injection de produits mockés
    Given je prépare des produits mockés dans localStorage
    When j'ouvre la page Decathlon
    And je refuse les cookies
    Then les données mockées sont présentes dans localStorage