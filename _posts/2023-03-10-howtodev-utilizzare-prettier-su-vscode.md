---
class: post
title: '#howtodev - Utilizzare Prettier su VSCode' 
date: 2023-03-10 
layout: post 
author: Floppy
author_github: raspFloppy
coauthor: 
coauthor_github: 
published: false
tags: 
- json
- vscode
---

Capita a volte, quando si programma, di dover rimettere in ordine il proprio codice, indentando in modo adeguato e comunque di seguire alcune linee guide non scritte per mantenere un codice pulito.
Fare questo lavoro a mano non é di certo divertente, soprattutto quando le linee di codice superano le migliaia, in nostro aiuto arriva un tool molto comodo, Prettier.

## Cos'è Prettier

Prettier è un code formatter, ovvero un tool che formatta il codice in maniera automatica, la peculiarità di Prettier è che è personalizzabile da un file `JSON`.

Prettier è compatibile con molti editor e in questa guida vedremo come utilizzarso su Visual Studio Code.


## Installazione di Prettier su VSCode

Prima di tutto dobbiamo installare l'estensione di Prettier, per farlo andiamo su `Extensions` (Oppure `Ctrl+Shift+X`) e digitiamo `Prettier` nella barra di ricerca, selezionamo il primo risultato e andiamo ad installarlo.

A questo punto dobbiamo modificare alcune impostazioni di Visual Studio Code, andremo infatti ad abilitare la formattazione ad ogni salvataggio di un file, per farlo andiamo in: `File`>`Preferenze`>`Impostazioni` (Oppure `Ctrl+) e digitiamo `format` nella barra di ricerca, selezioniamo `Format: On Save` e settiamo il valore a `true`.

Dopodichè sempre nelle `Impostazioni` andiamo a cercare `Default Formatter` e impostiamo `Prettier` come opzione.

A questo punto siamo pronti per partire.


## Configurazione di Prettier

Ora apriamo un qualsiasi nostro progetto e creiamo un file `JSON` chiamato `.prettierrc` nella root del progetto, qui e dove andremo a mettere la nostra configurazione di prettier.

> NOTA
>
> Prettier può essere in anche scritto in altri formati come `YAML` e `TOML`.


Perfetto partiamo con qualche configurazione base, i tab di indentazione, per i tab abbiamo l'opzione `tabWidth` che ci permette di indentare il nostro codice con tab di 2/4/8 spazi, impostiamolo per esempio a 4:
```json
{
    "tabWidth": 4
}
```

Adesso salviamo i nostri file sorgenti vedremo che in automatico verranno indentati di 4 tab.

Se usiamo linguaggi come `Javascript` e `Python` non c'è differenza tra doppi apici e singoli apici e potrebbe capitare di usare un pò uno e un pò un'altro rendendo il codice poco carino risolviamo questo con l'opzione:
```json
{
    //"tabWidth": 4,
    "singleQuote": true
}
```
Se vogliamo usare i singoli apici, altrimenti lasciamo il valore a `false`.

Ancora ci sono linguaggi che non richiedono il punto e virgola alla fine di ogni riga, ma per abitudine potrebbe capitare di metterli, per questo esiste l'opzione:
```json
{
    //"tabWidth": 4,
    //"singleQuote": true,
    "semi": true
}
```
Se vogliamo usare i punti e virgola, altrimenti lasciamo il valore a `false`.


Ci sono molte altre impostazioni che possono essere settate, come lo spazio tra le parentesi, la lunghezza massima di una riga, la lunghezza massima di una riga di commento, ecc. ecc. per una lista completa delle opzioni andate su [questo link](https://prettier.io/docs/en/options.html).


