Feature: Gestion de la quantité dans le panier

  Scenario: Augmenter la quantité d'un produit
    Given je suis sur la page Decathlon
    When je refuse les cookies
    And je recherche "bonnet"
    And je clique sur le premier produit
    And j'ajoute au panier
    And je visualise mon panier
    And j'augmente la quantité de 2
    Then la quantité affichée est "3"