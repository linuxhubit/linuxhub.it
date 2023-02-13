---
class: post
title: '#howtodev - Utilizzare le espressioni regolari (regex) in vari linguaggi'
date: 2020-09-09
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - python
  - gnome
  - bash
---
> NOTA: Questo articolo dà il via ad una serie di nuove rubriche sperimentali di linuxhub.it di cui sarebbe gradito un riscontro nei nostri gruppi

Dette anche "**regex**" (da **reg**ular **ex**pressions), le *espressioni regolari* sono (semplificando ai minimi termini) un meccanismo per definire e riconoscere un insieme di stringhe a partire da una sequenza di simboli che ne definiscono il modello. Per essere più chiari, con le regex potete: 

- verificare che una stringa sia conforme ad un eventuale modello
- separare le stringhe definendo delimitatori  
- riconoscere presenza e quantità di sottostringhe conformi a modelli
- e molto altro ancora

Sono considerate un linguaggio a sé stante, valido poi da integrarsi in più o meno tutti gli altri linguaggi di programmazione (con magari piccole differenze sintattiche).

## Notazioni usate all'interno dell'articolo

Prima ancora di iniziare è necessario definire un linguaggio comune per evitare incomprensioni nella lettura dell'articolo. Dunque:

-  si parlerà di **pattern** ad indicare delle stringhe che definiscono "modelli" in cui si riconoscono diverse combinazioni di caratteri. A portare un esempio potremmo indicare "tutte le parole che iniziano per lettera e finiscono per numero" come **pattern**, e indicherebbe in equal modo **Giovanni87** quanto **Giorgio1**, ma non indicherebbe **7zip** o "**dammi 3 parole**".
- Si parlerà di **match** per indicare che una stringa è inclusa nel **pattern**. Nell'esempio di prima **Giovanni87** *è un match*, **7zip** *no*.
- si abbrevierà in **regex** la frase "*espressione regolare*".
- ci si riferirà al fare **escape** di un simbolo nel senso di sovrapporre un carattere speciale che ne permette l'utilizzo come simbolo e non interpretarlo secondo le regole del linguaggio.
- il termine **tab** si riferirà al pulsante &#x2B7E;,&#x21C6; o comunque allo spazio largo generato dalla pressione di tale tasto. Il tab nei codici è identificato dalla combinazione `\t`.
- il termine **fine linea** o *line feed* indicherà il carattere che permette di mandare a capo un testo, in genere in seguito alla pressione del tasto *Enter*. Il fine linea nei codici è identificato dalla combinazione  `\n`, da `\r` o insieme `\n\r` (si differenziano nei vari sistemi operativi).
- il termine **range** indica un intervallo di caratteri contigui nella numerazione, il *range a-z* ad esempio indicherà tutte le lettere minuscole.
- si parlerà di mettere in **or** due caratteri, stringhe o simboli, nel senso in cui potrà apparirne uno o l'altro, con la stessa validità. Generalmente l'*or* viene introdotto dal simbolo `|`.  I.E. *pesc(e* **|** *i)* darà validità alla stringa **pesce** quanto alla stringa **pesci**.

## Le regole più comuni

Nonostante i vari linguaggi offrano alcune diverse regole per l'espansione delle espressioni regolari, esistono delle regole che sono considerate comuni.

### Simboli e parole chiave

In generale, ogni carattere identifica sé stesso in una regex. Per essere chiari, la regex "*a*" identifica la sola stringa che **combacia** con "*a*".

Esistono dei caratteri però che sono propri del linguaggio, e vengono quindi interpretati in maniera diversa. In gergo si dice che son *parole o simboli chiave*.

Qualche esempio lo ritroviamo in:

- i simboli `. \ | ^ $`
- i simboli delle parentesi `[] ()`

In genere, per usarli come parte del **pattern**, bisogna farne l'**escape** con il *carattere &#92;*. Ad esempio, per indicare tutti e soli i pattern che contengono esattamente la parola **Ciao.**, scriveremo:
`"Ciao\."`

### Classi di caratteri

Le **classi di caratteri** sono particolari combinazioni di *parole chiave* e *simboli* che identificano gruppi di caratteri anziché un solo carattere alla volta.

