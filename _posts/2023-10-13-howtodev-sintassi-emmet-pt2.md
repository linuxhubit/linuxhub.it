---
class: post
title: '#howtodev - Sintassi EMMET parte 2 : più elementi HTML' 
date: 2023-10-13 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags: 
- css
- html
- emmet
- ide
---


[Articolo precedente: elementi HTML &larr;](https://linuxhub.it/articles/howtodev-sintassi-emmet/)  



Spesso la scrittura di pagine o template HTML è inutile, ripetitiva e ci si perde tra i mille tag e le indentazioni. Per scrivere rapidamente tag innestati, concatenati già completi di body, id e classi è stata creata la sintassi [EMMET](https://emmet.io).

In questo articolo si vedrà come concatenare, innestare e legare più elementi.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Utilizzo della sintassi EMMET

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura dell'articolo precendente:

- [#howtodev - Sintassi EMMET parte 1 : elementi HTML](https://linuxhub.it/articles/howtodev-sintassi-emmet/)

Inoltre è necessaria la conoscenza di

- HTML

## Moltiplicare un tag

Tramite l'uso del carattere `*` si può "moltiplicare" un tag. 

Ovvero creare più ripetizioni dello stesso elemento.

Ad esempio scrivendo:

```html
br*3
```

Il plugin sostituirà il seguente codice:

```html
<br><br><br>
```

## Concatenare più tag

Si possono mettere più tag uno dopo l'altro senza innestarli usando il carattere `+`. 

Ad esempio, scrivendo: 

```html
br+img+br
```

Si ottiene:

```html
<br><img src="" alt=""><br>
```

## Innestare più tag

Innestare componenti tra di loro è di certo la cosa più importante di HTML, in quanto la struttura dell'intera pagina non è solo lineare, ma è fatta di contenitori su contenitori.

Per innestare gli elementi tramite EMMET si usa il carattere `>`. 

Ad esempio scrivendo: 

```html
ul>li
```

Si ottiene:

```html
<ul>
	<li></li>
</ul>
```

## Risalire un tag

Al contrario, si può "risalire" attraverso i tag utilizzando il carattere `^`.

Ovviamente per poter "risalire" è necessario che prima si sia "sceso" all'interno di un altro componente, per cui questa shortcut ha senso solo se usata dopo aver aver innestato alcuni elementi tra di loro.

Si veda meglio con un esempio:

```html
ui>li>p{primo punto}^li>p{secondo punto}
```

Si espande in (si ricordi che tra `{` e `}` si espande il body):

```html
<ui>
	<li>
		<p>primo punto</p>
	</li>
	<li>
		<p>secondo punto</p>
	</li>
</ui>
```

Ovvero con il carattere `^` si è risalito l'interno del primo `li` incontrato e si è potuto così formare, sullo stesso livello, il secondo `li`.

### Usare ^ senza avere una struttura innestata

Il caso in cui si utilizza il carattere `^` senza avere una struttura innestata prima degenera nella concatenazione. Ovvero: 

```html
br^img^br
```

Si espande in:

```html
<br><img src="" alt=""><br>
```

Così come:

```html
br+img+br
```

## Raggruppare le shortcut

Si possono raggruppare le shortcut. Questo può servire ad applicare un ulteriore shortcut ma su un gruppo e non un solo elemento. 

Ad esempio si può applicare la moltiplicazione di un gruppo di elementi che possono poi essere innestati o concatenati. 

Scrivendo infatti: 

```html
ul>(li>p{punto della lista}+img)*4
```

Si espande in:

```html
<ul>
	<li>
		<p>punto della lista</p>
		<img src="" alt="">
	</li>
	<li>
		<p>punto della lista</p>
		<img src="" alt="">
	</li>
	<li>
		<p>punto della lista</p>
		<img src="" alt="">
	</li>
	<li>
		<p>punto della lista</p>
		<img src="" alt="">
	</li>
</ul>
```

## La numerazione

A volte potrebbe essere necessario autogenerare degli elementi in serie che però siano numerati a loro volta. 

Utilizzando il carattere `$` questo sarà sostituito con il numero ordinale corrispondente all'elemento.

Prendendo l'esempio precedente potrebbe essere necessario scrivere il numero del punto della lista; scrivendo: 

```html
ul>(li>p{punto n.$ della lista}+img)*4
```

Si espanderà in:

```html
<ul>
	<li>
		<p>punto n.1 della lista</p>
		<img src="" alt="">
	</li>
	<li>
		<p>punto n.2 della lista</p>
		<img src="" alt="">
	</li>
	<li>
		<p>punto n.3 della lista</p>
		<img src="" alt="">
	</li>
	<li>
		<p>punto n.4 della lista</p>
		<img src="" alt="">
	</li>
</ul>
```

Ovviamente funziona anche utilizzato in attributi, id o nomi di classe. 

Inoltre Si possono utilizzare più `$` per creare padding di zeri. Ad esempio:

```html
p#p$$*10
```

Si estenderà in:

```html
<p id="p01"></p>
<p id="p02"></p>
<p id="p03"></p>
<p id="p04"></p>
<p id="p05"></p>
<p id="p06"></p>
<p id="p07"></p>
<p id="p08"></p>
<p id="p09"></p>
<p id="p10"></p>
```

### Ordine inverso

Per ottenere l'ordine inverso basta aggiungere `@-` dopo il carattere `$`. 

Riproponendo l'ultimo esempio:

```html
p#p$$@-*10
```

Si estenderà in:

```html
<p id="p10"></p>
<p id="p09"></p>
<p id="p08"></p>
<p id="p07"></p>
<p id="p06"></p>
<p id="p05"></p>
<p id="p04"></p>
<p id="p03"></p>
<p id="p02"></p>
<p id="p01"></p>
```

## Alcuni esempi completi

Volendo un po' racchiudere quello che è stato descritto in questi due articoli, vi proponiamo degli esempi completi.

### Bootstrap grid

Si può creare la struttura completa per un grid layout di bootstrap scrivendo semplicemente `.container-fluid>.row>.col`, supponendo di voler creare ad esempio 5 colonne, di cui la prima deve contenere la navbar e l'ultima un div di classe footer si può scrivere: 

```html
.container-fluid>.row>.col-12>nav{NAVBAR}^col-12{riga n.$}*3+col-12>.footer{Questo è il FOOTER}
```

Il risultato sarà: 

```html
<div class="container-fluid">
	<div class="row">
		<div class="col-12">
			<nav>NAVBAR</nav>
		</div>
		<col-12>riga n.1</col-12>
		<col-12>riga n.2</col-12>
		<col-12>riga n.3</col-12>
		<col-12>
			<div class="footer">Questo è il FOOTER</div>
		</col-12>
	</div>
</div>
```

### Tabella

Si può creare molto facilmente una tabella. 

Ad esempio si pensi una tabella con tre colonne, header e 5 righe.

Ogni cella deve avere un template che indica a che colonna si riferisce con il numero. Scrivendo:

```html
table>tr.riga$>th{campo $}*3^(.righe#riga$>.dati{valoren.$}*3)*5
```

Si espande in: 

```html
<table>
	<tr class="riga1">
		<th>campo 1</th>
		<th>campo 2</th>
		<th>campo 3</th>
	</tr>
	<tr class="righe" id="riga1">
		<td class="dati">valoren.1</td>
		<td class="dati">valoren.2</td>
		<td class="dati">valoren.3</td>
	</tr>
	<tr class="righe" id="riga2">
		<td class="dati">valoren.1</td>
		<td class="dati">valoren.2</td>
		<td class="dati">valoren.3</td>
	</tr>
	<tr class="righe" id="riga3">
		<td class="dati">valoren.1</td>
		<td class="dati">valoren.2</td>
		<td class="dati">valoren.3</td>
	</tr>
	<tr class="righe" id="riga4">
		<td class="dati">valoren.1</td>
		<td class="dati">valoren.2</td>
		<td class="dati">valoren.3</td>
	</tr>
	<tr class="righe" id="riga5">
		<td class="dati">valoren.1</td>
		<td class="dati">valoren.2</td>
		<td class="dati">valoren.3</td>
	</tr>
</table>
```

### Un sito intero in una linea

Si può creare un intero sito in una sola linea di codice. 

Immaginando una struttura NAV+BODY+FOOTER con la dichiarazione dell'ahtml si può scrivere: 

```html
html:5>nav>(ul>li*3>a:link{link navigazione $})^h1{Titolo Della Pagina}+p{descrizione}+footer{footer e link abouts}>ul>li.small*5>a:link{link about $}
```

E viene generato:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	<nav>
		<ul>
			<li><a href="http://">link navigazione 1</a></li>
			<li><a href="http://">link navigazione 2</a></li>
			<li><a href="http://">link navigazione 3</a></li>
		</ul>
	</nav>
	<h1>Titolo Della Pagina</h1>
	<p>descrizione</p>
	<footer>footer e link abouts
		<ul>
			<li class="small"><a href="http://">link about 1</a></li>
			<li class="small"><a href="http://">link about 2</a></li>
			<li class="small"><a href="http://">link about 3</a></li>
			<li class="small"><a href="http://">link about 4</a></li>
			<li class="small"><a href="http://">link about 5</a></li>
		</ul>
	</footer>
</body>
</html>
```

## Cheat Sheet

È disponibile, per ogni evenienza, [un cheat sheet nella documentazione di emmet.](https://docs.emmet.io/cheat-sheet/)
