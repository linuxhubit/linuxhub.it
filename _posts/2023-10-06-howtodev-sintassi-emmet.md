---
class: post
title: '#howtodev - Sintassi EMMET parte 1 : elementi HTML' 
date: 2023-09-06 08:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub.it
coauthor_github: linuxhubit
published: false
tags: 
- css
- html
- emmet
- ide
---

Spesso la scrittura di pagine o template HTML è inutile, ripetitiva e ci si perde tra i mille tag e le indentazioni. Per scrivere rapidamente tag innestati, concatenati già completi di body, id e classi è stata creata la sintassi [EMMET](https://emmet.io)

In questo articolo si vedrà cos'è EMMET e come creare elementi facilmente con i loro attributi, se necessari.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Utilizzo della sintassi **base** per EMMET

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura dei seguenti e dei precedenti articoli:

- HTML
- CSS

## Cos'è

Emmet, anche  chiamato Zen Coding, è un toolkit che mira a semplificare lo sviluppo web tramite una serie di abbreviazioni che creano interi blocchi di codice HTML con poche lettere.

Lo sviluppo del plugin si può trovare su [Github](https://github.com/emmetio/emmet), e comprende dei moduli Javascript che semplificano poi la creazione del plugin da sviluppare per il proprio editor. Tuttavia, in questo articolo, non ne verrà spiegato l'uso come toolkit, ma solo la sintassi.

### JSX Support

Farà piacere sapere, a chi sviluppa in ReactJS, che EMMET supporta anche la sintassi JSX.

### Compatibilità

Il supporto alle abbreviazioni EMMET non è una caratteristica base di tutti gli IDE o comunque gli editor di testo. Alcuni degli editor più famosi, come Visual Studio Code o i prodotti della JetBrains, supportano pienamente la sintassi EMMET.

Per gli altri potrebbe essere necessario un plugin, [in questa pagina](https://emmet.io/download/) se ne possono trovare alcuni.

Quello che resta capire è *come si attiva* poi l'autocompletamento, infatti questo **può variare da editor in editor**, ad esempio con *Visual Studio Code* basta premere `CTRL + Spazio` e quindi selezionare nel menu a comparsa l'autocompletamento emmet.

### Attenzione agli spazi

Lo spazio funziona da "*terminatore*" per la sintassi emmet, quindi a meno che non sia esplicitamente consentito in qualche particolare caso, meglio evitare gli spazi durante l'uso delle abbreviazioni.

## Scrivere un tag

Per scrivere un tag basta semplicemente scriverne il nome, senza alcuna parentesi angolata. L'esempio più banale è quello del tag div, scrivendo:

```html
div
```

Tramite sintassi EMMET si autocompleterà come:

```html
<div></div>
```

Alcuni elementi HTML ricevono anche un ulteriore abbreviazione, Eccone alcuni:

- `btn` si trasforma nel tag `button`
- `bq` si trasforma nel tag `blockquote`
- `pic` si trasforma nel tag `picture`
- `ifr` si trasforma nel tag `iframe`
- etc...

Ovviamente è possibile comunque scriverli per intero, funzioneranno comunque.

### Intestazioni

È possibile generare l'intestazione HTML per intero. Scrivendo solo: 

```html
doc
```

oppure:

```html
!
```

Si ottiene:

```html
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
```

### Commenti

Si può generare un tag commento con l'abbreviazione: 

```html
c
```

Il risultato sarà:

```html
<!--  -->
```

È possibile anche generare alcuni **commenti condizionali**, ovvero dei commenti che son generati appositamente per controllare le versioni di Microsoft Internet Explorer (e di Microsoft). Ad esempio si può verificare di essere su IE scrivendo:

```html
cc:ie
```

Verrà generato questo codice:

```html
<!--[if IE]><![endif]-->
```

Al contrario:

```html
cc:noie
```

genererà:

```html
<!--[if !IE]><!--><!--<![endif]-->
```

### Lorem

Spesso facendo siti demo è comodo richiamare un testo lungo e standard. L'esempio per eccellenza in genere è il *lorem ipsum*. Per generarlo facilmente con emmet basta scrivere:

```html
lorem
```

Verrà generato:

```html
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam explicabo, recusandae debitis cumque sed ab harum quisquam odio, aut itaque repellat amet consectetur aliquid eum tenetur cum magnam et repellendus!
```

## Attributi

Alcuni possiedono degli attributi necessari alla loro configurazione. Questo si può fare scrivendo dopo il carattere `:` alcune parole chiave (spesso coincidenti con il valore degli attributi). Elencandone qualcuno:

- È possibile configurare l'attributo `type` del tag `input` scrivendo il suo valore dopo i `:`, ad esempio `input:email` creerà:

```html
<input type="email" name="" id="" />
```

- I parametri `rel` e `href` di link scrivendo `link:css`, la shortcut produrrà:

```html
<link rel="stylesheet" href="style.css" />
```

- il tag meta per configurare il charset a utf con `meta:utf`:

```html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
```

- Il `type` di un button scrivendo `button:submit` o `button:reset` (attenzione, **non si può usare** la sintassi accorciata `btn` in questo caso) oppure se lo si vuole disabilitato con `button:disabled`. In tal caso la shortcut si espande in:

```html
button:disabled
```

- e tanto altro...

## Tag e ID

Gli ID sono indispensabili per selezionare tramite Javascript degli elementi e quindi poterli manipolare tramite script, oltre che per lo styling. Per accoppiare velocemente degli id basta scriverli dopo il nome del tag e dopo un carattere `#`. Ad esempio:

```html
btn#conferma
```

Si trasforma in

```html
<button id="conferma"></button>
```

## Tag e classi

Le classi son utili ad applicare lo styling ad una serie di elementi che hanno qualcosa in comune. Per utilizzare le classi con EMMET basta scrivere il nome della classe dopo un tag, preceduta da un punto. Ad esempio:

```html
div.container
```

Si trasforma in

```html
<div class="container"></div>
```

### Concatenare più classi

A differenza dell'id, si possono avere per un singolo tag più classi. Per specificare più classi tramite abbreviazione basta scrivere, dopo il nome di una classe, un punto quindi un nuovo nome di classe. Ad esempio:

```html
div.col-4.offset-2
```

Si espande in :

```html
<div class="col-4 offset-2"></div>
```

## Tag vuoto

Se non si specifica alcun tag ma si applicano lo stesso le regole di cui sopra, automaticamente verrà creato un tag `div`. Ad esempio scrivendo:

```html
.col-4.offset-2#colonna1
```

Si ottiene:

```html
<div class="col-4 offset-2" id="colonna1"></div>
```

Nel taso però siano tag vuoti *di una tabella* vanno a generare `tr` e `td`. Scrivendo:

```html
table>.riga>.dato
```

Si espande in: 

```html
<table>
	<tr class="riga">
		<td class="dato"></td>
	</tr>
</table>
```

La stessa cosa accade con `ul` (che espande i tag vuoti al suo interno con `li`) ed `em` che al suo interno crea degli `span`.

## Attributi custom

Si può specificare qualsiasi tipo di attributo utilizzando la parentesi quadra dopo un tag. Ad esempio per specificare il colore blu del testo come attributo style di un div si può usare:

```html
div[style="color:blue"]
```

Il risultato sarà:

```html
<div style="color:blue"></div>
```

Questo è uno dei pochi casi in cui è consentito usare il carattere *spazio*, infatti si possono specificare **più attributi** separandoli tra di loro tramite spazio. Ad esempio per impostare sia lo *stile* che il testo *alternativo* di un'immagine si può scrivere:

```html
img[alt="quest'immagine contiene un cobra" style="border-radius: 8px"]
```

Il risultato sarà:

```html
<img src="" alt="quest'immagine contiene un cobra" style="border-radius: 8px">
```

## Tag e body

È eventualmente possibile impostare anche il contenuto (testuale) di un body di un elemento tramite sintassi abbreviata. Utilizzando le parentesi graffe (`{` e `}`). Ad esempio:

```html
p{blocco di testo o paragrafo}
```

Diventa:

```html
<p>blocco di testo o paragrafo</p>
```