Esistono diverse classi di carattere, alcune "*fisse*" che determinano *sempre lo stesso gruppo* di caratteri, altre che si possono *costruire ad hoc*.

Quelle fisse sono:

- il punto `.` : identifica tutti i caratteri tranne il fine linea
- `\w` : identifica una parola, cioè una sequenza di caratteri dell'alfabeto, numerici o underscore che fanno parte dei caratteri ASCII
- `\W` : esattamente il contrario di `\w`
- `\d` : tutti i caratteri numerici
- `\D` : esattamente il contrario di `\d`  
- `\s` : tutti gli spazi, ovvero il classico *spazio*, il *fine linea* o il *tab*.
- `\S` : l'esatto contrario di `\s` 

Le classi personalizzate invece sono racchiuse tra parentesi quadre, si può specificare una **combinazione** di caratteri oppure **range** indicati attraverso il carattere `-` (`da-a`).

Si possono usare in realtà tutti i simboli chiave che normalmente si usano nelle regex, gruppi fissi compresi.

I gruppi fissi in effetti, sono tutte abbreviazioni di gruppi personalizzati, si veda come si possono ricostruire manualmente anche per comprendere meglio il funzionamento di entrambi i meccanismi:

- `.` corrisponde al gruppo `[^\n\r]`, dove il carattere `^` indica la negazione; letteralmente è il gruppo di tutti i caratteri eccetto `\n\r`
	- notare che il set negato vuoto `[^]` indica tutti i caratteri. Qualunque carattere in un set negato è inteso in *or* con gli altri. `[^ab]` è infatti qualunque carattere tranne **a** e **b**
- `\w` corrisponde al gruppo `[A-Za-z0-9_]`; letteralmente è il gruppo delle lettere maiuscole, lettere minuscole, cifre e underscore.
- `\W` si può ottenere come negazione del precedente, a pari merito valgono sia `[^A-Za-z0-9_]` che `[^\w]`
	- notare che il gruppo ottenuto concatenando un insieme e il suo opposto è come dire *qualunque carattere*. Ad esempio `[\w\W]`, e lo stesso discorso si può fare per `[\d\D]` e `[\s\S]`
- `\d` corrisponde al gruppo `[0-9]`; letteralmente il gruppo formato dai caratteri che vanno da 0 a 9 
- `\D` si può ottenere come negazione del precedente, a pari merito valgono sia `[^0-9]` che `[^\d]`
- `\s` corrisponde al gruppo `[ \n\r\t]`, notare che è importante lasciare uno spazio; è il gruppo formato da spazio, i fine linea e il carattere di TAB
- `\S` si può ottenere come negazione del precedente, a pari merito valgono sia `[^ \n\r\t]` che `[^\s]`

In seguito agli esempi forniti, dovrebbe essere chiaro quali sono i metodi per creare la propria combinazione di caratteri come gruppo personalizzato.

Un gruppo particolare, che potrebbe essere utile a chi nei suoi programmi ha a che fare con la *lingua italiana*, è quello delle nostre **lettere accentate**:

```
[\u00C0\u00c1\u00c8\u00c9\u00cc\u00cd\u00d2\u00d3\u00d9\u00da\u00e0\u00e1\u00e8\u00e9\u00ec\u00ed\u00f2\u00f3\u00f9\u00fa]
```

#### Trivia, le lettere accentate in UNICODE

Per i più curiosi potrebbe essere ben accetto sapere quali sono i codici Unicode delle singole lettere accentate. Di seguito potete trovare una piccola tabella riassuntiva

| Codice accento grave &#96;   | Codice accento acuto &acute; | lettera di riferimento |
| :--------------------------: | :--------------------------: | :--------------------: |
|           `\u00c0`           |           `\u00c1`           |          *A*           |
|           `\u00c8`           |           `\u00c9`           |          *E*           |
|           `\u00cc`           |           `\u00cd`           |          *I*           |
|           `\u00d2`           |           `\u00d3`           |          *O*           |
|           `\u00d9`           |           `\u00da`           |          *U*           |
|           `\u00e0`           |           `\u00e1`           |          *a*           |
|           `\u00e8`           |           `\u00e9`           |          *e*           |
|           `\u00ec`           |           `\u00ed`           |          *i*           |
|           `\u00f2`           |           `\u00f3`           |          *o*           |
|           `\u00f9`           |           `\u00fa`           |          *u*           |

