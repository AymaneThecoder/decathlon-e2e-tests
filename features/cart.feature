Feature: Gestion du panier Decathlon

  Scenario: Ajouter un produit au panier
    Given je suis sur la page Decathlon
    When je refuse les cookies
    And je recherche "ballon de football"
    And je clique sur le premier produit
    And j'ajoute au panier
    Then le panier contient 1 produit

  Scenario: Supprimer un produit du panier
    Given je suis sur la page Decathlon
    When je refuse les cookies
    And je recherche "ballon de football"
    And je clique sur le premier produit
    And j'ajoute au panier
    When je vais dans le panier
    And je supprime le produit
    Then le panier est vide