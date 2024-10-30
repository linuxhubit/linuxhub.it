---
class: post
title: '#howtodev - Crystal, il nuovo Ruby'
date: 2021-05-31
layout: post
author: Massimiliano Noviello
author_github: linuxhubit
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

- ruby
- crystal
---
Quanto sarebbe bello scrivere codice Ruby performante, staticamente tipizzato (senza rinunciare alla libertà della tipizzazione debole), null safe, con potente metaprogrammazione, modello di concorrenza simile a quello di Go e un buon strumento per la gestione dei progetti?

Questo è ciò che promette Crystal, un linguaggio che di recente (22 marzo 2021) ha raggiunto la versione `1.0.0`, ed è quindi stato dichiarato stabile e pronto per essere usato in produzione.

Ma andiamo a vedere alcuni pregi e difetti del linguaggio nel dettaglio dal punto di vista di un fan di Ruby.

> Questo articolo è principalmente indirizzato a chi ha già esperienza col linguaggio Ruby.

## Pregi
Vediamo i motivi per i quali amo questo linguaggio:

### Ruby-like
Essendone Ruby la maggiore fonte di ispirazione del linguaggio, Crystal sarà un ambiente familiare per tutti i programmatori Ruby pur con qualche chicca in più come l'overloading.

### Performance
Crystal usa LLVM e sfrutta diverse ottimizzazione a cui Ruby non ha accesso a causa della sua natura dinamicamente tipizzata e controllata a runtime (anche se con la sua compilazione JIT Ruby sta guadagnando terreno).

### Tipizzazione
È possibile definire funzioni annotandone i tipi come in un linguaggio staticamente tipizzato oppure lasciare che sia il compilatore ad occuparsi di controllare che il tipo vada bene per quella funzione.

Per esempio potremmo scrivere una funzione che converte qualunque cosa supporti il metodo `to_i` in un numero intero:

```crystal
def to_integer(a)
    a.to_i
end

to_integer("2") # Ok, ritorna 2
to_integer(2)   # Ok, ritorna 2

to_integer({1 => 2}) # Errore di compilazione
```

In questo caso quando proviamo a passare un `Hash` alla funzione `to_integer` il compilatore ci avviserà in anticipo che quel tipo non ha nessun metodo `to_i` definito.

Ovviamente anche possibile annotare tipi in anticipo:

```crystal
def to_integer(a : String) : Int
    a.to_i
end
```

Prima ho parlato di null safety quindi prendiamo in esempio i metodi `to_int` e `to_int?`.

In caso di problemi il primo metodo andrà in errore, mentre il secondo ritornerà un `(Int | Nil)`. Questo vuol dire che il secondo metodo potrebbe ritornare un numero intero o un valore nullo e quando proviamo ad usare questo risultato senza assicurarci della sua validità il compilare andrà in errore.

```crystal
n = "2".to_i?

puts n + 1 # Errore, potrebbe essere un Int o un Nil
```

```crystal
n = "2".to_i? || 0 # In caso di Nil ritorna 0

puts n + 1 # Stamperà 3
```

### Metaprogrammazione
Crystal mette a disposizione dell'utente potenti macro che consentono di fare di tutto, dalla classica generazione di codice all'esecuzione di codice Crystal in fase di compilazione e addirittura inserire Crystal in qualsiasi file di testo per preprocessarlo prima di incorporarlo nel binario.

Per scrivere macro basta usare due paia di parentesi graffe \'\{\{ \}\}\'.

Scriviamo per esempio un programma il cui binario abbia in una variabile una lista di file all'interno di quella cartella in tempo di compilazione:

<div class="highlight">
<code>files = &#123;&#123;`ls`.stringify.strip.split("\n")&#125;&#125;</code>
</div>


L'output del comando `ls` viene catturato e `stringify` indica che deve essere trattato come una stringa e non come un identificatore (dato che le macro sono capaci di generare identificatori).

### Green thead
Il linguaggio incorpora un sistema di green thread molto simile a quello di Go.

Esse vengono chiamate fiber (o fibre) e vengono generate con la parola chiave `spawn`.

Ecco un esempio di blocchi di codice che dovrebbero venir eseguiti in modo concorrente:

```crystal
spawn do
    puts 1
end

spawn do
    puts 2
end
```

È anche possibile farle comunicare tramite l'uso di canali:

```crystal
canale = Channel(Nil).new

spawn do
  puts "Prima dell'invio"
  canale.send(nil)
  puts "Dopo l'invio"
end

puts "Prima dell'arrivo dei dati"
canale.receive
puts "Dopo l'arrivo dei dati"
```

## Difetti
Putroppo non è tutto rose e fiori, ecco le mie maggiori critiche a Crystal:

### "Sono piccoli problemi di" bug
Alcuni metodi e funzioni hanno ancora qualche problemino.

```crystal
pp ("a".."zbz").to_a
```

Ad esempio codice funziona correttamente se eseguito dall'interprete Ruby e stampa tutto dalla "a" fino a "zbz", mentre in Crystal si fermerà a "zb".

### Thread starving
Questa è una delle cose che mi preoccupano di più. Le fiber non hanno alcun tipo di prelazione e questo rende il linguaggio soggetto a problemi di thread starving (vuol dire che un green thead occupa tutto il tempo di computazione e non passa mai il controllo), e questo è accentuato dal fatto che il supporto all'uso di più os thread e core è ancora acerbo.

### Non totalmente ARM-ready
Nonostante il supporto all'architettura ARM sia praticamente arrivato c'è ancora bisogno di perfezionarlo e non è ancora da considerarsi pronto per la produzione.

### Windows in lavorazione
Al momento tutte le energie del team sono dedicate al supporto a windows che dovrebbe arrivare quindi in tempi abbastanza brevi.

## Conclusione
Vedo molto potenziale, il linguaggio mi sembra promettente, ma ora vogliamo sentire la tua opinione!

Vieni a parlarne sul nostro [gruppo Telegram](https://t.me/linuxpeople).
