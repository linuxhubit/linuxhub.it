---
title: '#howtodev - Introduzione alla programmazione in Go'
published: 2021-04-16
layout: post
author: Massimiliano Noviello
author_github: linuxhubit
tags:
  - bash
---
## Introduzione

Go è un linguaggio di programmazione semplice e facile, moderno e prestante.

## Requisiti

Per poter meglio comprendere la guida è preferibile la conoscenza dei seguenti argomenti:

* operatori aritmetici per l'esecuzione di calcoli di base (addizione, moltiplicazione, etc...)
* matematica booleana (and, or, not, etc...)
* uso del sistema binario
* codifiche ASCII e Unicode
* concetto di processo, thread e green thread
* differenza tra concorrenza e parallelismo

Questi requisiti non sono tutti essenziali per la comprensione di questa guida, ma ne facilitano la comprensione e limitano la quantità di informazioni da ricercare a mano.

## Obiettivi

L'obiettivo di questa guida è portare il lettore da zero ad un livello di competenze tale che possa continuare i propri studi in modo autonomo.

Gli argomenti coperti saranno:

* primi semplici programmi
* spiegazione della sintassi di base 
* tipi base e alcuni tipi avanzati
* operazioni con i tipi di base
* funzioni 
* routine e thread
* metodi e tipi complessi
* flussi di controllo e cicli
* prime esercitazioni nel linguaggio.

Subito dopo la spiegazione di base copriremo la creazione di un breve programma

## Preparazione dell'ambiente di lavoro

È possibile lavorare con Go in vari modi:

### Installazione locale (consigliata)

Scaricare l'implementazione ufficiale di Go tramite la [nostra guida](https://linuxhub.it/articles/howto-installazione-di-go) o il gestore dei pacchetti della propria distribuzione

#### Debian/Ubuntu

Si può installare Go tramite apt con:

```bash
apt install go
```

#### RedHat/Fedora e derivate

Go può essere installato su ogni distro che usi dnf con:

```bash
dnf install golang
```

Alcune derivate RedHat però potrebbero ancora usare il vecchio yum. Se fosse è il caso allora il comando è:

```bash
yum install golang
```

#### Arch e derivate

Su Arch è possibile installare Go con pacman usando questo comando:

```bash
pacman -S go
```

#### Void e derivate

Si può usare xbps per installare Go con:

```bash
xbps-install go
```

### Ambiente web

