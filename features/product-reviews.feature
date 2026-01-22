Feature: Consultation des avis clients

  Scenario: Consulter les avis d'un produit
    Given je suis sur la page Decathlon
    When je refuse les cookies
    And je recherche "bonnet"
    And je clique sur le premier produit
    And je clique sur les avis clients
    Then la section avis s'affiche