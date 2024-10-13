---
class: post
title: "#howtodev - Diagrammi con mermaidjs pt2 - Sequence Diagram"
date: 2024-10-13 07:00
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

[Articolo precedente: Introduzione e Flowcharts &larr;](https://linuxhub.it/articles/howtodev-mermaidjs-pt1)  

MermaidJS è una libreria Javascript per la creazione di diagrammi tramite linguaggio di formattazione. È integrato in alcuni software ed è facile da utilizzare.

Utilizzo dei Sequence diagrams.

## Obiettivi

L'articolo affronterà i seguenti argomenti:

- Sequence diagrams su mermaid JS

## Prerequisiti

Tutto il necessario è espresso nell'[articolo introduttivo a mermaidJS](https://linuxhub.it/articles/howtodev-mermaidjs-pt1)

## Sequence diagrams

I Sequence Diagrams son diagrammi UML che hanno lo scopo di modellare l'interazione tra diversi oggetti di un flusso di programmazione.

Le varie interazioni comprendono chiamate a oggetti, metodi, invio di messaggi e attività che vengono posizionate nel tempo.

Ogni attore viene rappresentato da una timeline verticale, i messaggi da frecce (continue o a tratti) che vanno da un attore ad un altro dall'alto verso il basso.

Ci son diverse tipologie di messaggio che si possono indicare:

- messaggi sincroni, indicati da una linea continua con freccia piena
- messaggi asincroni, indicati da una linea continua con una freccia vuota
- messaggio di risposta, indicata da una linea tratteggiata con freccia vuota
- messaggio eliminato, rappresentato ad un collegamento tratteggiato con una X sopra

## Sequence diagrams in mermaidjs

MermaidJS supporta questo genere di diagrammi ovviamente. Sono introdotti dalla riga:

```yaml
sequenceDiagram
```

Ogni riga successiva rappresenta un evento, un partecipante o un attore. Per introdurre un partecipante esplicitamente si scrive `participant`:

```yaml
sequenceDiagram
    participant NomeAttore
```

Per uno scambio di messaggi sincroni basta utilizzare una freccia con due punte `->>`:

```yaml
sequenceDiagram
    participant NomeAttore
    participant NomeAttore2
    NomeAttore ->> NomeAttore2: messaggio
```

A seguito di uno scambio, va esplicitato un messaggio (che si posizionerà sopra la linea), il messaggio può essere anche vuoto, ma vanno comunque indicati i due punti `:` e uno spazio

```yaml
sequenceDiagram
    participant NomeAttore
    participant NomeAttore2
    NomeAttore ->> NomeAttore2: 
```

Da notare che, se un partecipante non è esplicitamente dichiarato, viene comunque creato dopo aver creato uno scambio di messaggi asincroni. La sintassi:

```yaml
sequenceDiagram
    NomeAttore ->> NomeAttore2
```

Produce quindi lo stesso risultato di cui sopra.

### Actor

Per avere un attore anziché un oggetto, basta dichiararlo come `actor`:

```yaml
sequenceDiagram
    actor NomeAttore
```

In questo caso va dichiarato esplicitamente, il valore di default ricade sempre sul partecipante e non attore.

### Vari tipi di messaggi

Mermaid supporta vari tipi di messaggi ovviamente: 

- `->` Chiamata sincrona
- `-->` Chiamata asincrona
- `->>` messaggio sincrono
- `-->>` messaggio sincrono
- `<<->>` comunicazione bidirezionale sincrona
- `<<-->>` comunicazione bidirezionale asincrona
- `-x` Terminazione sincrona di un attore
- `--x`	Terminazione asincrona di un attore.
- `-)` Messaggio asincrono con freccia vuota
- `--)`	Messaggio asincrono con freccia vuota e linea tratteggiata


```yaml
sequenceDiagram
    Dady -> Bob: linea continua
    Dady --> Bob: linea tratteggiata
    Dady ->> Bob: linea continua e freccia piena
    Dady -->> Bob: linea tratteggiata e freccia piena
    Dady <<->> Bob: linea continua con due freccie piene
    Dady <<-->> Bob: linea tratteggiata con due freccie piene
    Dady -x Bob: linea continua con x
    Dady --x Bob: linea tratteggiata con x
    Dady -) Bob: linea continua e freccia vuota
    Dady --) Bob: linea tratteggiata e freccia vuota
```

### Create/Destroy

La creazione di un partecipante o di un attore può avvenire in momenti diversi. Usando la parolina "`create`" si può anche far si che venga creato in un punto particolare della timeline e non in alto:

```yaml
sequenceDiagram
    Dady->>Bob: a
    Bob ->> Dady: b
    create participant Gio
    Bob ->> Gio: c
```

In questo caso, Gio viene creato solo dopo il messaggio "b". Tramite la parola `destroy` può poi essere distrutto in un momento specifico. La distruzione di un attore o un partecipante deve essere però seguita da un messaggio di "delete":

```yaml
sequenceDiagram
    Dady->>Bob: Ciao Bob
    Bob ->> Dady: Ciao Dady
    create participant Gio
    Bob ->> Gio: Oh guarda Gio Ciao
    Gio ->> Dady: Son di passaggio ciao!
    Dady ->> Gio: Ciao!
    destroy Gio
    Bob-xGio: Ciao!
    Dady ->> Bob: come stai Bob?
    Bob ->> Dady: bene tu dady?
```

### Alias

Se il nome di un partecipante è complesso o si vuole creare un id più semplice e corto senza dover ripetere ogni messaggio il nome per intero si può creare un alias, ovvero il partecipante viene creato con un certo id ma il nome mostrato poi è diverso:

```yaml
sequenceDiagram
    participant D as Dady
    D ->> Bob: Ciao Bob
```

### Le note

Si possono creare delle note, ovvero riquadri che spiegano in maniera approfondita delle zone di diagramma.  
Le note possono essere a lato del diagramma:

```yaml
sequenceDiagram
    participant Dady
    Note right of Dady: Nota a destra
	Note left of Dady: Nota a destra
```

O nel diagramma in una conversazione

```yaml
sequenceDiagram
	participant Dady
	participant Bob
	Note over Dady,Bob: Nota nella conversazione
```

### Loop

I loop indicano un frammento di timeline che si ripete, e si possono indicare in una struttura molto simile al loop di programmazione:

```yaml
sequenceDiagram
    loop ogni ora
        Dady->Bob: Che ore sono?
        Bob-->Dady: ecco qua l'ora
    end
```

### Raggruppamento

Si possono raggruppare in box i vari partecipanti, e colorare i box in maniere differenti: 

```yaml
sequenceDiagram
    box rgba(255,255,0,0.5) Box Giallo
        participant Dady
        actor Bob
    end
```

Si può specificare il colore in rgba, il nome e i partecipanti all'interno.

### Altre informazioni

Altre informazioni [sulla documentazione ufficiale](https://mermaid.js.org/syntax/sequenceDiagram.html).