Se si desidera scrivere ed eseguire codice Go dal browser, è disponibile il [Go playground](https://play.golang.org/) ufficiale (alquanto limitato) o il sito di [Replit](https://replit.com/languages/go) (un po' meno limitato, mi permetto di consigliare quest'ultimo tra le due).


## Scheletro del programma

Un programma in Go deve seguire uno schema preciso. Analizziamo un esempio di hello world:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
```

1. Definiamo il pacchetto principale con `package main`
2. Importiamo il pacchetto `fmt` (fmt sta per format)
3. Definiamo la funzione principale con `func main() {`
4. Richiamiamo la funzione `Println` dal pacchetto `fmt` per stampare a schermo la frase "Hello World!"
5. Chiudiamo il blocco di codice della funzione con `}`

Ora che ci siamo fatti un'idea di quello che sta scritto, analizziamo tutto nel dettaglio.


## Commenti (stile C-like)

Un commento delimita una porzione di testo che non verrà considerata dal compilatore

Esistono due tipi di commenti:

#### Commenti in linea

Ogni cosa dopo il delimitatore `//` verrà ignorata. Questo genere di commenti è consigliato se si usa una sola linea di commento (piccole specifiche)

```go
fmt.Println("qualcosa") // Questo verrà ignorato
// Anche questo

// fmt.Println("Ciao") questa riga non verrà mai eseguita
```

#### Commenti in blocco

Ogni cosa contenuta nei delimitatori `/*` `*/` sarà ignorata. Questo genere di commenti è consigliato se il commento è particolarmente lungo e articolato, tanto da dover essere disposto su più righe

```go
/*
Tutto questo
verrà ignorato
*/

fmt.Println("ciao" /*, "mondo"*/)
/* La parola mondo verrà ignorata */
```

## Pacchetti

I programmi in Go si suddividono in pacchetti.
La parola chiave `package` è obbligatoria e serve per definire un pacchetto.
Il pacchetto chiamato "main" è quello principale, dal quale comincia l'esecuzione del programma.

### Import

All'interno del proprio pacchetto sarà possibile importarne altri grazie alla parola chiave `import`. È possibile importare sia usando le parentesi `()` che scrivendo direttamente il nome del pacchetto circondato da doppi apici `""`.

```go
import (
  "fmt"
  "strings"
  "net/tcp"
)

import "fmt"
import "strings"
import "net/tcp"
```

## Tipi

Un tipo è come si può intuire dal nome, il tipo di dato con cui stiamo lavorando.

Possiamo suddividere i tipi in varie categorie e sottocategorie.



### Numerici

#### Numeri interi (integer) segnati

Esistono vari tipi numerici interi, essi possono avere varie dimensioni. Quelli che vedremo ora sono dotati di bit del segno

Un `int8` ad esempio occuperà 8 bit o un byte. Occupando 8 bit il raggio di valori che potrà assumere questo tipo spazia da `-128` a `127` poiché il massimo numero ottenibile con 8 bit è `256` (`128+127` fa `255`, aggiungendo anche `0` arriviamo a `256` possibili valori).

Di seguito una tabella dei tipi completa:

| Tipo  | Raggio                                                       |
| ----- | ------------------------------------------------------------ |
| int8  | `-128` a `127`                                               |
| int16 | `-32768` a `32767`                                           |
| int32 | `-2147483648` a `2147483647`                                 |
| int64 | `-9223372036854775808` a `9223372036854775807`               |
| int   | Dipendente dall'implementazione (generalmente uguale a `int32`) |



#### Numeri interi (integer) non segnati

Se non si dovesse avere bisogno di numeri minori di zero allora è possibile riservare quello spazio per poter esprimere un valore più alto. Per esempi il tipo `uint8` occuperà 8 bit e sarà non segnato (u = unsigned), il suo raggio di valori varia tra `0` a `255`, potendo assumere quindi sempre un totale di `256` valori differenti.

Ecco una tabella completa anche degli interi non segnati:

| Tipo   | Raggio                                                       |
| ------ | ------------------------------------------------------------ |
| uint8  | `0` a `255`                                                  |
| uint16 | `0` a `65535`                                                |
| uint32 | `0` a `4294967295`                                           |
| uint64 | `0` a `18446744073709551615`                                 |
| uint   | Dipendente dall'implementazione (generalmente uguale a `uint32`) |

#### Numeri in virgola mobile (floating) e numeri complessi (complex)

Per il bene della semplicità non scenderò nei dettagli qui, ma per esprimere numeri con la virgola possiamo usare i tipi `float32` e `float64`.

È anche possibile utilizzare numeri complessi grazie al tipo `complex`.

`float` dipende dall'implementazione, ma generalmente è uguale a `float32`.

### Booleani

Nulla di complicato, sono tipi che possono assumere due valori, vero (`true`) e falso (`false`).

### Casting dei tipi

Per convertire un tipo in un altro è possibile effettuare il casting.

```go
uint8(10) // Questo 10 non tipizzato verrà convertito in uint8
```

*NB: I valori non tipizzati sono valori il cui tipo non è ancora stato deciso*


###  Altri tipi numerici

Alcuni tipi possono assumere anche altri nomi poiché vengono usati per rappresentare diversi tipi di dati.

Ecco alcuni esempi:

| Tipo | Equivalente | Uso comune                                     |
| ---- | ----------- | ---------------------------------------------- |
| byte | uint8       | Esprimere caratteri ASCII o semplicemente byte |
| rune | uint32      | Esprimere caratteri Unicode                    |



#### Rune

Rune è utile per lavorare con Unicode, ed è il tipo che si usa di default per i caratteri in Go.

```go
'a' // Uguale a 97, ma è una runa
'\n' // Uguale a 10, ma è una runa

'a' + 1 // Questo codice è valido
'a' + '\n' // Anche questo
```

#### Byte

Tramite casting è possibile lavorare con i byte come se fossero semplici numeri, dato che si tratta semplicemente di alias.

È anche possibile esprimere caratteri come byte racchiudendo il carattere tra singoli apici `''` effettuando il casting a byte.

Esempio:

```go
byte('a') // Uguale a 97
byte('\n') // Uguale a 10

byte('a') + 1 // Questo codice è valido
byte('a') + '\n' /* Anche questo
                    ('\n' verrà automaticamente convertito in byte) */
```


### Tipi composti

Il linguaggio possiede alcuni tipi composti da più tipi semplici.

#### Array

Un insieme di valori può essere raccolto in un array, cioè una lista a lunghezza fissa.

Il tipo di un array si esprime con `[n]t` dove `n` è la lunghezza e `t` è il tipo dei valori contenuto in esso.

`[10]int` conterrà 10 numeri interi.

È possibile richiamare un singolo valore da un array specificandone l'indicine tra parentesi quadre `[]`

```go
mioArray[0] = 10 // Ora il primo valore di mioArray sarà uguale a 10
```

*NB: Gli indici iniziano sempre da `0`*

#### Slice

Se un array ha una grandezza predefinita, quella di una slice è dinamica.

Quest'ultima non è altro che una referenza ad un array già esistente per rendere più semplice la vita dello sviluppatore.

Le slice si esprimono in modo simile ad un array, `[]t` dove `t` è il tipo dei valori contenuti in essa. È anche possibile inizializzare delle slice con la funzione `make`, così da specificarne una lunghezza iniziale e la capacità dell'array sottostante (che sarà solo un base della slice, essa non imporrà reali limiti di capienza).

```go
make([]int, 10) // Slice di int con lunghezza 10

make([]int, 0, 10) // Slice di int con lunghezza 0 e capienza 10
```

Si può ottenere una slice da un array usando due valori separati da `:` al posto dell'indice.

```go
mioArray[0:9] // Sarà una slice che prende i primi 10 valori di mioArray
```

(È anche possibile ottenere una slice di una slice in questo stesso modo)

#### Stringhe

Per esprimere del testo ci basterà usare una stringa.

Possono essere rappresentate in due modi

* Con i doppi apici `""`. Verrà effettuato l'escape (quindi la "traduzione") di caratteri come il newline (`\n`) per andare a capo o il tabulatore (`\t`).
  
* Con gli accenti gravi &#96; &#96; . Non verrà effettuato l'escape di caratteri speciali, tuttavia sarà possibile esprimere la stringa su più righe.
  

```go
"Testo\nA capo"

`Testo
A capo`

// Le due sono equivalenti
```

È possibile ottenere delle stringe partendo da dagli array o slice di byte o rune:

```go
string([]byte{104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100})
string([]rune{104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100})
// Queste due stringhe equivalgono a "hello world"
```

Vale anche il processo inverso:

```go
[]byte("hello world")
[]rune("hello world")

/*
Entrambe varranno:
104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100
*/
```

#### Strutture

Le strutture sono essenzialmente un aggregato di attributi (valori) e metodi (funzioni).

È possibile definirle specificando nome della strutture, nome degli attributi e tipo degli attributi:

```go
type nomeDellaStruttura struct {
    attributo1 unTipo
    attributo2 unTipo
    attributo3 unAltroTipo
}
```

### Tipi puntatori

Un puntatore è un tipo speciale, esso punta direttamente all'indirizzo di memoria di una variabile, dandoci quindi la possibilità di lavorare sullo stesso valore da posizioni differenti.

Un puntatore viene rappresentato scrivendo il tipo a cui punta preceduto da un asterisco `*` (Per esempio `*int`).

Se non puntano ad un indirizzo di memoria essi possono assumere un valore nullo `nil`



## Operatori

### Operatori aritmetici

Come intuibile dal nome, essi consentono di eseguire operazioni aritmetiche.

Eccone un elenco:

| Simbolo | Operatore        | Descrizione                                     |
| ------- | ---------------- | ----------------------------------------------- |
| `+`     | Addizione        | Addiziona due numeri                            |
| `-`     | Sottrazione      | Sottrae due numeri                              |
| `*`     | Moltiplicazione  | Moltiplica due numeri                           |
| `/`     | Divisione        | Divide due numeri                               |
| `%`     | Modulo (o resto) | Ritorna il resto della divisione tra due numeri |

E ora dei piccoli esempi per spiegare gli operatori di incremento e decremento:

```go
a := 1

a++ // adesso a vale 2

a-- // adesso a vale 1
```

```go
a := 1

a += 2 // adesso a vale 3

a -= 3 // adesso a vale 0
```

### Operatori Logici

Essi permettono di effettuare confronti tra più valori booleani, eccone una lista:

| Simbolo  | Operatore | Descrizione                                  |
| -------- | --------- | -------------------------------------------- |
| `&&`     | E (and)   | Controlla se due booleani entrambi sono veri |
| <code> &#124;&#124; </code>   | O (or)    |                         |
| `!`      | Non (not) | Inverte un booleano                          |

Ognuna di queste operazioni ritorna **sempre un booleano**, indipendentemente dai valori confrontati.

### Operatori relazionali

Grazie ad essi possiamo effettuare confronti tra più valori, la lista comprende:

| Simbolo | Operatore         | Descrizione                                            |
| ------- | ----------------- | ------------------------------------------------------ |
| `==`    | Uguale            | Controlla se due valori sono uguali                    |
| `!=`    | Diverso           | Controlla se due valori sono differenti                |
| `>`     | Maggiore          | Controlla se un valore è maggiore di un altro          |
| `<`     | Minore            | Controlla se un valore è minore di un altro            |
| `>=`    | Maggiore o uguale | Controlla se un valore è maggiore o uguale ad un altro |
| `<=`    | Minore o uguale   | Controlla se un valore è minore o uguale ad un altro   |

Come nel caso degli operatori logici, anche questi ritornano **sempre un booleano**, indipendentemente dai valori confrontati.

### Operatori bit per bit

Tali operatori consentono di effettuare operazioni sui singoli bit.

Questo implica che ogni numeri passatogli verrà convertito in base due.

| Simbolo | Operatore                                       | Descrizione                                 |
| ------- | ----------------------------------------------- | ------------------------------------------- |
| `&`     | E bit per bit (bitwise and)                     | Esegue `and` su ogni singolo bit            |
| <code>&#124;</code>   | O bit per bit (bitwise or)                      | Esegue `or` su ogni singolo bit             |
| `^`     | XOR bit per bit (bitwise XOR)                   | Esegue `xor` su ogni singolo bit            |
| `&^`    | NOR bit per bit (bitwise NOR)                   | Esegue `nor` su ogni singolo bit            |
| `<<`    | Spostamento binario verso sinistra (left shift) | Sposta ogni bit verso sinistra di `x` volte |
| `>>`    | Spostamento binario verso destra (right shift)  | Sposta ogni bit verso destra di `x` volte   |

Ognuno di essi ritorna **sempre un numero**.

*NB: Per `x` si intende il secondo valore dell'operazione*

### Operatori d'assegnazione

Essi consentono di effettuare operazioni ed assegnare variabili con un solo operatore.

| Simbolo | Operatore                                       | Descrizione                                                  |
| ------- | ----------------------------------------------- | ------------------------------------------------------------ |
| `=`     | Assegnazione semplice                           | Assegna `x` ad una variabile                                 |
| `++`    | Assegnazione con incremento                     | Incrementa una variabile di `1`                              |
| `+=`    | Assegnazione con incremento di x                | Incrementa una variabile di `x`                              |
| `--`    | Assegnazione con incremento                     | Decrementa una variabile di `1`                              |
| `-=`    | Assegnazione con decremento di x                | Decrementa una variabile di `x`                              |
| `*=`    | Assegnazione moltiplicazione                    | Assegna ad una variabile il risultato della sua moltiplicazione con `x` |
| `/=`    | Assegnazione divisione                          | Assegna ad una variabile il risultato della sua moltiplicazione con `x` |
| `%=`    | Assegnazione modulo                             | Assegna ad una variabile il resto della sua divisione con `x` |
| `<<=`   | Assegnazione spostamento binario verso sinistra | Assegna ad una variabile il suo valore con i bit spostati verso sinistra di `x` posti |
| `>>=`   | Assegnazione spostamento binario verso destra   | Assegna ad una variabile il suo valore con i bit spostati verso destra di `x` posti |
| `&=`    | Assegnazione AND bit per bit                    | Assegna ad una variabile suo valore dopo un'operazione AND bit per bit |
| <code>&#124;=</code>   | Assegnazione OR bit per bit                     | Assegna ad una variabile suo valore dopo un'operazione OR bit per bit |
| `^=`    | Assegnazione XOR bit per bit                    | Assegna ad una variabile suo valore dopo un'operazione XOR bit per bit |



## Variabili

È possibile conservare dei valori in dei contenitori chiamati variabili.

### Variabili locali

Una variabile locale è utilizzabile solo all'interno del proprio scopo, cioè l'area in cui è stata definita.

Esse possono essere definite in due modi:

#### Dichiarazione esplicita

Essa consiste nel dichiarare il tipo di una variabile a mano prima di assegnarne un valore.

```go
var primaVariabile int32 = 1
var secondaVariabile int64 = 1
```

#### Dichiarazione implicita o inferenza del tipo

Ossia il rilevamento automatico di quest'ultimo nella fase di dichiarazione della variabile.

Per questo possiamo usare una "short variable declaration" (letteralmente "dichiarazione corta di variabile")

```go
unaVariabile := 1 // Verrà assunto il tipo int
```

### Variabili globali

Le variabili globali sono accessibili in ogni parte del programma. Esse possono essere solo definite **fuori da una funzione** in due modi:

#### Dichiarazione esplicita

Pressoché identica alla dichiarazione esplicita di una variabile locale

```go
var primaVariabile int32 = 1
var primaVariabile int64 = 1

// oppure

var (
    primaVariabile int32 = 1
    secondaVariabile int64 = 1
)
```

#### Dichiarazione implicita o inferenza del tipo

A differenza delle variabili locali qui non sarà necessario usare il `:=`, ma `var` sarà sempre richiesto.

```go
var unaVariabile = 1 // Verrà assunto il tipo int
```

### Puntatori a variabili

Per prendere l'indirizzo di memoria di una variabile così da creare un puntatore ad essa possiamo usare la e commerciale (`&`):

```go
miaVar := 10 // il tipo è int

mioPuntatore := &miaVar // il tipo è *int
```

Se proviamo però a lavorare con un puntatore noteremo che non è altro che un indirizzo di memoria e non il valore al quale stiamo puntando.

Per poter interagire con esso dobbiamo prima **deferenziarlo** usando l'asterisco (`*`):

```go
miaVar := 10 // il tipo è int

mioPuntatore := &miaVar // il tipo è *int

unAltraVar := *mioPuntatore // il tipo è int
```

Nell'esempio qui sopra deferenziando `mioPuntantore` abbiamo ottenuto il valore originale di `miaVar`.

Tramite la deferenziazione possiamo anche modificare quel valore:

```go
miaVar := 10 // il tipo è int

mioPuntatore := &miaVar // il tipo è *int

*mioPuntatore = 3 // miaVar ora è uguale a 3
```

Attenzione però, deferenziando un puntatore nullo (`nil`) otterremo un errore che fa andare in panico (e quindi generalmente in crash) il programma.

```go
var mioPuntatore *int = nil

mioPuntatore // vale nil

*mioPuntatore // manda in crash il programma
```

### Costanti

Le costanti così come le variabili, solo che non posso assumere valori come array e slice.

Esse vengono dichiarate con la parola chiave `const`.

```go
const primaCostante int64 = 10

const (
    secondaCostante = 20
    terzaCostante int8 = 30
)
```

## Funzioni

In Go è possibile definire funzioni. Una funzione è un pezzo di codice riutilizzabile che può accettare parametri e ritornare risultati.

### Blocchi di codice

Un blocco di codice non è altro che una porzione di istruzioni raccolta in delle parentesi graffe.

```go
{
    // Qui va il codice da eseguire
}
```

Essi delimitano anche uno **scopo**, argomento che verrà approfondito in seguito.

#### Definizione di una funzione

Per definire una funzione in Go possiamo usare la parola chiave `func`

L'esempio che segue mostra come definire una funzione vuota chiamata "miaFunz"

```go
func miaFunz() {
}
```

### Accettare parametri

Una funzione può accettare uno o più parametri definendoli col loro nome e tipo:

In questo esempio possiamo notare una funzione con due parametri:

* `parametroUno` di tipo `string`
* `parametroDue` di tipo `int`

```go
func miaFunz(parametroUno string, parametroDue int) {
}
```

Se si hanno più parametri dello stesso tipo è possibile anche scrivere una sola volta il tipo, come in questo esempio:

```go
func miaFunz(parametroUno, parametroDue string) {
}
```

Se volessimo modificare un parametro direttamente di una funzione senza bisogno di ritornare potremmo semplicemente usare un puntatore.

```go
func miaFunz(mioParametro *int) {
    *mioParametro = 1 // deferenziamo mioParametro prima di modificarlo
}
```

### Ritornare un risultato

Una funzione può ritornare uno o più risultati semplicemente scrivendone i tipi prima dell'apertura del blocco di codice e usando la parola chiave `return`.

```go
func ritornaUnValore() string {
    return "valore"
}

func ritornaDueValori() (string, string) {
    return "valore1", "valore2"
}
```

*NB: Racchiudere sempre i tipi in delle parentesi tonde quando si vuole ritornare più valori*

### Richiamare una funzione

Per richiamare una funzione basta scriverne il nome seguito da delle parentesi tonde in cui andranno inseriti gli eventuali argomenti.

Definiamone una che prenda due numeri e ne ritorni la somma così:

```go
func somma(n, m int) int {
    return n + m
}
```

A questo punto possiamo semplicemente richiamarla con

```go
somma(10,5) // Ritornerà 15
```

Se volessimo passare ad una funzione un puntatore ci basterebbe usare la e commerciale (`&`) come precedentemente spiegato.

Ecco l'esempio di una funzione che raddoppia un numero e invece di ritornare il risultato cambia direttamente il valore della variabile originale:

```go
func doppio(n *int) {
    *n = *n + *n
}


miaVar := 10

doppio(&n) // Adesso miaVar vale 20
```

### Metodi

In Go i metodi non sono altro che un modo più semplice di scrivere una funzione che prende in input un tipo creato dall'utente.

Si definiscono come normali funzioni, ma prima dell'identificatore bisogna specificare il tipo tra parentesi in questo modo:

```go
type mioTipo struct {
    // contenuto
}

func (nomeParametro mioTipo) mioMetodo() {
    // contenuto
}
```

Se vogliamo modificare i contenuti di una struttura o semplicemente risparmiarci un'allocazione quando richiamiamo il metodo, possiamo passare il tipo come puntatore.

```go
type mioTipo struct {
    // contenuto
}

func (nomeParametro *mioTipo) mioMetodo() {
    // contenuto
}
```

### Chiusure

Go supporta le cosiddette "chiusure", ossia delle funzioni anonime che possono lavorare con delle variabili accessibili dallo stesso scopo nel quale sono esse sono state definite.

La definizione di una chiusura è identica a quella di una normale funzione, ma non richiede la scrittura dell'identificatore.

```go
miaVar := 10


func() {
    miaVar = 2
}() // le () finali servono per eseguirla subito dopo


// ora miaVar vale 2
```

È anche possibile creare delle funzioni che accettino delle chiusure (o funzioni normali) come parametro. Basta scrivere la firma della funzione al posto del tipo.

Ecco un esempio dove una funzione ne accetta un'altra, la esegue, e ne elabora il risultato:

```go
func aggiungiUno(funz func() int) int {
    return funz() + 1
}

aggiungiUno(
    func() int {return 10}, // la virgola si usa sempre in una lista di argomenti a cascata
)
```

### Funzione main

La funzione `main` è obbligatoria in un pacchetto `main` ed è la prima ad essere eseguita a meno che non sia presente una funzione `init`.

## Goroutine

Questa parte potrebbe risultare un po' più complessa e ma comunque facente parte integrante del linguaggio, per cui cercherò di farla più semplice possibile e senza scendere in dettagli.

Una goroutine è un green thread. La funzione `main` gira nella goroutine principale, ma possiamo anche crearne di nostre in modo semplicissimo con la parola chiave `go`

Per esempio potremmo fare:

```go
go primaFunzione()
go secondaFunzione()
go func() { // chiusure  
}()
```

e tutte e tre le funzioni verranno eseguite in modo concorrente.

Quando una goroutine termina l'esecuzione, anche le figlie verranno forzate ad interromperla, per questo normalmente si usano metodi di blocco come attese, waitgroup, e canali.

Tali casi non verranno trattati da questa guida che vuole fornire solo un'infarinatura delle goroutine.

## Controllo di flusso

### If-else

Si può usare il costrutto if per eseguire codice solo se una determinata condizione è soddisfatta.

* `if` viene usato come primo controllo ed eseguirà il codice se la condizione è soddisfatta.
  
* `if else` è opzionale e consente di effettuare altri controlli con condizioni differenti (a patto che quelli precedenti non siano andati a buon fine).
  
* `else` è anche esso non obbligatorio e va posto come ultimo controllo. Indica una porzione di codice che verrà eseguita se nessuna condizione è soddisfatta.
  

```go
n := 1

a := 2

if a == 2 {
    // questo verrà eseguito
}

if n > 2 && a < n {
    // questo non verrà eseguito
} else if n < 0 {
    // neanche questo
} else {
    // questo sì
} 
```

### Switch

Uno switch consente di effettuare un controllo sul valore di una singola variabile, e quindi non su una condizione qualsiasi.

Ecco un esempio di tale controllo:

```go
n := 10

switch n {
case 1:   
    // non verrà eseguito
case 2, 3:
    // non verrà eseguito
default:
    // verrà eseguito
}
```

Default è opzionale e viene eseguito dal momento in cui nessun caso si sia avverato.

È anche possibile usare la parola chiave `falltrough` per far continuare il controllo dopo l'esecuzione del caso. Per bloccare un `falltrough` è possibile usare un `break`

```go
n := 10

switch n {
case 10:
    // verrà eseguito
    falltrough
case 11:
    // verrà eseguito lo stesso
}
```

### Goto

Utile per saltare direttamente ad un determinato punto nel codice segnato da un'etichetta (`label`).

L'esempio qui sotto continuerà a stampare all'infinito la frase "Hello World":

```go
    testo: := "Hello World"
miaEtichetta:
    fmt.Println(testo) // stampa la variabile testo
    goto miaEtichetta
```

Per motivi di sicurezza non è possibile usare `goto` per andare in un altro scopo o saltare la definizione di una variabile

## Cicli

Generalmente nella programmazione sono presenti vari tipi di cicli, ma in Go esiste solo la parola chiave `for` che assume diversi comportamenti in base al contesto.

### For infinito/loop

Per ripetere un pezzo di codice all'infinito è possibile racchiuderlo in un semplice `for`, senza specificare condizioni o altro.

```go
for {
    // questo codice verrà eseguito all'infinito
}
```

È possibile uscire da tale ciclo con un `break`

```go
for {
    // questo codice verrà eseguito una sola volta 
    break // questo break esce dal ciclo
}
```

È possibile anche saltare un singolo passaggio de ciclo invece di arrestarlo del tutto con la parola chiave `continue`.

Nonostante introdotte in questa sezione, le parole chiavi `break` e `continue` sono disponibili in ogni tipo di ciclo `for`.

### For condizionale/while

Si può far andare avanti un ciclo finché una data condizione viene rispettata.

Nell'esempio sotto il ciclo va avanti finché `n` non diventa pari a `10`:

```go
n := 0

for n < 10 {
    n++ // questo codice verrà eseguito 10 volte
}
```

### For classico/for

Se si conosce già il numero di iterazioni è possibile creare un ciclo for che vada avanti per un tempo prestabilito.

La sintassi in questo caso può essere scomposta con:

`for` `definizione di contatore;` `condizione;` `incremento`

```go
for i := 0; i < 10; i++ {
    // questo ciclo verrà eseguito 10 volte
}
```

### For iterativo/range

Se si ha qualcosa su cui iterare come una slice o un array, è possibile farlo grazie alla parola chiave `range`.

```go
lista := [10]int{1,2,3,4,5,6,7,8,9,10}

for i, v := range lista {
    // questo codice verrà eseguito 10 volte
}
```

Laddove i è l'indice, cioè numero dell'iterazione (partendo da zero) e v è il valore che stiamo prendendo dalla lista (in pratica `v == lista[i]`).

---

## Esercitazione

Adesso proveremo a creare un breve programma che genera un numero casuale all'utente e gli chiede di inserirli in input.

**Attenzione**

* Il Go playground non supporta l'input inserito dall'utente.
  
* In ambienti di test come il Go playground o repl it la generazione di numeri casuali potrebbe non funzionare.
  

### Scheletro

Come prima cosa scriviamo lo scheletro del programma

```go
package main

import (
)

func main() {
}
```

E ora iniziamo a condire il tutto.

### Import dei moduli

Importiamo i moduli a noi necessari

* `fmt` per stampare e prendere l'output
  
* `math/rand` per generare il numero casuale
  
* `time` per stabilire il seme di generazione del numero casuale
  

### Impostiamo i limiti

Decidiamo quali limiti vogliamo per i nostri numeri casuali. In questo caso voglio che vengano generati da `1` a `10`, quindi creerò due costanti:

```go
const (
    min = 1
    max = 10
)
```

### Creiamo una funzione

Adesso creiamo la funzione che genererà numeri casuali:

```go
func generaNumer() int {
    return (rand.Intn(max-min) + min)
} // genera un numero da min a max e lo ritorna
```

### Nel main

Andiamo a scrivere il codice necessario all'interno della funzione main

#### Impostiamo il seme di generazione

```go
rand.Seed(time.Now().UnixNano())
```

1. `time.Now()` ci ritorna l'ora locale
  
2. `.UnixNano()` la esprime in tempo unix in nanosecondi (ossia tempo passato dal 01/01/1970 ad oggi in nanosecondi)
  
3. `rand.Seed()` accetta un valore numerico e lo usa come seme per generare numeri casuali


**Attenzione:** *il seme va stabilito solo una volta in tutto il programma*

#### Dichiariamo una variabile vuota

In essa l'utente potrà inserire la propria scelta:

```go
var scelta int
```

#### Chiediamo all'utente di inserire un input

Tramite `fmt.Print` possiamo stampare a schermo una stringa **che *non* termini con una nuova riga**:

```go
fmt.Print("Indovina un numero da 1 a 10: ")
```

#### Inviamo input alla variabile vuota

Con `fmt.Scan` possiamo inviare un input numerica alla variabile tramite un puntatore ad essa:

```go
fmt.Scan(&scelta)
```

#### Facciamo il confronto

Richiamiamo la funzione `generaNumero` e confrontiamola con la variabile `scelta`

```go
if scelta == generaNumero() {

} else {

} 
```

#### Comunichiamo l'esito all'utente

Possiamo usare `fmt.Println` per stampare a schermo una stringa **che termini con una nuova riga** (a differenza di `fmt.Print`)

```go
if scelta == generaNumero() {
    fmt.Println("Complimenti, hai indovinato!")
} else {
    fmt.Println("Peccato, hai perso...")
}
```

### Risultato finale

Se tutto è andato per il verso giusto alla fine si otterrà un programma simile a questo

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

const (
    min = 1
    max = 10
)

func generaNumero() int {
    n := rand.Intn(max-min) + min
    return n
}

func main() {
    rand.Seed(time.Now().UnixNano())

    var scelta int

    fmt.Print("Indovina un numero da 1 a 10: ")
    fmt.Scan(&scelta)

    if scelta == generaNumero() {
        fmt.Println("Complimenti, hai indovinato!")
    } else {
        fmt.Println("Peccato, hai perso...")
    }
}
```

Ora puoi eseguire il tutto con `go run` e compilare con `go build` se hai installato il compilatore, altrimenti usa l'apposito tasto dagli ambienti web.

## Conclusioni

Questo è quanto. Non era poi così difficile, vero?

Per ogni dubbio, chiarimento o curiosità ci trovate al nostro [gruppo Telegram](https://t.me/linuxpeople).
