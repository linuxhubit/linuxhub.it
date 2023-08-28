---
class: post
title: '#howto - migliorare performance deck'
date: 2023-08-25 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags:
- steam
- deck
- videogames
- performance
- vram
---

Da possessore della Steam Deck posso tranquillamente dire che son pochi i problemi di performance che fin ora ho incontrato, generalmente il sistema si adatta molto facilmente alla situazione offrendo sempre il miglior bilanciamento tra prestazioni e durata della batteria. Per le volte in cui non è così, vediamo come risolvere.

## Cosa ne penso di Steam Deck

Abbiamo parlato di Steam Deck [in questo articolo](https://linuxhub.it/articles/pausacaffe-ennesima-recensione-steam-deck/), forse un po' datato ma rispecchia comunque la maggior parte delle cose che tutt'ora penso. Se proprio dovessi cambiare qualcosa direi che è stato migliorato l'aspetto desktop. Ma non è rivalutare la Steam Deck lo scopo di questo articolo. 

Se invece avete una Steam Deck e siete interessati ad avere una maggiore libertà nel sistema, potreste trovare interessante l'articolo su [come installare Archlinux in una cartella](https://linuxhub.it/articles/howto-installare-arch-cartella/).

## La vram unificata

Per fare un quadro della situazione si vedano prima le specifiche di Steam Deck, la Steam Deck ha un APU AMD custom con CPU Zen 2 e GPU integrata. Ha inoltre 16 GB di RAM LPDDR5.

E la vRAM? È di tipo UMA (Unified Memory Architecture), ovvero ha una memoria unificata alla RAM, [qui la documentazione uffiale](https://www.amd.com/en/support/kb/faq/pa-280).

Tale meccanismo *dovrebbe* automaticamente adattarsi al contesto diminuendo ed aumentando in base al carico richiesto. Il punto è che non sempre lo fa perfettamente, e potrebbe essere necessario impostare un valore minimo per evitare cali di prestazioni.

### Modificare il Frame Buffer UMA

> **ATTENZIONE**:
>
> Un maggiore valore allocato in vram potrebbe causare sia un autonomia minore della console che il malfunzionamento di alcuni giochi.

Per modificare questo valore, spegnere la Steam Deck e *riaccenderla* tenendo premuto il **pulsante del volume &plus;**. Questo permetterà di entrare nel BIOS.

Si aprirà l'interfaccia BIOS, il touch non funzionerà, per navigare bisognerà utilizzare o le frecce direzionali o il mouse (tramite il pannello del touch destro).

Andare in "Setup Utility", premere il tasto `A` oppure se si sta usando il mouse il tasto `ZR`.

Da qui andare in *Advanced*, selezionare l'opzione *UMA Frame buffer Size*, di norma questo valore è `1G`, e non si può andare oltre i `4G`. Per giochi particolarmente pesanti si può pensare di impostare proprio il massimo, ma una pratica più corretta potrebbe essere quella di allocare progressivamente fino ad ottenere delle buone performance.
Una volta impostato uscire dal menù "*Advanced*" ed andare in *EXIT*. Selezionare l'opzione **Exit Saving Changes**.

## CryoUtils

Uno strumento molto utile per migliorare le performance della Steam Deck potrebbe essere "CryoUtilities". Questo tool, sviluppato da **CryoBute33**, è nato per raccogliere una serie di miglioramenti (tra cui quello della vram) per il pc Handled di Valve. 

Si può trovare il repository completamente open source [su Github](https://github.com/CryoByte33/steam-deck-utilities/), quanto l'installazione basta avviare la Steam Deck in modalità Desktop, aprire *Konsole* e digitare: 

```bash
curl https://raw.githubusercontent.com/CryoByte33/steam-deck-utilities/main/install.sh | bash -s --
```

Si verrà poi guidati nella configurazione del tool.

> *NOTA BENE*:
>
> verrà ampliato il file di Swap a 16GB, assicurarsi di avere lo spazio libero necessario.
