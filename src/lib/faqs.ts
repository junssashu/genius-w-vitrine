export type Faq = { q: string; a: string };

export const faqs: readonly Faq[] = [
  {
    q: "Combien de temps faut-il pour une pièce sur-mesure ?",
    a: "Comptez entre 4 et 12 semaines selon la complexité. Une robe de mariée demande généralement 8 semaines à partir du premier essayage.",
  },
  {
    q: "Travaillez-vous à distance, hors du Cameroun ?",
    a: "Oui. Nous prenons les mesures en visioconférence guidée, expédions un patron-test, puis livrons la pièce finale dans le monde entier.",
  },
  {
    q: "Quelle est la fourchette de prix ?",
    a: "Le prêt-à-porter démarre à partir de 95 000 FCFA. Une pièce de haute couture commence à 850 000 FCFA et peut dépasser 5 millions selon les matières.",
  },
  {
    q: "Acceptez-vous les commandes corporate ou groupes ?",
    a: "Absolument. Nous habillons régulièrement des cabinets, des productions audiovisuelles et des cortèges de mariage. Devis sur demande.",
  },
  {
    q: "Quelles matières utilisez-vous ?",
    a: "Tissus naturels en priorité : soies, lins, cotons longues fibres, laines mérinos, cuirs tannés végétal. Tissus africains de tisserands sélectionnés au Cameroun, Mali et Sénégal.",
  },
  {
    q: "Proposez-vous des retouches après livraison ?",
    a: "Toutes nos pièces sont garanties à vie en retouches sur les coutures d'origine.",
  },
  {
    q: "Comment se passe le premier rendez-vous ?",
    a: "Une heure de conversation. Nous regardons ensemble vos références, vos contraintes, votre garde-robe. Aucun engagement à ce stade.",
  },
] as const;
