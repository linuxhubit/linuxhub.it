---
class: post
title: '#howto - Utilizzare Prettier su VSCode' 
date: 2023-03-10 08:00
layout: post 
author: Floppy
author_github: raspFloppy
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
tags: 
- json
- vscode
---

Capita a volte, quando si programma, di dover riordinare visivamente il proprio codice, indentando in modo adeguato e comunque di seguire alcune convenzioni per mantenere un codice pulito.

Fare questo lavoro a mano non é di certo divertente, soprattutto quando le linee di codice superano le migliaia, in nostro aiuto arriva un tool molto comodo, **Prettier**.

## Cos'è Prettier

Prettier è un code formatter, ovvero un tool che formatta il codice in maniera automatica, la sua peculiarità consiste nell'essere personalizzabile da un file **JSON**.  
È compatibile con molti editor e in questa guida vedremo come utilizzarlo su Visual Studio Code.


## Installazione di Prettier su VSCode

Prima di tutto dobbiamo installare l'estensione, per farlo andiamo su **Extensions** (Oppure `Ctrl+Shift+X`) e digitiamo `Prettier` nella barra di ricerca, selezionamo il primo risultato e andiamo ad installarlo. Il codice id dell'estensione è `esbenp.prettier-vscode`.

![](https://esbenp.gallerycdn.vsassets.io/extensions/esbenp/prettier-vscode/9.10.4/1673460374911/Microsoft.VisualStudio.Services.Icons.Default)

A questo punto dobbiamo modificare alcune impostazioni di Visual Studio Code, andremo infatti ad abilitare la formattazione ad ogni salvataggio di un file, per farlo andiamo in: `File`>`Preferenze`>`Impostazioni` (Oppure `Ctrl+,` ) e digitiamo `format` nella barra di ricerca, selezioniamo` Format: On Save` e settiamo il valore a `true`.

Dopodichè sempre nelle `Impostazioni` andiamo a cercare `Default Formatter` e impostiamo `Prettier` come opzione.

A questo punto siamo pronti per partire.

## Configurazione di Prettier

Ora apriamo un qualsiasi nostro progetto e creiamo un file **JSON** chiamato `.prettierrc` nella root del progetto, qui e dove andremo a mettere la nostra configurazione di prettier.

> NOTA:
>
> Prettier può essere in anche scritto in altri formati come `YAML` e `TOML`.

Tutte le opzioni verranno indicate come singolo valore in un json, ma si possono usare insieme concatenandole con delle virgole uno con l'altro: 

```json
{
    etichetta1:"valore1",   
    etichetta2:valore2,
    etichetta3:"valore3"
}
```

### Spazi tab

Perfetto partiamo con qualche configurazione base, i tab di indentazione, per i tab abbiamo l'opzione `tabWidth` che ci permette di indentare il nostro codice con tab di 2/4/8 spazi, impostiamolo per esempio a 4:

```json
{
    "tabWidth": 4
}
```

Adesso salviamo i nostri file sorgenti vedremo che in automatico verranno indentati di 4 tab.


### Virgolette singole o doppie 

Se usiamo linguaggi come `Javascript` e `Python` non c'è differenza tra doppi apici e singoli apici e potrebbe capitare di usare un pò uno e un pò un'altro rendendo il codice poco carino risolviamo questo con l'opzione:

```json
{
    "singleQuote": true
}
```
Se vogliamo usare i singoli apici, altrimenti lasciamo il valore a `false`.

### Punto e virgola

Ancora ci sono linguaggi che non richiedono il punto e virgola alla fine di ogni riga, ma per abitudine potrebbe capitare di metterli, per questo esiste l'opzione:
```json
{
    "semi": true
}
```
Se vogliamo usare i punti e virgola, altrimenti lasciamo il valore a `false`.

### Altro 

Ci sono molte altre impostazioni che possono essere settate, come lo spazio tra le parentesi, la lunghezza massima di una riga, la lunghezza massima di una riga di commento, ecc. ecc. per una lista completa delle opzioni andate su [questo link](https://prettier.io/docs/en/options.html).


