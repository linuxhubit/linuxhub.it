---
class: post
title: "#howtodev - Diagrammi con mermaidjs - Introduzione"
date: 2024-09-29 07:00
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

MermaidJS è una libreria Javascript per la creazione di diagrammi tramite linguaggio di formattazione. È integrato in alcuni software ed è facile da utilizzare.

Ecco una guida sull'utilizzo base.

## Definizione

MermaidJS consente di creare, tramite un linguaggio di markup, grafici di diverso tipo: UML, di MANAGMENT, flowchart etc...

Essendo un approccio di tipo `WYSIWYM` (Ovvero *What you see is what you mean*) consente facilmente di ottenere risultati ottimali senza quella frustazione tipica dei software GUI in cui si passa il tempo a spostare archi e riquadri fino ad ottenere soluzioni soddisfacenti.

## Obiettivi

L'articolo affronterà i seguenti argomenti:

- Installazione di mermaidJS
- Uso base
- Tipologia di diagrammi
- Flow Chart

## Prerequisiti

All'interno dell'articolo si troveranno riferimenti a `NPM`, sarebbe quindi meglio conoscere lo strumento prima di continuare l'articolo.

## Installazione

Esistono vari modi di utilizzare mermaidJS. Il più comune è sicuramente quello di utilizzarlo tramite la comoda [interfaccia web ufficiale](https://mermaid.live) che consente anche di vedere le modifiche in tempo reale.

Esistono anche alcuni editor GUI come [Typora](https://linuxhub.it/articles/howto-installare-personalizzare-ed-usare-typora/) che lo includono come funzionalità aggiuntiva.

Ma essendo una libreria Javascript può essere utilizzato anche attraverso codice o con un client dedicato.

### Installare mermaid-cli

Il modo migliore per interagire in locale con mermaid è proprio quello di usare il client. Per installarlo utilizzare npm:

```bash
npm install --global mermaid.cli
```

### Utilizzo mermaid.cli

Va poi utilizzato tramite la linea di comando. Per generare un diagramma basta scrivere:

```bash
mmdc -i nomefileinput -o nomefileoutput.png 
```

Dove `nomefileinput` è il codice sorgente scritto con il markup di mermaidjs, `nomefileoutput` è il nome dell'immagine dove finirà il grafico.

Ci sono anche diverse opzioni molto utili, ad esempio i temi :

```bash
-t <theme>
```

I temi sono *default*, *forest*, *dark* e *neutral*

O semplicemente il colore del background

```bash
-b <colore>
```

il colore potete scriverlo in esadecimale con # prima oppure in inglese come se fosse un foglio di stile.

Si possono impostare impostare larghezza ed altezza dell'output così:

```bash
-w <width>
-H <height>
```

Facendo un esempio completo, per creare un grafico con background nero, tema dark, dimensione 400x400 il comando sarà:

```bash
mmdc -b '#000000' -t dark -w 400 -H 400 -i nomefileinput -o nomefileoutput.png
```

## Tipologie di diagrammi

Mermaid supporta tantissimi tipi di diagrammi, ed essendo ancora pienamente supportato e aggiornato, aumentano ogni anno.

Quelli supportati dal framework al momento sono:

- Flowchart
- Sequence Diagram
- Class Diagram
- State Diagram
- Entity Relationship Diagram
- User Journey
- Gantt
- Pie Chart
- Quadrant Chart
- Requirement Diagram
- Gitgraph (Git) Diagram
- C4 Diagram
- Mindmaps
- Timeline
- ZenUM
- Sankey
- XY Chart
- Block Diagram
- Packet
- Architecture

Maggiori dettagli [nella documentazione ufficiale](https://mermaid.js.org/intro/).

Non tutti i grafici son supportati dai client che utilizzano il framework, consultare quindi le documentazioni dei vari progetti per avere dettagli della versione supportata.

### Sintassi base

Generalmente tutti i diagrammi son introdotti dal nome sulla prima riga, a seguire ogni altra riga, con un livello di indentazione in più.

## Flow Chart

Uno dei tipi più comuni e semplici di diagrammi: può rappresentare un flusso di istruzioni, di idee, la descrizione di algoritmo etc...

Un flowchart è introdotto su mermaid da:

```yaml
flowchart LR
```

`LR` rappresenta la direzione del grafico (ovvero **left to right** in questo caso), può essere sostituito da `TB`.
Ogni combinazione di lettere (`BT` e `RL`). A seguire si possono effettuare i vari collegamenti tra i box.

 Per creare un box basta scriverne il nome: 

```yaml
flowchart LR
	A
```

Per assegnare un nome diverso dall'etichetta basta scriverne il nome tra parentesi quadre:

```yaml
flowchart LR
    A[Un box qualunque]
```

Per creare un collegamento tra due box, collegarli con una freccia: `-->`

```yaml
flowchart LR
    A[Un box qualunque] --> B
```

Continuando si possono creare vere e proprie catene: 

```yaml
flowchart LR
    A[Un box qualunque] --> B
	B-->C
	C-->D
	C-->A
	F-->B
```

Il risultato sarà
[![](https://mermaid.ink/img/pako:eNo1kD1vgzAQhv-KdTNBYINteaiUD2VKl1ZdWne4YNMggZ1QW02K-O81qXLTc6fn3uGdoPHGgoK29z_NCcdADi_akTTrjzdHjv5KLhH76C7RfpLV6olstNNhk2i7wDbB7gHrBfYJkgMZDHYcsDMpfVoiNYSTHawGldDYFmMfNGg3JxVj8K8314AKY7QZxLPBYHcdfo04gGqx_07XM7p374eHlFZQE1xBMclzIUpRVpLKWvIMbqBKVudMFrSqSi4ErymfM_i9_xc5LyRnjHMuGK1qWmZgTRf8-Pxfx72V-Q9oUFaD?type=png)](https://mermaid.live/edit#pako:eNo1kD1vgzAQhv-KdTNBYINteaiUD2VKl1ZdWne4YNMggZ1QW02K-O81qXLTc6fn3uGdoPHGgoK29z_NCcdADi_akTTrjzdHjv5KLhH76C7RfpLV6olstNNhk2i7wDbB7gHrBfYJkgMZDHYcsDMpfVoiNYSTHawGldDYFmMfNGg3JxVj8K8314AKY7QZxLPBYHcdfo04gGqx_07XM7p374eHlFZQE1xBMclzIUpRVpLKWvIMbqBKVudMFrSqSi4ErymfM_i9_xc5LyRnjHMuGK1qWmZgTRf8-Pxfx72V-Q9oUFaD)

Se manca lo spazio verticale (nel caso di diagrammi LR e RL) automaticamente i box vengono disposti su seconda riga.

### Altre forme

Un diagramma di flusso può essere fatto da diversi blocchi con diverse forme. Ognuna delle quali ha differenti significati (blocco condizionale, blocco sorgente dati, input/output etc...).

Per disegnare tramite mermaid altre forme basta scrivere, dopo l'identificativo, il simbolo che lo rappresenta.

### Attività semplice

Per un blocco *attività semplice* (*rettangolare*), come si è già visto si utilizzano le parentesi quadre `[]`, ma anche semplicemente scrivendo il nome, se non contiene caratteri particolari o spazi, per impostazioni predefinita diventa un blocco rettangolare:

```yaml
flowchart TB
    A["blocco attività"]
	SecondoBlocco
```

#### Blocco di partenza/fine

I blocchi *rettangolari con gli angoli arrotondati* utilizzati in genere all'inizio e alla fine del flusso, in mermaid si utilizzano le parentesi tonde `()` per identificarlo

```yaml
flowchart TB
    A("blocco fine/inizio")
```

#### Blocco delle decisioni

Per diramare una decisione si può utilizzare un blocco a forma di *rombo*, tramite le parentesi graffe `{}`:

```yaml
flowchart TB
    A{"blocco decisionale"}
```

#### Blocco input/output

I blocchi che identificano l'ingresso di una variabile o l'uscita possono essere identificati da *parallelogramma*, che nel framework son identificati da parentesi quadre e caratteri slash inversi, al cui interno va poi messo il testo del blocco `[\ \]`:

```yaml
flowchart TB
    A[\variabile input o output\]
```

Si può anche invertire la direzione del parallelepipedo utilizzando il carattere slash normale `[/ /]`

```yaml
flowchart TB
    A[/variabile input o output/]
```

#### Database

Per indicare una sorgente dati si usa un icona cilindrica, che rappresenta appunto il database.  
Allo scopo, scrivere il testo tra parentesi quadre e poi tonde `[()]`

```yaml
flowchart LR
    id1[(Database)]
```

#### Altre forme

Mermaid supporta moltre altre forme, come il cerchio, trapezzoidi e altro: maggiori informazioni sulla [documentazione ufficiale](https://mermaid.js.org/syntax/flowchart.html)

### Testo nel collegamento

Si può inserire un testo nella freccia che collega un box ad un altro, per farlo scrivere del testo tra due segni `-` e altri due: 

```yaml
flowchart TB
    A --"testo collegamento"-->B
```

### Sotto-grafico

Si può racchiudere una porzione di diagramma a parte, un vero e proprio sotto-diagramma, che può avere una direzione diversa ad esempio, un nome a se stante ed essere collegato ad altri.

Per crearlo scrivere `subgraph NOME` e su nuova linea scrivere i collegamenti, terminare con `end`:

```yaml
flowchart LR
	subgraph sottoD1
		A-->B
	end
	C-->sottoD1
	D-->A
```

Per cambiare direzione nel sottografico la prima istruzione deve essere `direction` seguita dalla direzione: 

```yaml
flowchart LR
	subgraph sottoD1
        direction TB
		A
        B
        A-->B
	end
	C-->sottoD1
```

> NOTA BENE:
>
> Ricordarsi che comunque mermaid aggiusta la direzione e la posizione dei blocchi per ottimizzarli, quindi il sottografo potrebbe anche seguire una direzione diversa

### Cambio di stile

Si può sistemare lo stile e aggiungere classi utilizzando la parola chiave `style` seguito dallo stile: purtroppo non è uno stile nella sintassi standard di css:

- `fill` rappresenta il colore di sfondo.
- `stroke` rappresenta il colore della freccia.
- `color` rappresenta il colore nel testo.
- `stroke-dasharray` serve a creare un bordo frastagliato, prende in ingresso due o più numeri, il primo indica la lunghezza del segmento il secondo la distanza tra un segmento ed un altro, se si continua con altri numeri si possono indicare lunghezze diverse.
- `stroke-width` indica quanto ogni segmento è spesso.

Ecco un esempio: 

```yaml
flowchart LR
	A-->B
    C-->B
    D-->A
    style A fill:#000,color:#FFF
    style C fill:#FFF,stroke:#F00
    style B stroke-dasharray: 3 5
```

[![](https://mermaid.ink/img/pako:eNpNkMFOhDAQhl-lmb0WUii0TQ8m7G446UVvppcGikssdFNKFAnvbl007py-mfn-ZDIrNK41IKGz7qO5aB_Q47MaVaiS5OGoRhTr9I_niNWOU1isQRXqemvlgRCCG2edl4e6ru-N068Rx3gK3r2byITcK0e0L5JWT_EErxeJKCoBw2D8oPs23rf-BBSEixmMAhmxNZ2ebVCgxi2qeg7uZRkbkMHPBsN8bXUw516_eT2A7LSd4vSqx1fnhj8ptiBX-ARJBUs5z3hWiFyUgmFYQGa0TKkgeVFkjHNW5mzD8HXLk5QRwShllBd5jFCOwbR9cP5pf-jtr9s3aJxo4g?type=png)](https://mermaid.live/edit#pako:eNpNkMFOhDAQhl-lmb0WUii0TQ8m7G446UVvppcGikssdFNKFAnvbl007py-mfn-ZDIrNK41IKGz7qO5aB_Q47MaVaiS5OGoRhTr9I_niNWOU1isQRXqemvlgRCCG2edl4e6ru-N068Rx3gK3r2byITcK0e0L5JWT_EErxeJKCoBw2D8oPs23rf-BBSEixmMAhmxNZ2ebVCgxi2qeg7uZRkbkMHPBsN8bXUw516_eT2A7LSd4vSqx1fnhj8ptiBX-ARJBUs5z3hWiFyUgmFYQGa0TKkgeVFkjHNW5mzD8HXLk5QRwShllBd5jFCOwbR9cP5pf-jtr9s3aJxo4g)

Si può inserire anche una classe. Dopo un identificativo di blocco inserire tre volte i due punti `:::` e quindi il nome della classe, si può quindi definire dopo la classe scrivendo `classDef nomeclasse style`

Ecco un esempio:

```yaml
flowchart LR
	A:::verde-->B
    C-->B
    D-->A
    classDef verde fill:#0F0, color:#666, stroke: #666
```