### Indicare la posizione della regex

Esistono una serie di regole atte ad indicare la posizione della regex nella frase: 

- `^` in una regex (da non confondere l'utilizzo in un gruppo) indica che il match deve verificarsi **a monte della stringa passata**. Il simbolo deve essere posizionato prima della regex
    
    - la regex `^s` indica *il carattere s* all'inizio della stringa analizzata.   
    
      Esempio: *s*i sta come d'autunno sugli alberi le foglie
-  `$` al contrario rappresenta il **pezzo finale della stringa**. Il simbolo va posizionato alla fine della regex.
	
	- la regex `e$` indica *il carattere e* alla fine della stringa analizzata.   
	
	  Esempio: si sta come d'autunno sugli alberi le fogli*e*
- `\b` indica che il match deve verificarsi **alla fine delle parole**. La combinazione va posizionata alla fine della regex
	
	- la regex `e\b` indica *il carattere e* alla fine delle parole  (la sola lettera *e* a sua volta è un match) della stringa analizzata. 
	
	  Esempio: si sta com*e* d'autunno sugli alberi l*e* fogli*e*
- `\B` indica che il match **non** deve verificarsi **alla fine delle parole** (la sola lettera *e* non rappresenta un match). La combinazione va posizionata alla fine della regex:
	
	- la regex `e\B` indica il carattere e non alla fine delle parole. 
	
	  Esempio: si sta come d'autunno sugli alb*e*ri le foglie

### Quantificazione

Un determinato simbolo può essere **quantificato**, ovvero può essere soggetto ad una ripetizione. Vale anche per intere classi, il che ci permette con poco di identificare intere frasi o parole con uno specifico prefisso o con uno specifico fine suffisso comune.

Si vedano prima i possibili quantificatori:

- `+` indica che quel simbolo o quell'espressione *è presente 1 o più volte*
- `*` indica che quel simbolo o quell'espressione *è presente 0, 1 o più volte*
- `{n,m}` indica che quel simbolo o quell'espressione *è presente da* **n** a **m** volte (inclusi). Può essere presente anche solo *n*
- `?` indica che quel simbolo o quell'espressione potrebbe essere presente (una volta) o no

Vediamo subito qualche esempio:

- `X\d{1,9}Z` è una regex che si identifica in una qualsiasi stringa che inizia per X, finisce per Z e ha da 1 a 9 cifre in mezzo. 
	- Espressioni che fanno un match sono *X1Z*, *X421Z* o *X987654321Z*. Ma **non X1231231230Z**    
- `[a-z]{6}\d{2}[a-z]\d{2}[a-z]\d{3}[a-z]` identifica un codice fiscale ad esempio. 
	- *aaabbb00B30i123z* ha un match con l'espressione di sopra. **aaabbb00030i123za** no
- `una?` è una regex che ha match solo con **un** e **una**
- `\w+@\w+\.\w+` è una regex che matcha con tutte le email.

Si ricordi che le regex controllano la "forma" di un contenuto, non la sua validità. Nel secondo caso ad esempio tutti i codici fiscali *avranno un match con la regex*, ma questo *non significherà* che saranno *codici fiscali validi*. Stessa cosa per l'email, infatti anche **a@b.c** è un email secondo la regex.

### Subregex e gruppi di cattura

Si possono creare dei cosiddetti **gruppi di cattura** usando le *parentesi tonde*; questi sono delle vere e proprie sub-regex, e si possono usare per applicare ad una determinata sequenza delle proprietà come la ripetizione per un numero definito di volte.
Innanzitutto consideriamo qualche esempio semplice senza molta utilità, che possano però chiarire le potenzialità dello strumento:

- `(0|1|2|3|4|5|6|7|8|9)` corrisponde alla regex `\d` ed indica una **cifra qualunque**, tutte le cifre tra di loro son in *or*. Letteralmente si sta intendendo: *un gruppo formato da 0 o 1 o 2 o 3 ... o 9*
- `^([A-Z]|\d)` significa "*una frase che inizia con lettera maiuscola o inizia con una cifra*". Notare che è totalmente diverso da `^[A-Z]|\d` dove si intende "*una frase che inizia per lettera maiuscola oppure ha almeno una cifra, non importa dove*", ma equivale a `^[A-Z]|^\d`

A questo punto, è necessario introdurre il concetto di **gruppo di cattura.** Infatti, un gruppo può essere poi riutilizzato per creare regex ripetitive. 

I gruppi di cattura hanno questa forma:

`(grupporegex1)altraregex\1(grupporegex2)altreregex\2...etc`

Le ripetizioni avvengono quando son specificati i numeri con il carattere di "escape". 

Supponiamo di voler ripetere il gruppo:
`(asd\d?)` che può fare match con: **asd asd1 asd2 asd3...etc**.

Quindi scriviamo:
`(asd\d?)\w+\1`, ad intendere che, *il primo gruppo di cattura* **deve ripetersi** *alla fine della frase*. Se il gruppo cattura **asd1**, alla fine della frase **dovrà ripetersi esattamente asd1**, e *non asd o asd2*. Una stringa di testo *perfettamente valida* potrebbe essere **asd109878asd1**, mentre *una non valida* sarebbe **asd0982314asd** (il primo gruppo di cattura è **asd0**, ma alla fine si ripete solo asd).

Non si è capito? Si veda un esempio più pratico. Si supponga ora di voler gestire il caso in cui un nuovo account deve necessariamente avere l'indirizzo email associato che contenga il nome utente.

> **Nome** : Ajeje  
> 
> **Cognome** : Brazorf  
>
> **Email** : ajejebrazorf@patate.com   

quindi, il controllo dei campi potrebbe essere eseguito come segue:

`([a-z]+) ([a-z]+) (\w*\1\w*@\w+.\w+)`

Passandogli come stringa: **ajeje brazorf ajejebrazorf@patate.com**, ci sarà un **match**. Invece **ajeje brazorf bgatesbrazorf@patate.com**, **non** avrà alcun match.

Ovviamente si potrebbe pensare di includere anche il cognome, usando il gruppo di cattura numero 2 con **\2**. Il numero infatti, può variare a catturare un gruppo in qualunque posizione.

Si può evitare la cattura di un gruppo scrivendo così: `(?:regexgruppo)`.

Per riapplicare l'esempio della casella di posta, si supponga di voler catturare il cognome, ma non il nome: `(?:[a-z]+) ([a-z]+) (\w*\1\w*@\w+.\w+)`.

Questa regex catturerebbe un indirizzo formato dal cognome e non dal nome se la stringa fosse passata come: **nome cognome indirizzo@email.com**.

*Un match valido* sarebbe: **ajeje brazorf bgatesbrazorf@patate.com**, *ma non* **ajeje brazorf ajejeb@patate.com**.

### lookahead e lookbehind regex

Questo genere di regex catturano stringhe che si trovano in posizioni precedenti o successive ad una determinata regex. 

- `regex(?=lregex)` è detto **lookahead** e cattura ciò che c'è prima della regex tra parentesi
    - Un esempio pratico potrebbe essere catturare la parte prima del dominio in un indirizzo di posta: `\w+(?=@\w+)`. Nella stringa ajejebrazorf@patate.com la corrispondenza sarebbe *ajejebrazorf*.
    - il **lookahead** può essere negato, cioè scrivendo`regex(?!lregex)` il match ci sarà solo se non viene rispettato il **lookahed**. Controverso? ecco un esempio:
		- Supponendo l'esempio dell'email, `\w+(?!@)` validerebbe tutto tranne la lettera prima della chiocciola. Letteralmente son validati solo i caratteri alfanumerici (o underscore) *che non precedono una chiocciola*. Nella stringa ajejebrazorf@patate.com la corrispondenza sarebbe *ajejebrazor patate com*.
- `(?<=lregex)regex` è invece detto **lookbehind**. Il concetto è esattamente il contrario del lookahed, viene preso in considerazione ciò che segue la regex. 
	- esempio pratico potrebbe essere catturare la parte dopo del dominio in un indirizzo di posta: `(?<=@)\w+`. Nella stringa ajejebrazorf@patate.com la corrispondenza sarebbe *patate*.
	- Anche il **lookbehind** può essere negato. Attraverso `(?<!lregex)regex` si indica di validare tutto meno che quello che segue immediatamente la regex. Ecco un esempio:
		- La regex `(?<!@)\w+` validerebbe tutto tranne la prima lettera dopo la chiocciola. Nella stringa ajejebrazorf@patate.com la corrispondenza sarebbe *ajejebrazorf atate com*.

## Esempi nei linguaggi di programmazione

Messe insieme le tante regole delle regex, bisogna saperle sfruttare nei vari linguaggi che le utilizzano. Bisogna comunque tener conto che:

- non tutti i linguaggi implementano tutte le regole delle regex
- non tutti i linguaggi implementano nello stesso modo alcune regole delle regex
- nello stesso linguaggio possono esistere più framework o moduli che sfruttano le regex. Ognuno potrebbe essere diverso dall'altro

> **Nota**:
> Si procederà con esempi pratici, ma ovviamente gli esempi di regex usati sono sostituibili con qualsiasi regola [vista in precedenza](#Le-regole-più-comuni).

### Bash

Sull'interprete usato dai sistemi Linux sono disponibili le regex dietro numerosi programmi che ne fanno uso, tuttavia spesso sono implementazioni incomplete, che non contengono tutti i costrutti. 
Una buona pratica è sempre quella di accertarsi tramite dei test, che nel caso degli interpreti sono ancora più semplici e immediati da effettuare.

#### grep

Uno dei metodi più comuni è utilizzare il comando `grep`. Qua è stato già introdotto [il comando grep](https://linuxhub.it/articles/howto-introuzione-all-utilizzo-di-grep-e-delle-regex), facendo dei riferimenti anche alle regex.

Riassumendo, `grep` è un comando che filtra un output o ti permette di cercare tra vari file e i contenuti degli stessi nel file system. Si voglia ora fare qualche esempio utilizzandolo nella sua funzione di filtro output con un banale comando `echo` di supporto.
Nella sua versione base, `grep` utilizza una sintassi delle regex detta "*semplice*", cioè riconosce i gruppi, le classi e poco altro:

```bash
echo "ajejebrazorf@patate.com" | grep '[a-z]@'

# Il match evidenzierà la lettera giusto prima della chiocciola e la chiocciola stessa 
```

Altresì è possibile utilizzare una versione detta **estesa** (attraverso la `flag -E`) che comprende una sintassi più ampia, come i quantificatori:

```bash
echo "ajejebrazorf@patate.com" | grep -E '[a-z]+@'

# Il match evidenzierà la chiocciola così come tutto ciò che viene prima 
```

Altri costrutti, come i *lookahead*, non sono presenti neanche con le regex estese, in tal caso si può provare ad usare la sintassi **delle regex di Perl** ( `flag -P` ).

```bash
echo "ajejebrazorf@patate.com" | grep -P '\w+(?=@)'

# Il match in questo caso evidenzierà tutto ciò che precede la chiocciola
```

Si sarà capito a questo punto che *questo* utilizzo delle regex è utile solo a verificare che vi siano match, non a prelevare invece le varie parti singolarmente e magari elaborarle.

Si può correggere questo comportamento specificando (`flag -o`) l'opzione per mostrare solo la zona evidenziata. Questa può poi essere elaborata con un **ciclo for**, per dire. Si veda l'esempio:

```bash
emails=$(echo "ajejebrazorf@patate.com linuxhub@mir.kom patate@ciao gh#asda " | grep -P  -o '\w+(?=@)')

n=0

for i in $(echo $emails); do let n++; echo "regex $n: $i"; done;

# Output:
# regex 1: ajejebrazorf
# regex 2: linuxhub
# regex 3: patate
```

### Python

Python è sicuramente uno dei linguaggi di scripting più amati al momento, tra i siti web che raccolgono statistiche sui linguaggi più usati del 2020, è **in cima alle classifiche** (top 5, alle volte primo in classifica). Sicuramente complici la semplicità d'utilizzo, l'alta leggibilità del codice e la quantità di framework open e pronti all'uso. Qui ci si riferirà alla versione 3 del linguaggio secondo quelle che sono le ultime versioni della documentazione disponibili.

Come è ovvio che sia, Python è ben attrezzato quanto riguarda l'uso delle regex. Si possono sfruttare attraverso il modulo **re**.

Tramite la modalità interattiva di Arch, si può importare il modulo come segue:

```python
import re
```

Eventualmente consultarne la documentazione:

```python
help(re)
```

#### Pattern e matcher, le basi

In Python, così come in altri linguaggi, alla base dei pattern ci sono due particolari *oggetti*: il **pattern** e il **matcher**.

In particolare il primo si occupa di scomporre la grammatica della regex. Il secondo si occupa di verificare la corrispondenza data una stringa.

Ecco come istanziare un pattern:

```python
ptt=re.compile("\w+@")
```

A questo punto, si può procedere con il riconoscimento delle regex nella stringa, creando il matcher:

```python
mtc=re.match(ptt,stringa)
```

Ora è lecito chiedersi cosa farsene del **matcher**. Innanzitutto si può immediatamente gestire il caso in cui si ha almeno una corrispondenza all'interno della stringa:

```python
if(mtc):
    # Vai computer, fai cose!!
else:
    # Niente, sei stato sfigato
```

Tramite la chiamata **match** avviene un unico riconoscimento che deve corrispondere a partire da inizio stringa. Per capire questo quali conseguenze ha, si immaginino i due seguenti match:

```python
stringa1="ajeje@brazzorf.com"
stringa2=" ajeje@brazzorf.com"
m1=re.match(patt,stringa1)
m2=re.match(patt,stringa2)
```

Dei due, il primo risulterà validato, il secondo no. Questo perché lo spazio prima della lettera ne impedisce il riconoscimento.

#### Pattern e matcher, i gruppi

Python riconosce in automatico la presenza di eventuali *gruppi di cattura*, che si possono poi sfruttare separatamente. Supponiamo di avere:

```python
stringa="ajeje@brazzorf.com brazzorf@ajeje.com"
patt="(\w+)@(\w+).(\w+)"
mtc=re.match(patt,stringa)
```

In questo esempio, vengono riconosciuti 4 gruppi:

- il **gruppo 0** sarà formato dall'**intero riconoscimento** della regex, che **attenzione**: si ferma allo spazio, quindi restituirà: `ajeje@brazzorf.com`
- il **gruppo 1** sarà formato dal primo gruppo di cattura, cioè `ajeje` ( il primo `\w+`)
- il **gruppo 2** sarà formato dal secondo gruppo di cattura, cioè `brazzorf`
- il **gruppo 3** sarà formato dal terzo gruppo di cattura, cioè `com` 

Come si usufruisce di questi gruppi? Attraverso i seguenti metodi:

- `mtc.group(indice)` restituisce il gruppo identificato dall'indice
- `mtc.groups()` restituisce tutti i gruppi in un array 

Per ogni gruppo è inoltre possibile sapere indice di inizio e indice di fine, con:

- `start(indice_gruppo)`: l'inzio
- `end(indice_gruppo)`: la fine
- `regs` restituisce una tupla di tuple ognuna delle quali contiene inizio e fine di ogni gruppo.

#### Pattern e matcher, l'iterazione

Può essere però comodo tentare di riconoscere invece tutti i possibili match. Ad esempio si supponga di avere la variabile:

```python
stringa="ajejebrazorf@patate.com linuxhub@mir.kom patate@ciao gh#asda"
```
In tal caso ci si potrebbe chiedere quali sono tutti i nomi di casella delle varie email, e per farlo serve un processo iterativo.

La prima soluzione è di usare `finditer`. La direttiva che restituisce un array di matcher, ognuno rappresenta un diverso match nella stringa:

```python
stringa="ajejebrazorf@patate.com linuxhub@mir.kom patate@ciao gh#asda "
ptt=re.compile("\w+@")
n=0;
for m in re.finditer(ptt,stringa):
    print("_"*10)
    print("corrispondenza ",n,": "+m.group(0))
    n=n+1
    print("stringa prima del match: "+stringa[:m.start()])
    print("stringa dopo il match: "+stringa[m.end():])
    print("_"*10)
#end for

print("Finite corrispondenze!")
```
Ma se l'oggetto delle ricerche si limita ai soli pezzi che fanno match, è possibile anche utilizzare il metodo `findall`, che raggruppa tutti i match in un array:

```python
stringa="ajejebrazorf@patate.com linuxhub@mir.kom patate@ciao gh#asda "
ptt=re.compile("\w+@")
n=0;
for i in  re.findall(ptt,stringa):
        print("corrispondenza ",n," "+i)
        n=n+1
#end for

print("Finite corrispondenze!")
```
Decisamente più semplice, ma meno potente.

#### Pattern e matcher, lo split

Se invece si necessita soltanto di tutto ciò che non è incluso nella regex, si può usare 
`re.split(pattern,stringa)` che crea direttamente un array di tutto ciò che non è stato catturato:

```python
stringa="ajejebrazorf@patate.com linuxhub@mir.kom patate@ciao gh#asda "
ptt=re.compile("\w+@")
n=0;
for i in  re.split(ptt,stringa):
        print("corrispondenza ",n," "+i)
        n=n+1
#end for

print("Finite corrispondenze!")
```

Attenzione però, se vi è una corrispondenza a inizio stringa può generare una stringa vuota!

#### Pattern e matcher, il fullmatch

Infine ma non ultimo, c'è la possibilità di verificare che una regex catturi **l'intera stringa passata** attraverso il metodo `fullmatch`. Si segua l'esempio per capire:

```python
ptt=re.compile("\w+@")
mtc=re.fullmatch(ptt,"ajeje@brazzorf.com")
#mtc sarà vuoto, poichè la regex matcha con parte della stringa ma non tutta!

ptt=re.compile("\w+@\w+\.\w+")
mtc=re.fullmatch(ptt,"ajeje@brazzorf.com")
#mtc ora non è vuoto. Infatti la regex è pienamente conforme a tutta la stringa passata 
```

#### Uso grezzo

Non sono comunque necessari gli oggetti sopracitati per il riconoscimento di pattern. Il modulo **re** funziona perfettamente anche solo con le stringhe.

Si veda l'esempio seguente per capire il concetto:

```python
for i in re.findall("\w","ciao"): 
    print(i);
```

Nel caso specifico, saranno divise tutte le lettere e stampate separatamente. 

Ovviamente, bisogna prendere consapevolezza che il *processo effettuato da Python* dietro le quinte *è il medesimo*, inoltre l'uso di **pattern** e **matcher** agevolano il *concetto di disaccoppiamento* del codice.

#### Help

Per ulteriori informazioni, è doveroso ricordare che Python fornisce un ottima guida inline direttamente dall'interprete

```python
help(re)
```

### Java

> **3 miliardi di dispositivi usano java** (Numero mai aumentato negli anni, a quanto pare)
> *~cit necessaria* 

Uno dei linguaggi da cui nascono più controversie. Volenti o nolenti, spesso si ha a che fare con Java, per la sua portabilità, versatilità e anche per le prestazioni che, dietro buone regole di programmazione, riesce a raggiungere.

Anche Java implementa le regex, con alcuni semplici metodi oltretutto.

#### I metodi di String

Il primo semplice metodo per usufruire del match dell'intera stringa è sfruttare il metodo stesso della classe String:

```java
String email="ajeje@brazzorf.com";
System.out.println(email.matches("\\w+@\\w+\\.\\w"));
```

Da notare come in questo caso sia importante generare **un escape** per il carattere `\` quando si usufruisce dei gruppi. Infatti lo stesso carattere *è usato come escape da Java stesso*, quindi per utilizzarlo nella regex va interpretato come carattere.

Usano le regex anche i metodi:

- `replaceAll` che rimpiazza tutte le occorrenze
- `replaceFirst` che rimpiazza la prima occorrenza
- `split` divide la stringa in un array formato da ciò che non viene validato dalla regex. Può essere espresso un intero come limite massimo di elementi voluti nell'array

```java
String emails="a@b.c d@e.f g@h.i";

emails=emails.replaceAll("\\w+@","username@");
/*
 * Genera :
 * username@b.c username@e.f username@h.i
 */

for (String s: emails.split("\\w+@")){
    System.out.println(s);
    /*
     * Stampa:
     * b.c
     * e.f
     * h.i
     */
}
```

#### Matcher e Pattern

Come anticipato in precedenza, è abbastanza comune trovare i *Matcher* e *Pattern* in programmazione, poiché favoriscono il disaccoppiamento nel codice. Queste classi sono entrambe nel package `java.util.regex`.
Come già spiegato per Python, il **Pattern** deve essere da prima compilato:

```java
Pattern ptt= Pattern.compile("\\w+@");
```

Interviene a questo punto il **Matcher**, che applicherà il pattern su una determinata stringa:

```java
Matcher mtc=ptt.matcher("ajejebrazorf@patate.com linuhub@mir.kom patate@ciao gh#asda ");
```

A questo punto c'è solo l'imbarazzo della scelta: basta infatti sapere cosa offre la classe Matcher e come richiamarlo.

- `mtc.matches()` controllerà se l'intera stringa è validata dalla regex, come nel caso del *match delle stringhe* o [il fullmatch di Python](#pattern-e-matcher,-il-fullmatch). Nel caso in esempio restituirà **false**
-  `mtc.lookingAt()` controllerà se l'inizio della stringa è validato dalla regex, come il match di Python. Nel caso in esempio restituirà **true**

Esistono inoltre i metodi per rendere iterativo il processo di ricerca delle regex:

- `mtc.find()` interroga se esiste un prossimo match nella stringa, quindi manda avanti il cursore.
- `mtc.start()` preleva l'indice inizio del match corrente
- `mtc.end()` preleva l'indice di fine del match corrente
	- Supponendo `testo` la stringa di partenza, `testo.substring(mtc.start(),mtc.end())` corrisponde al match corrente
- `mtc.reset()` rimanda all'inizio il cursore (bisogna rieseguire la *find*)

Anche Java gestisce autonomamente i gruppi di cattura, per cui son disponibili i metodi:

- `mtc.group(int indice)` per prelevare il gruppo contrassegnato dall'indice passato. *Il gruppo 0 comprende tutti gli altri gruppi*
- `mtc.groupCount()` per avere il conteggio dei gruppi catturati nel match corrente

Ecco un codice di esempio per comprendere meglio l'utilizzo iterativo di Pattern e Matcher:

```java
import java.util.regex.*;
public class RegPatt{
    public static void main (String ... args){
        String testo="ajejebrazorf@patate.com linuhub@mir.kom patate@ciao gh#asda";
        Pattern ptt=Pattern.compile("(\\w+)@(\\w+)\\.(\\w+)");
        Matcher mtc=ptt.matcher(testo);
        int i=0;

        while(mtc.find()){
            System.out.println("corrispondenza "+(++i)+": "+mtc.group(0));
            System.out.println("username: "+mtc.group(1));
            System.out.println("dominio 1 : "+mtc.group(2));
            System.out.println("dominio 2 : "+mtc.group(3));
            System.out.println("prima della cattura: "+testo.substring(0, mtc.start()));
            System.out.println("dopo la cattura: "+testo.substring(mtc.end(),testo.length()));
            System.out.println("_______________________________________");
        }
       
    }
}

```

#### Help

A partire da **Java 9** è stato introdotto **jshell**, un interprete che consente di testare al volo Java. Se avete questa versione o superiore, potete attingere ad un help interattivo digitando: `java.util.regex.Matcher` e premendo più volte TAB.
Tuttavia è un help *scarno e confusionario*, nulla a che vedere con la documentazione inline di Python.

Si consiglia quindi di consultare [la javadoc sul sito](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/regex/Matcher.html), molto più completa e chiara.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.
