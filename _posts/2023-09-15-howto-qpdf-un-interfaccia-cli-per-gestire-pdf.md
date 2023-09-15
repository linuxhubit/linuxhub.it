---
class: post
title: "#howto - qpdf: un'interfaccia CLI per gestire PDF"
date: 2023-09-15 07:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor:
coauthor_github:
published: true
tags:
- ubuntu
- fedora
- archlinux
- windows
---

Il formato PDF è lo standard di condivisione di documenti pensati per essere letti, stampati ma non più modificati nel contenuto una volta distribuiti.

Tuttavia, in determinati casi il risultato può non soddisfare: `qpdf` è uno strumento, disponibile da riga di comando, pensato per trasformare i documenti preservandone però i contenuti (ad esempio: unire, tagliare e ruotare pagine).

In questo articolo verranno presentati alcuni esempi di utilizzo, particolarmente utili a chiunque abbia spesso a che fare con i PDF.


## Installazione

### Ubuntu

```bash
apt install qpdf
```

### Fedora

```bash
dnf install qpdf
```

### Arch Linux

```bash
pacman -S install qpdf
```

### Altro

Altri file di installazione (zip comprendenti eseguibili e librerie, o eseguibili .exe per Windows) sono disponibili sulla [pagina releases](https://github.com/qpdf/qpdf/releases) su GitHub.


## Unione di più documenti

Nel seguente esempio, i tre PDF `primo.pdf`, `secondo.pdf` e `terzo.pdf` vengono uniti in `completo.pdf`:

```bash
qpdf --empty --pages primo.pdf secondo.pdf terzo.pdf -- completo.pdf
```

## Unione di solo alcune pagine

È possibile unire più PDF anche solo selezionando alcune delle pagine, usando la seguente notazione:
- `N-M` per selezionare le pagine da N a M (`1-3` seleziona le pagine 1, 2 e 3);
- `N,M` per selezionare solo le pagine N e M (`1,3` seleziona le pagine 1 e 3);
- `rN` seleziona la N-esima pagina partendo dalla fine (in un pdf da 10 pagine, `r2` è la nona);
- `z` seleziona l'ultima pagina.

Nel seguente esempio, i due PDF `primo.pdf` (pagine 1, 3, 4, 5) e `secondo.pdf` (pagine 2, 3, 4, 6, 7, 8) vengono uniti in `completo.pdf`:

```bash
qpdf --empty --pages primo.pdf 1,3-5 secondo.pdf 2-4,6-8 -- completo.pdf
```

## Estrazione di alcune pagine

Per estrarre solo alcune delle pagine, la sintassi non cambia molto.

Nel seguente esempio, le pagine 8, 9 e 10 vengono estratte dal pdf `ebook.pdf` e salvate in `estratto.pdf`.

```bash
qpdf --pages ebook.pdf 8-10 -- estratto.pdf
```

## Estrazione in blocchi di tutte le pagine

Nel caso si desideri spezzare un singolo PDF in molti PDF da un numero di pagine prefissato (o, per esempio, estrarre ogni pagina in un PDF a parte), si può ricorrere a `--split-pages`:

```bash
qpdf --split-pages=1 completo.pdf pagina_numero_%d.pdf
```

## Rotazione

L'esempio seguente ruota le prime quattro pagine del PDF `fotocopia.pdf` in `corretto.pdf`, le prime due di 90° e le restanti di 180°:

```bash
qpdf --rotate=90:1,2 --rotate=180:3,4 fotocopia.pdf corretto.pdf
```

## Password: aggiungere o rimuovere la protezione

Per proteggere un PDF con password, è necessario specificare due password: la prima è la `user-password` (la password necessaria per visualizzare il PDF) mentre l'altra è la `owner-password` (la password necessaria per restringere la modifica, la stampa, la copia del testo e delle risorse grafiche, e operazioni simili - in ogni caso, la `owner-password` è una protezione facilmente aggirabile rispetto alla `user-password`).

Nel seguente esempio, la protezione è a 256 bit (sebbene sia sconsigliato, si può anche scegliere di optare per una protezione a 128 bit o 40 bit)

```bash
qpdf --encrypt user_psw owner_psw 256 -- senza_protezione.pdf rc4.pdf
```

Per motivi legati alla retrocompatibilità (che, salvo rari casi, non è più un problema nel caso dei PDF), invece dello standard RC4 è possibile usare il più recente e più sicuro AES (a 128 o 256 bit):

```bash
qpdf --encrypt user_psw owner_psw 256 --use-aes=y -- senza_protezione.pdf aes.pdf
```

Per rimuovere la password ad un PDF, basta ricorrere ai parametri `--decrypt` e `--password` come nel seguente esempio:

```bash
qpdf --password=psw --decrypt protetto.pdf senza_protezione.pdf
```

## Compressione

Opzionalmente, i PDF comprimono i contenuti al loro interno. Qualora ciò non fosse vero e si volesse forzare la compressione per risparmiare spazio ricorrendo a `--compression-level=N` (con N compreso tra 1, ossia bassa ma rapida compressione, e 9, compressione lenta ma migliore):

```bash
qpdf --compression-level=9 non_compresso.pdf compresso.pdf
```

Se un PDF è già compresso (magari con un livello di compressione più basso), è necessario aggiungere `--recompress-flate`:

```bash
qpdf --compression-level=9 --recompress-flate compresso.pdf compressione_massima.pdf
```

Questo tipo di compressione è particolarmente efficace per contenuti testuali, ma non per contenuti binari (ad esempio contenuti multimediali come le immagini), per i quali forzare la compressione potrebbe essere controproducente (il testo si comprime molto bene, mentre i contenuti binari - spesso già compressi - sono molto meno comprimibili).

Nel caso in cui si volesse comprimere un PDF di questo genere, è possibile usare i parametri `--linearize` e `--optimize-images`. Se neanche questo dovesse aiutare, diventa necessario sostituire manualmente i contenuti di dimensione maggiore con quelli di dimensione minore.

## Riparazione

Se si vuole controllare lo stato di un PDF, sia esso danneggiato o meno, va usato `--check`:

```bash
qpdf --check input.pdf
```

In caso di errori, `qpdf` provvederà automaticamente a riparare il PDF incriminato se possibile:

```bash
qpdf input.pdf riparato.pdf
```

## Maggiori informazioni

Il codice sorgente del progetto è su [GitHub](https://github.com/qpdf/qpdf), mentre la documentazione è su [ReadTheDocs](https://qpdf.readthedocs.io/en/stable/).
