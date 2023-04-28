---
class: post
title: '#howto - Recuperare i dati di ecryptfs'
date: 2023-04-28 08:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: gaetanovirg
coauthor_github: gaetanovirg
published: false
tags:
- ecryptfs
- recover
---

In un articolo precedente si è visto come [cifrare le cartelle con ecryptfs](https://linuxhub.it/articles/howto-cifrare-file-e-cartelle-con-cryfs-e-ecryptfs/) e in un altro [come cifrare la propria cartella home](https://linuxhub.it/articles/howto-cifrare-la-home-ecryptfs/). Ma se il nostro pc smette di funzionare, come recuperiamo i nostri dati?


## Montare una cartella semplice 

Se la cartella da recuperare non è la home, supponendo la cartella cifrata nel percorso `/percorso/cartellacifrata` andrà semplicemente montata in un nuovo percorso. Quindi si crea una cartella di supporto: 

```bash
cartellaMounting
```

e si utilizza questo comando per montarla: 

```bash
mount -t ecryptfs /percorso/cartellacifrata cartellaMounting
```

Verranno richiesti nuovamente tutti i parametri inseriti la prima volta: 

- il tipo di algoritmo usato
- il numero di bytes per la cifratura
- se è abilitata la cifratura dei nomi 

etc... Se non si dispongono più di queste informazioni provare a fornire  più comnbinazion. É probabile che tutte le risposte di default siano già una combinazione corretta.

Ci sarà un warning di questo genere: 

```
WARNING : Based on the contents of [.ecryptfs/sig-cache.txt] it looks like you have never mounted with this key before. THis could mean that you have typed your passphrase wrong
```

Ignorare l'avviso e digitare "`yes`". 

Da sottolineare che l'operazione di mounting, anche *se le informazioni fornite sono errate*, va sempre a *buon fine*, il discriminante per capire se realmente l'operazione ha avuto successo o no è il contenuto, quindi provare a leggere un qualunque file all'interno della cartella montata (non basta che il nome sia visibile correttamente, leggere anche il contenuto è importante).

In caso ci siano `errori di input/output` oppure i file letti contengono solo sequenze binarie (o ancora non ci sia alcun file), smontare la cartella con: 

```bash
umount cartellaMounting
```

e riprovare con configurazioni diverse.

## La Home cifrata

Il discorso cambia quando la cartella cifrata era la cartella home. Infatti non si è consapevoli direttamente di quali sono le caratteristiche usate per il mounting della cartella cifrata, ma si possono comunque usare dei comodi tool per recuperare i file


### Dispositivo di archiviazione integro

Se l'hard disk (o qualunque altro device di memorizzazione utilizato) funziona ancora e non presenta una perdita di dati, è possibile montare la propria cartella di ecryptfs utilizzando la password.

Supponendo di montare la cartella *home* del vecchio drive nella cartella `/mnt/home`, si troverà al suo interno una cartella `.ecryptfs`nella quale a sua volta si troverà la cartella relativa all'utente che aveva la home cifrata.

Supponendo ora questo utente di nome "utente" si hanno tutti i dati per poter montare la vecchia home con il comando: 


```bash
ecryptfs-recover-private /mnt/home/.ecryptfs/ciao/.Private
```

Dare conferma alle domande ed inserire la password di login dell'utente. Alla fine si visualizzerà un messaggio con scritto: 

```
Private data mounted at [/tmp/ecryptfs.NUMERILETTERE]
```

La parte finale del percorso subirà una modifica, ma quello è il percorso in cui si troveranno i file recuperati.

## Dati recuperati

Se a causa di una corruzione dell'hard disk, di un errore oppure di una cancellazione i dati sono andati persi, è possibile recuperarli con specifici software, ad esempio come già descritto in uno dei nostri ultimi articoli con [il tool photorec](https://linuxhub.it/articles/howto-recupero-file-persi-photorec/). 

Se i file da recuperare sono stati tra quei file, si può sperare di recuperare qualche dato.

Photorec distribuisce tutti i files tra le cartelle **recup_dir**, se nelle impostazioni è abilitata la ricerca di file di tipo "eCryptFS" al loro interno si troveranno files con l'estensione `eCryptfs`. 

Sperando che tali files non facciano parte di più cartelle cifrate in precedenza, spostiamoli tutti all'interno di una sola cartella: 

```bash
mkdir recuperati
mv recup_dir.*/*.eCryptfs recuperati
```

Si può pensare a come montare la cartella. Utilizziamo il metodo descritto nella prima parte, creando un punto di mounting e cercando di comprendere i parametri di montaggio:

```bash
mkdir decriptati
mount -t ecryptfs recuperati decriptati
```

Se era una home, probabilmente si poteva pensare a mettere questi parametri già come opzione del comando `mount`:

```bash
mount -t ecryptfs -o ecryptfs_passthrough=n,key=passphrase,ecryptfs_enable_filename_crypto=y,ecryptfs_key_bytes=16,ecryptfs_cipher=aes recuperati decriptati
```

Ma tali parametri possono anche variare, quindi è meglio provare varie combinazioni o, per avere maggiore sicurezza, vedere come è fatto il codice sorgente nel [repository ufficiale di github](https://github.com/dustinkirkland/ecryptfs-utils/blob/master/src/utils/ecryptfs-setup-private). 
