---
class: post
title: "#howtodev - Diagrammi con mermaidjs pt3 - Class Diagrams"
date: 2024-11-18 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags:
- javascript
- mermaidjs
- uml
---

[Articolo precedente: Class Diagrams &larr;](https://linuxhub.it/articles/howtodev-mermaidjs-pt2)  

MermaidJS è una libreria Javascript per la creazione di diagrammi tramite linguaggio di formattazione. È integrato in alcuni software ed è facile da utilizzare.

Utilizzo degli State diagrams

## Obiettivi

L'articolo affronterà i seguenti argomenti:

- State diagrams su MermaidJS

## Prerequisiti

Tutto il necessario è espresso nell'[articolo introduttivo a mermaidJS](https://linuxhub.it/articles/howtodev-mermaidjs-pt1)

## State Diagrams

Gli state diagram son molto utili per definire una procedura di un sistema e il suo comportamento, rappresentando piano piano il suo stato e come si comporta in detereminate condizioni. Spesso questo genere di strumento è usato nelle "macchine a stati".

Si tratta sostanzialmente di un tipo di grafo in cui i nodi son gli stati del sistema e gli archi rappresentano un passaggio di stato.  

Ogni passaggio di stato ovviamente è etichettato con quell'azione che ne ha permesso il passaggio di stato, è possibile anche creare percorsi più complessi tramite delle diramazioni condizionali (dette condizioni di guardia).

Ogni state diagram ha uno stato iniziale, rappresentato da un cerchio pieno, e può terminare in uno stato finale, rappresentato da un cerchio con un bordo doppio.  
Questi servono a definire il ciclo di vita del sistema o del componente.

## State diagram in mermaidJS

Uno state diagram inizia su mermaidJS con: 

```yaml
stateDiagram-v2
```

Ovviamente può essere preceduto dal titolo 

```yaml
---
title: State Diagram
---
stateDiagram-v2
```

### Gli stati

Per creare uno stato basta scriverne il nome:

```yaml
---
title: State Diagram
---
stateDiagram-v2
    nomeStato
```


