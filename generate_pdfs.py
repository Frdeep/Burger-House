#!/usr/bin/env python3
"""
Génère les fichiers PDF des contrats de franchise Burger House
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY

# Couleurs Burger House
YELLOW = HexColor('#FFBE0B')
BLACK = HexColor('#1A1A1A')
WHITE = HexColor('#FFFFFF')

def create_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='TitleYellow',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=BLACK,
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='Subtitle',
        parent=styles['Normal'],
        fontSize=14,
        textColor=BLACK,
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='ArticleTitle',
        parent=styles['Heading2'],
        fontSize=12,
        textColor=BLACK,
        spaceBefore=20,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='ContractBody',
        parent=styles['Normal'],
        fontSize=10,
        textColor=BLACK,
        spaceAfter=8,
        alignment=TA_JUSTIFY,
        leading=14
    ))
    
    styles.add(ParagraphStyle(
        name='BoldText',
        parent=styles['Normal'],
        fontSize=10,
        textColor=BLACK,
        spaceAfter=8,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='SmallText',
        parent=styles['Normal'],
        fontSize=9,
        textColor=BLACK,
        spaceAfter=6,
        leading=12
    ))
    
    return styles

def generate_france_contract():
    doc = SimpleDocTemplate(
        "contrat_franchise_france.pdf",
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    styles = create_styles()
    story = []
    
    # Header
    story.append(Paragraph("CONTRAT DE FRANCHISE", styles['TitleYellow']))
    story.append(Paragraph("BURGER HOUSE - FRANCE", styles['Subtitle']))
    story.append(Spacer(1, 20))
    
    # Parties
    story.append(Paragraph("<b>ENTRE LES SOUSSIGNÉS :</b>", styles['BoldText']))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph(
        "La société <b>BURGER HOUSE SAS</b>, société par actions simplifiée au capital de 100 000 euros, "
        "immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro [RCS], "
        "dont le siège social est situé à Paris, représentée par son Président,",
        styles['ContractBody']
    ))
    story.append(Paragraph("Ci-après dénommée <b>« Le Franchiseur »</b>", styles['SmallText']))
    story.append(Spacer(1, 15))
    
    story.append(Paragraph("<b>ET</b>", styles['BoldText']))
    story.append(Spacer(1, 15))
    
    story.append(Paragraph(
        "[Nom du Franchisé], [Forme juridique], immatriculée au RCS de [Ville] sous le numéro [RCS], "
        "dont le siège social est situé [Adresse], représentée par [Nom du représentant] "
        "en sa qualité de [Fonction],",
        styles['ContractBody']
    ))
    story.append(Paragraph("Ci-après dénommé <b>« Le Franchisé »</b>", styles['SmallText']))
    story.append(Spacer(1, 20))
    
    # Articles
    story.append(Paragraph("ARTICLE 1 - OBJET DU CONTRAT", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le Franchiseur concède au Franchisé, qui l'accepte, le droit non exclusif d'exploiter un restaurant "
        "sous l'enseigne « BURGER HOUSE » conformément au concept développé par le Franchiseur. "
        "Ce droit comprend l'utilisation de la marque, du savoir-faire, des méthodes d'exploitation "
        "et de l'assistance technique du réseau BURGER HOUSE.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 2 - DURÉE", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le présent contrat est conclu pour une durée de <b>cinq (5) ans</b> à compter de sa date de signature. "
        "Il sera renouvelé par tacite reconduction pour des périodes successives de cinq ans, "
        "sauf dénonciation par l'une des parties par lettre recommandée avec accusé de réception "
        "moyennant un préavis de six (6) mois avant l'échéance.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 3 - TERRITOIRE", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le Franchiseur accorde au Franchisé une <b>exclusivité territoriale</b> sur la zone définie en Annexe 1 "
        "du présent contrat. Cette zone est déterminée selon la zone de chalandise, généralement un rayon "
        "de 3 à 5 km en zone urbaine et 10 à 15 km en zone rurale, pour une population minimale de 30 000 habitants.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 4 - CONDITIONS FINANCIÈRES", styles['ArticleTitle']))
    story.append(Paragraph(
        "<b>4.1 Droit d'entrée :</b> 25 000 € HT payable à la signature du contrat.<br/>"
        "<b>4.2 Redevance d'exploitation :</b> 5% du chiffre d'affaires HT mensuel.<br/>"
        "<b>4.3 Redevance publicitaire :</b> 2% du chiffre d'affaires HT mensuel.<br/>"
        "<b>4.4 Investissement initial :</b> L'investissement global est estimé entre 200 000 € et 300 000 € "
        "selon la surface et l'emplacement du local.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 5 - OBLIGATIONS DU FRANCHISEUR", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le Franchiseur s'engage à :<br/>"
        "• Transmettre le savoir-faire et le manuel opératoire complet<br/>"
        "• Dispenser une formation initiale de 4 semaines<br/>"
        "• Fournir une assistance permanente (hotline 7j/7)<br/>"
        "• Assurer le développement et la promotion de la marque<br/>"
        "• Négocier les accords fournisseurs au bénéfice du réseau",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 6 - OBLIGATIONS DU FRANCHISÉ", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le Franchisé s'engage à :<br/>"
        "• Respecter strictement les normes et standards BURGER HOUSE<br/>"
        "• S'approvisionner auprès des fournisseurs agréés<br/>"
        "• Participer aux formations continues obligatoires<br/>"
        "• Transmettre les reporting mensuels dans les délais<br/>"
        "• Maintenir les locaux conformes aux normes d'hygiène HACCP",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 7 - NON-CONCURRENCE", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le Franchisé s'engage à ne pas exercer d'activité concurrente pendant toute la durée du contrat "
        "et pendant une durée d'un (1) an après la fin du contrat, dans un rayon de trente (30) kilomètres "
        "autour du point de vente.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 8 - RÉSILIATION", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le contrat peut être résilié de plein droit en cas de :<br/>"
        "• Non-paiement des redevances pendant deux mois consécutifs<br/>"
        "• Non-respect grave des standards de qualité<br/>"
        "• Atteinte à l'image de la marque<br/>"
        "• Procédure collective du Franchisé",
        styles['ContractBody']
    ))
    
    story.append(Spacer(1, 40))
    story.append(Paragraph(
        "Fait en deux exemplaires originaux,<br/>"
        "À _________________, le _________________",
        styles['ContractBody']
    ))
    
    story.append(Spacer(1, 40))
    
    # Signatures
    signature_data = [['Le Franchiseur', 'Le Franchisé']]
    signature_table = Table(signature_data, colWidths=[8*cm, 8*cm])
    signature_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
    ]))
    story.append(signature_table)
    
    doc.build(story)
    print("✅ contrat_franchise_france.pdf généré")

def generate_international_contract():
    doc = SimpleDocTemplate(
        "contrat_franchise_international.pdf",
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    styles = create_styles()
    story = []
    
    # Header
    story.append(Paragraph("CONTRAT DE FRANCHISE INTERNATIONALE", styles['TitleYellow']))
    story.append(Paragraph("BURGER HOUSE - ZONE OHADA", styles['Subtitle']))
    story.append(Spacer(1, 20))
    
    # Parties
    story.append(Paragraph("<b>ENTRE LES SOUSSIGNÉS :</b>", styles['BoldText']))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph(
        "La société <b>BURGER HOUSE SAS</b>, société de droit français, immatriculée au Registre du Commerce "
        "et des Sociétés de Paris, représentée par son Président,",
        styles['ContractBody']
    ))
    story.append(Paragraph("Ci-après dénommée <b>« Le Franchiseur »</b>", styles['SmallText']))
    story.append(Spacer(1, 15))
    
    story.append(Paragraph("<b>ET</b>", styles['BoldText']))
    story.append(Spacer(1, 15))
    
    story.append(Paragraph(
        "[Nom de la Société], société de droit [pays], immatriculée au RCCM de [Ville] "
        "sous le numéro [RCCM], représentée par [Nom], en sa qualité de [Fonction],",
        styles['ContractBody']
    ))
    story.append(Paragraph("Ci-après dénommé <b>« Le Franchisé »</b>", styles['SmallText']))
    story.append(Spacer(1, 20))
    
    # Préambule
    story.append(Paragraph("PRÉAMBULE", styles['ArticleTitle']))
    story.append(Paragraph(
        "Dans le cadre de son expansion internationale, BURGER HOUSE souhaite développer son réseau "
        "en zone OHADA (Organisation pour l'Harmonisation en Afrique du Droit des Affaires), regroupant "
        "17 États membres dont la Côte d'Ivoire, le Sénégal, le Cameroun, le Mali, le Gabon et le Congo. "
        "Le présent contrat de Franchise Internationale confère au Franchisé le droit exclusif de développer "
        "le concept BURGER HOUSE sur un territoire défini.",
        styles['ContractBody']
    ))
    
    # Articles
    story.append(Paragraph("ARTICLE 1 - DURÉE ET TERRITOIRE", styles['ArticleTitle']))
    story.append(Paragraph(
        "<b>1.1 Durée :</b> Le contrat est conclu pour une durée de <b>sept (7) ans</b>, renouvelable "
        "par périodes successives de sept ans.<br/><br/>"
        "<b>1.2 Territoire :</b> Le Franchisé bénéficie de l'exclusivité sur le territoire défini en Annexe "
        "(exemple : Côte d'Ivoire, Sénégal, Cameroun, etc.).",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 2 - CONDITIONS FINANCIÈRES", styles['ArticleTitle']))
    story.append(Paragraph(
        "<b>2.1 Droit d'entrée :</b> 50 000 € à 100 000 € selon le territoire.<br/>"
        "<b>2.2 Redevance d'exploitation :</b> 5% du chiffre d'affaires HT mensuel.<br/>"
        "<b>2.3 Redevance communication :</b> 2% du chiffre d'affaires HT mensuel.<br/>"
        "<b>2.4 Conversion FCFA :</b> Taux fixe garanti de 1€ = 655,957 FCFA.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 3 - OBLIGATIONS DE DÉVELOPPEMENT", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le Franchisé s'engage à ouvrir un nombre minimum de points de vente selon le calendrier suivant :<br/>"
        "• <b>Année 1 :</b> 2 restaurants (dont 1 pilote)<br/>"
        "• <b>Années 2-3 :</b> 3 restaurants supplémentaires<br/>"
        "• <b>Années 4-7 :</b> 5 restaurants supplémentaires<br/><br/>"
        "Le non-respect de ce calendrier peut entraîner la perte de l'exclusivité territoriale.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 4 - FORMATION ET ASSISTANCE", styles['ArticleTitle']))
    story.append(Paragraph(
        "<b>4.1 Formation initiale :</b> 6 semaines au siège en France.<br/>"
        "<b>4.2 Assistance au lancement :</b> Équipe BURGER HOUSE sur place pendant 4 semaines.<br/>"
        "<b>4.3 Formation continue :</b> Sessions annuelles obligatoires.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 5 - DROIT APPLICABLE", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le présent contrat est soumis au <b>droit OHADA</b>, notamment :<br/>"
        "• Acte Uniforme relatif au Droit Commercial Général<br/>"
        "• Acte Uniforme sur le Droit des Sociétés Commerciales<br/><br/>"
        "<b>Arbitrage :</b> Tout litige sera soumis à l'arbitrage de la <b>CCJA</b> "
        "(Cour Commune de Justice et d'Arbitrage) siégeant à Abidjan, Côte d'Ivoire.",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 6 - ADAPTATION LOCALE", styles['ArticleTitle']))
    story.append(Paragraph(
        "Le Franchisé pourra proposer des adaptations au concept pour répondre aux spécificités locales :<br/>"
        "• <b>Menu :</b> jusqu'à 20% de produits locaux (soumis à validation du Franchiseur)<br/>"
        "• <b>Design :</b> adaptation aux contraintes architecturales locales<br/>"
        "• <b>Ressources humaines :</b> application du droit du travail local",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 7 - SPÉCIFICITÉS CÔTE D'IVOIRE", styles['ArticleTitle']))
    story.append(Paragraph(
        "Pour le territoire de la Côte d'Ivoire :<br/>"
        "• Immatriculation obligatoire au RCCM (Registre du Commerce et du Crédit Mobilier)<br/>"
        "• Passage par le CEPICI (Centre de Promotion des Investissements en Côte d'Ivoire)<br/>"
        "• Zones d'implantation prioritaires : Plateau, Cocody, Marcory, Zone 4, Angré (Abidjan)<br/>"
        "• Population cible : classe moyenne urbaine en forte expansion",
        styles['ContractBody']
    ))
    
    story.append(Paragraph("ARTICLE 8 - RÉSILIATION", styles['ArticleTitle']))
    story.append(Paragraph(
        "Outre les cas de résiliation prévus par le droit commun, le contrat peut être résilié en cas de :<br/>"
        "• Non-respect du calendrier d'ouverture<br/>"
        "• Non-paiement des redevances pendant 3 mois consécutifs<br/>"
        "• Atteinte grave aux standards de qualité<br/>"
        "• Sous-franchise non autorisée",
        styles['ContractBody']
    ))
    
    story.append(Spacer(1, 40))
    story.append(Paragraph(
        "Fait en deux exemplaires originaux,<br/>"
        "À _________________, le _________________",
        styles['ContractBody']
    ))
    
    story.append(Spacer(1, 40))
    
    # Signatures
    signature_data = [['Le Franchiseur', 'Le Franchisé']]
    signature_table = Table(signature_data, colWidths=[8*cm, 8*cm])
    signature_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
    ]))
    story.append(signature_table)
    
    doc.build(story)
    print("✅ contrat_franchise_international.pdf généré")

if __name__ == "__main__":
    generate_france_contract()
    generate_international_contract()
    print("\n🍔 Les deux contrats PDF ont été générés avec succès!")
