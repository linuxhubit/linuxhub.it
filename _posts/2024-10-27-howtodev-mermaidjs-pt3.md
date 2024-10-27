---
class: post
title: "#howtodev - Diagrammi con mermaidjs pt3 - Class Diagrams"
date: 2024-10-27 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Luigi Smiraglio
coauthor_github: geegeek
published: true
tags:
- javascript
- mermaidjs
- uml
---

[Articolo precedente: Sequence Diagrams &larr;](https://linuxhub.it/articles/howtodev-mermaidjs-pt2)  

MermaidJS è una libreria Javascript per la creazione di diagrammi tramite linguaggio di formattazione. È integrato in alcuni software ed è facile da utilizzare.

Utilizzo dei Class diagrams

## Obiettivi

L'articolo affronterà i seguenti argomenti:

- Class diagrams su MermaidJS

## Prerequisiti

Tutto il necessario è espresso nell'[articolo introduttivo a mermaidJS](https://linuxhub.it/articles/howtodev-mermaidjs-pt1)

## Class Diagrams

Il diagramma delle classi è forse il più conosciuto per chiunque si sia mai addentrato nel mondo dei diagrammi UML e nell'ingegneria del software, esprime la correlazione tra gli oggetti (classi) di un progetto ed è ottimo per rappresentare alcune strategie di sviluppo come i design patterns.

### Panoramica generale sul diagramma delle classi

Nel diagramma delle classi i vari blocchi possono riferirsi ad oggetti, classi implementate, astratte o interfacce. I collegamenti sono in realtà molto vari e possono indicare conoscenza, ereditarietà, inclusione e molto altro.

Ogni riquadro può essere suddiviso in tre sezioni:

- La sezione superiore contiene il nome della classe
- quella centrale gli attributi
- quella inferiore i metodi (o operazioni) della classe

Mentre è ovviamente **necessario** avere un nome della classe, le altre due sezioni son del tutto opzionali: escluderle ovviamente non implica che quell'oggetto non abbia variabili o metodi, il diagramma UML deve fornire uno schema *ad alto livello* dell'architettura, quindi un assenza di queste sezioni può anche solo implicare che non sia necessario indicarle per capire la struttura del disegno architetturale.

Si possono specificare gli indicatori di visibilità in variabii o metodi:

- Public, indicato con il simbolo `+`.
- Private, Indicato con il simbolo `-`.
- Protected, Indicato con il simbolo `#`.
- Package, Indicato con il simbolo `~` o nessun simbolo.

Inoltre il nome della classe può essere preceduto (di una riga in su) da uno specificatore atto ad informare che tipo di classe è (astratta, interfaccia etc...). Spesso le interfacce son anche caratterzzate dal nome "in corsivo".

Come già specificato, il vero fulcro del diagramma delle classi sta nei collegamenti tra una classe e un altra, ce ne sono di veri tipi:

- Freccia di Associazione: Una linea semplice che collega due classi, rappresenta una relazione generica. Può includere molteplicità (es. 1..*, 0..1) per indicare il numero di istanze.
- Freccia di Aggregazione: Una linea con un rombo vuoto su un'estremità, indica una relazione "parte-tutto" in cui una classe è composta da altre, senza implicare una dipendenza forte.
- Freccia di Composizione: Simile all'aggregazione, ma con il rombo pieno. Indica una relazione di dipendenza forte, in cui il ciclo di vita della parte è legato al tutto.
- Freccia di Generalizzazione: Una freccia con una punta triangolare, rappresenta l'ereditarietà. La classe sottostante eredita attributi e metodi dalla classe superiore.
- Freccia di Dipendenza: Rappresentata da una freccia tratteggiata, mostra che una classe usa temporaneamente un'altra classe (ad esempio, come parametro di un metodo).

Si possono inoltre indicare vari elementi come note, package, sottosistemi e altro...

## Mermaid Class Diagram

Su MermaidJS i class Diagram sono introdotti dalla riga:

```yaml
classDiagram
```

Si può anche inserire un titolo scrivendo:

```yaml
---
title: Titolo grafico
---
classDiagram
```

è possibile impostare una "direzione" diversa per il diagramma scrivendo:

```
---
title: Titolo grafico
---
classDiagram
    direction RL
```

Dove `RL` sta per right to left (è possibile anche usare altre combinazioni come nel diagramma di flusso).

### Classi

Per disegnare un riquadro scrivere `class` seguito dal nome della classe:

```yaml
---
title: Titolo grafico
---
classDiagram
    class EsempioClasse
```

Apparirà un riquadro in cui, attributi e metodi, sono vuoti (le sezioni sono comunque visibili, ma vuote). Non si può purtroppo creare un riquadro senza le due sezioni di attributi e metodi, si possono solo lasciare vuote.

Si può anche inserire un nome più lungo con spazi e caratteri non supportati normalmente usando le parentesi quadre: 

```yaml
---
title: Titolo grafico
---
classDiagram
    class IDClasse["Esempio classe"]
```

In questo caso quello che c'è prima delle parentesi graffe sarà usato come ID per la classe (utile per le relazioni ad esempio) mentre quello all'interno sarà l'etichetta (formattabile oltretutto in HTML).


### Attributi e metodi

Per scrivere attributi e metodi si possono utilizzare due differenti sintassi:

- racchiuderle tra parentesi graffe `{}`.
- Ogni attributo ed ogni metodo è preceduto dal nome della classe e quindi i due punti (`:`).

Ad esempio per creare una classe "veicolo" con attributi "numeroRuote", "numeroPorte" e "targa" e con il metodo "compra" si può scrivere:

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo{
        -numeroRuote
        -numeroTarga
        -numeroPorte
        +compra()
    }
```

Ma anche:

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo
    Veicolo:-numeroRuote
    Veicolo:-numeroTarga
    Veicolo:-numeroPorte
    Veicolo:+compra()
```

Mermaid in modo autonomo capisce se una riga rappresenta una variabile o un metodo, in base alla presenza di parentesi tonde (che rappresentano i parametri del metodo).

Per mettere un tipo alle variabili metterlo dopo due punti alla fine del nome delle variabile. Invece per il tipo di ritorno ad un metodo basta scriverlo dopo le parentesi tonde (i due punti vengono aggiunti da Mermaid in autonomia):

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo{
        -numeroRuote: int
        -numeroTarga: string
        -numeroPorte: int
        +compra()
        +owner()String
    }
```

### Interface e Abstract

Per inserire le tipologie di classi basta inserire una riga all'interno del metodo con le parentesi angolate. Per l'interfaccia Veicolo:

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo{
        <<Interface>>
        +numeroRuote()
        +compra()
    }
```

Per creare la classe astratta, nativamente non è possibile *farlo con il nome in corsivo*, quindi bisognerà adattarsi a scriverlo come annotazione:

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo{
        <<Abstract>>
        +numeroRuote()
        +compra()
    }
```

Esiste però un *workaround* interessante, ovvero quello di sfruttare HTML per questa modifica, staccando identificatore e label della classe:

```yaml
---
title: Concessionaria
---

classDiagram
	class Veicolo["<em>Veicolo</em>"] {
        <<Abstract>>
        +numeroRuote()
        +compra()
    }
```

### Generic Types

Nella programmazione ad oggetti i "*tipi generici*" sono uno dei fulcri della programmazione ad alto livello più utilizzati da linguaggi come Java e permettono di creare collezioni di oggetti che hanno un vincolo legato al tipo che viene però risolto nel momento dell'utilizzo e non nella struttura stessa della collezione.

Questo concetto in mermaid si può indicare con il carattere `~`:

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo {
        List~Ruota~ ruote;
    }
```

## Relazioni

Le relazioni tra classi sono varie e si possono esprimere attraverso delle "frecce" disegnate con i caratteri `-` o `.`.

In mermaid:

- `-->` Associazione: la freccia che indica che tra due classi vi è un associazione, un inclusione o comunque una relazione generica
- `<|--` Estensione o generalizzazione: indica l'ereditarietà o l'implementazione.
- `..|>` realizzazione: indica anche una tipologia di implementazione
- `*--` Composizione: la composizione è un relazione "debole" e serve per indicare che una classe può essere composta da una o più istanze di un altra
- `o--` Aggregazione, ovvero una composizione forte: quando togli un istanza di un aggregazione distruggi la struttura stessa della classe
- `..>` Dipendenza: ovvero una classe dipende, anche solo temporaneamente, da un altra classe
- `..` Linea tratteggiata semplice: ottima per collegare note o altro.
- `--` Linea continua semplice: ottima per collegare note o altro.

### Etichetta
In alcune frecce può essere utile aggiungere etichette.  
Per aggiungerla basta scrivere dopo la relazione e il simbolo `:` un etichetta

Ecco un esempio: 

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo
    class Macchina
    Macchina --|> Veicolo: se ha 4 ruote
```

### Cardinalità

La cardinalità indica da quante istanze una classe dipende da un altra. La dipendenza può essere di vari tipi (composizione, aggregazione, etc...) ma il significato della cardinalità resta invariato. Per implementarla scrivere il numero da una parte ad un altra della freccia tra virgolette doppie `"`:

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo
    class Ruote
    Veicolo --*"2..4" Ruote
```

### Esempio completo 

Ecco un esempio completo:

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo{
        <<interface>>
        +nruote()int
    }
    class Ruote
    class Sensori
    class Moto{
        +nruote()int
    }
    class Macchina{
        +nruote()int=4
    }

    Veicolo --*"2..4" Ruote
    Veicolo --o"2..4" Sensori
    Moto --|> Veicolo: se ha due o tre ruote
    Macchina --|> Veicolo: se ha 4 ruote
```


## Sistemi

I sistemi son raggruppamenti che permettono di identificare delle classi che hanno delle caratteristiche in comune o fanno parte di sistemi diversi.

In MermaidJS è possibile creare dei "namespace" per rappresentarli:

```yaml
---
title: Concessionaria
---
classDiagram
    namespace  VeicoliABenzina {
        class Moto{
            +nruote()int
        }
        class Macchina{
            +nruote()int=4
        }
    }
    namespace  MezziAnalogici {
        class Bici{
            +nruote()int=2
        }
    }
	class Veicolo{
        <<interface>>
        +nruote()int
    }

    Bici --|> Veicolo
    Moto --|> Veicolo
    Macchina --|> Veicolo
    
```

## Le note

dulcis in fundus, ecco la gestione delle note: basta infatti inserire la parolina `note` e scrivere delle note tra virgolette doppie `"` per visualizzarle. Inoltre scrivendo dopo `note` `for NOMECLASSE` verrà collegato ad una specifica classe

```yaml
---
title: Concessionaria
---
classDiagram
	class Veicolo{
        <<interface>>
        +nruote()int
    }
    class Moto{
        +nruote()int
    }
    class Macchina{
        +nruote()int=4
    }

    Moto --|> Veicolo: se ha due o tre ruote
    Macchina --|> Veicolo: se ha 4 ruote

    note "Il seguente grafico mostra la gestione\ndei mezzi per veicoli a benzina"

    note for Moto "Si esistono moto a tre ruote..."
```
