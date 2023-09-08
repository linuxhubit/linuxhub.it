---
class: post
title: "#howto - Velocizzarsi nell'uso del terminale pt. 2 - history e shell options" 
date: 2022-11-04 07:55
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: Linuxhub
coauthor_github: linuxhub
published: true
tags: 
- terminale
- shortcut
---


[&larr; velocizzarsi nel terminale pt 1](https://linuxhub.it/articles/howto-velocizzarsi-terminale/)  
[&rarr; velocizzarsi nel terminale pt 3](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt3/)


Sperando che abbiate apprezzato [la prima parte di questo articolo](https://linuxhub.it/articles/howto-velocizzarsi-terminale/), vediamo quali altri trucchi esistono per diventare più rapidi usando il terminale, introducendo le espansioni, le shell option e altri metodi per richiamare la cronologia. 

## Ricerca nella history tramite espansione

Partiamo dalla fine del precedente articolo, ovvero dalla history del terminale. Le shortcut non sono l'unico metodo per richiamare infatti parti di comandi precedenti, esistono anche le espansioni. 

Le *espansioni* del terminale sono parti di comando che vengono interpretate ed elaborate prima di essere effettivamente inviate. Nel caso delle history alcune potrebbero essere molto utili.

### Comandi precedenti

Per richiamare *interi* comandi precendenti si utilizza il punto esclamativo (`!`) seguito da un simbolo, numero o intera stringa.

Sicuramente il comando più utile risulta quello che ripete l'ultimo comando inserito:

```bash
!!
```

Spesso utilizzato per aggiungere sudo al comando precedente, eccone un esempio completo:

```bash
> pacman -Syu
errore: questa operazione è possibile solo da root.

> sudo !! 
sudo pacman -Syu
[sudo] password di nomeutente: 
```

Ogni comando nella history viene memorizzato insieme ad un numero ordinale incrementale che ne rappresenta l'id, per visualizzare la lista scrivere:

```bash
history 
````

Un output tipo sarebbe:

```bash
1  echo "ciao" 
2  echo "sono il numero 2"
3  echo "comando numero 3" | head -c 2
4  history
```

Se si vuole richiamare con un espansione *un preciso comando* della history, lo si può fare indicando il **numero dell'id** accanto il punto esclamativo.  
Ad esempio ripetiamo il secondo comando della history:

```bash
!2
```

Se si vuole invece prendere un certo comando a partire dall'ultimo dato, ad esempio il terz'ultimo, si può indicare il carattere `-` prima del numero:

```bash
!-3
```

Ne segue logicamente che il comando `!-1` equivale a `!!`, ovvero rappresenta l'ultimo comando inserito.

### Ricerca e sostituzione per stringa

È possibile utilizzare il meccanismo di sostituzione per ripetere un determinato comando che contiene una stringa e, nel caso, finanche sostituirla.

Andando in ordine, se accanto il punto esclamantivo viene indicato l'inizio di un comando precedente, questo viene autocompletato ed inviato. 

Si supponga la seguente *history*:

```bash
1  echo "ciao" 
2  echo "sono il numero 2"
3  echo "comando numero 3" | head -c 2
4  history
```

Scrivendo:

```bash
!echo
```

Si ottiene l'ultima occorrenza che inizia per echo, ovvero: 

```bash
echo "comando numero 3" | head -c 2
```

Se si appone dopo il punto esclamativo anche un punto interrogativo (`?`) si indica invece un comando che "contiene" la stringa che segue. Ad esempio: 

```bash
!?ciao
```

Darà come output:

```bash
echo "ciao" 
```

È inoltre possibile indicare con il simbolo `?` la presenza opzionale di un carattere. Ad esempio: 

```bash
!?ciaoo?
```

Darà come output sempre:

```bash
echo "ciao" 
```

In quanto la ultima o è segnata come opzionale. 


Infine si può ripetere l'ultimo comando indicando una parola da sostituire:

```bash
^parola^sostituto
```

Caso d'uso molto utile è ad esempio quello di mostrare il contenuto di un file e quindi richiamare un editor di testo per sostituirlo:

```bash
cat nomefile

^cat^nano
```

## Gli escape di espansione

Gli escape di espansione (anche chiamati glob) son caratteri speciali che consentono alla shell di prelevare una serie di opzioni tra quelle disponibili.

> NOTA BENE: 
> 
> Gli escape di espansione funzionano sia su bash che su zsh, ma ci potrebbero essere delle differenze. Quelle trattate qui funzionano al 100% con bash.


Gli escape di glob sono i seguenti: 

- `*` rappresenta una qualunque sequenza di caratteri. Ad esempio `S*` seleziona sia "*Scrivania*" che "*Scaricati*".
- `?` rappresenta un carattere qualunque che non si conosce. Ad esempio `Mari?` seleziona sia "*Mario*", "*Maria*" che "*Marie*".
- `[]` la sequenza scritta nelle parentesi quadrate viene divisa in modo da sostituire un singolo carattere con uno di quelli presenti all'interno. Ad esempio `Mari[ao]` seleziona sia "*Maria*" che "*Mario*", **ma non** *Marie*
  - All'interno delle quadre si può utilizzare il carattere `-` per indicare un range di caratteri. Ad esempio il range delle lettere che vanno da *a ad e* si indica con `[a-e]`. Questo rende l'espressione `Mari[a-e]` sostituibile a "*Maria*" e "*Marie*" **ma non** a "*Mario*".
  - Se il primo carattere dopo le quadre è `^` si indica la negazione della sequenza. Ovvero vengono selezionati tutti gli elementi che non combaciano con quella sequenza. Ad esempio `Mari[^e]` seleziona sia "*Mario*" che "*Maria*", **ma non** "*Marie*"
- `{}` le graffe permettono di indicare esplicitamente più possibili sequenze, ogni sequenza va divisa da una virgola. Ad esempio `file{1,2,3,4}.txt` indica in equal modo "*file1.txt*", "*file2.txt*", "*file3.txt*", "*file4.txt*". Valgono anche sequenze vuote ovviamente, ad esempio `file{,2}.txt` indica sia "*file.txt*" che "*file2.txt*".

I glob possono essere applicati a tutti i comandi della shell che prelevano per argomento delle sequenze auto completabili, come i file, ma potrebbero non avere lo stesso effetto su qualunque comando.

Si supponga il seguente caso di studio in cui vengono creati i file numerati da uno a 10, ogni file al suo interno contiene la frase "Sono il file numero X" (X viene sostituito dall'effettivo numero di file).

```bash
for i in $(seq 10); do 
    echo "Sono il file numero $i" > file$i.txt
done
```

Per selezionare solo i file a numero dispari si può scrivere:

```bash
cat file[13579].*
```

Ma anche:

```bash
cat file{1,3,5,7,9}.*
```

Per selezionare i primi 5 file si può invece scrivere:

```bash
cat file[1-5].*
```

Per tutti gli altri è possibile usare la negazione:

```bash
cat file[^1-5].*
```

Per selezionare i file 1 e 10 invece è possibile scrivere:

```bash
cat file1{,?}.txt
```

Se ci fossero stati altri file dal 10 al 20 questa sintassi avrebbe selezionato anche questi ovviamente.

Per selezionare tutti i file ad una sola cifra invece: 

```bash
cat file?.txt
```

## Le shell option (shopt)

Esistono una serie di opzioni attivabili per bash chiamate shell option. Tramite queste è possibile automatizzare una serie di processi o correggere piccoli errori in autonomia.

Si può trovare una documentazione completa per le shell option [sul sito ufficiale della gnu foundation](
https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html).


> *NOTA BENE:*
> 
> Le shell options sono di bash, non funzionano su zsh. Grazie Roxybar73 che ha segnalato questa mancanza sul gruppo Telegram. SEGNALATE sempre le precisazioni sui nostri gruppi grazie <3.

### Abilitare una shell option

Per abilitare una shell option basta scrivere:

```bash
shopt -s nomeopzione
```

Tuttavia l'abilitazione *è relativa solo alla sessione corrente* del terminale, quindi per abilitare una shell option in maniera "**definitiva**" va aggiunta l'istruzione nel file *bashrc* o nel file *bash profile* (supponendo l'utilizzo di bash come interprete; altrimenti nel file *zshrc* o nel *fish.config*). Leggere l'articolo sui [file di avvio per maggiori informazioni](https://linuxhub.it/articles/howto-file-avvio-shell).

### Disabilitare una shell option

Per disabilitare una shell option basta scrivere:

```bash
shopt -u nomeopzione
```

### Interrogare le shell option

Si può vedere la lista delle shell options con il relativo stato di attivazione scrivendo: 

```bash
shopt
```

Oppure interrogarne una precisa con: 

```bash
shopt nomeopzione
```

### Cambiare automaticamente cartella

Per coloro che pensano che la vita *è troppo breve per essere vissuta una cd alla volta*, potrebbe essere interessante sapere che esiste un opzione che automaticamente aggiunge `cd` ad un percorso cartella se viene specificato senza alcun altro comando prima. 

Ad esempio scrivendo: 

```bash
Scaricati
```

Quando si è nella home, inviando il comando automaticamente diventerà: 

```bash
cd Scaricati
```

Per abilitare questa *futuristica* funzione è necessario abilitare l'opzione `autocd`, così: 

```bash
shopt -s autocd
```

### Utilizzare le variabili per cd

Spesso è utile memorizzarsi percorsi nelle variabili, il punto è che poi richiamarle richiede ricordarsi che, essendo variabili, vanno antecedute dal carattere `$`.

Si può aggirare questo meccanismo abilitando l'opzione `cdable_vars`: 

```bash
shopt -s cdable_vars
```

Quindi ora è possibile scrivere ad esempio:

```bash
imieidocumenti=/home/nomeutente/Documenti

cd imieidocumenti
```

### Correggere piccoli errori per nomi di cartelle

Se capita di scrivere ogni tanto qualche nome di cartella saltando una lettera o scrivendo una maiuscola anziché una minuscola, questa opzione risolverà in autonomia l'errore:

```bash
shopt -s cdspell
```

Ecco un esempio di autocorrezione delle maiuscole:

```bash
> cd scrivania
Scrivania

> pwd
/home/nomeutente/Scrivania
```

Oppure di un percorso con una lettera mancante: 

```bash
> cd Scrvania
Scrivania

> pwd
/home/nomeutente/Scrivania
```

### Espansione escape non sensibili alle maiuscole

È possibile anche rendere le espansioni con escape insensibili alle maiuscole attraverso l'opzione `nocaseglob`:

```bash
shopt -s nocaseglob
```

Per fare un esempio concreto, è possibile scrivere: 

```bash
ls scriva*
```

e far si che venga prelevato come risultato Scrivania (che inizia con la S maiuscola)
