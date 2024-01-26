---
class: post
title: "#howto - installare hadoop e hdfs"
date: 2024-01-26 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags:
- ubuntu
- fedora
- archlinux
- hadoop
---

Ultimamente per lavoro mi è capitato di dover utilizzare Scala, Spark e Hadoop. 
Se per configurare le prime due tecnologie il processo è stato abbastanza automatico, l'ultimo ha invece dato qualche rogna...

## Hadoop e HDFS

Per chi non fosse sicuro di cosa sta andando a leggere, Hadoop è un framework open source progettato da Apache per gestire grandi quantità di dati in modo distribuito su cluster di computer.
È scritto per lo più in linguaggio Java e si può trovare il [codice sorgente su Github](https://github.com/apache/hadoop).
Insieme ad Hadoop viene installato il driver HDFS, ovvero il driver per Hadoop File System, il sistema di archiviazione distribuito di Hadoop.

## Prerequisiti

Si presuppone che, il lettore, abbia gia Scala e Apache Spark (o Python e Pyspark).
Inoltre deve avere Java installato e la variabile JAVA_HOME impostata con il path dell'installazione di Java.

## Installazione

I vari package manager non danno la possibilità di installare in maniera automatizzata, per gli utenti di ArchLinux si può trovare in teoria [il pacchetto su AUR](https://aur.archlinux.org/packages/hadoop), pronto per essere installato tramite:

```bash
git clone https://aur.archlinux.org/packages/hadoop
cd hadoop
makepkg -si
```

Tuttavia anche questo spesso è mal funzionante e non esente da errori di compilazione.
Ecco quindi un metodo funzionante e generico per l'installazione di Hadoop, indipendente dalla distribuzione o dal package manager.

## Sito web e download

Fondamentalmente si deve installare il software manualmente scaricando l'archivio, come già descritto [in un articolo precedente](https://linuxhub.it/articles/2023-09-01-howto-installare-archivio).

Si acceda al [sito web di hadoop](https://hadoop.apache.org/releases.html) per il download, quindi si scarichi la versione che si desidera dalla colonna "Binary download".
Nella schermata successiva scaricare il **tar.gz** tramite link in alto.

Alternativamente si può effettuare quest'operazione di download direttamente da terminale con il tool `wget`, supponendo di voler scaricare la versione `3.3.6`:

```bash
wget https://dlcdn.apache.org/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz
```

In caso di versioni diverse, basta cambiare il numero di versione nel link.

### Decompressione e installazione

Una volta effettuato il download basta decomprimere il file `tar.gz` scaricato con l'apposito comando: 

```bash
tar -xvzf hadoop*tar.gz
```

Quindi copiare la cartella sotto un punto del sistema raggiungibile a tutti gli utenti.
In genere i software di terze parti si installano sotto la cartella `/opt`:

```bash
rm hadoop*tar.gz # in questo modo viene eliminato l'archivio
cp -r hadoop* /opt/hadoop
```

## Aggiornare il PATH e le variabili d'ambiente

È quindi arrivato il momento di aggiornare le variabili d'ambiente. 
Per aggiornarle è necessario modificare uno dei [file di avvio della nostra shell](https://linuxhub.it/articles/2023-09-08-howto-file-avvio-shell).

Ad esempio se si utilizza bash, si può pensare di modificare il file **$HOME/.bashrc**:

```bash
export HADOOP_HOME=/opt/hadoop
export PATH="$PATH:$HADOOP_HOME/bin"
export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib/native"
export LD_LIBRARY_PATH=$HADOOP_HOME/lib/native
```

*Oppure*, al posto degli ultimi export, è possibile copiare le librerie nella cartella apposita:

```bash
ln -sf $PWD/libhadoop.a  /usr/lib/libhadoop.a
ln -sf $PWD/libhadooppipes.a  /usr/lib/libhadooppipes.a
ln -sf $PWD/libhadooputils.a  /usr/lib/libhadooputils.a
ln -sf $PWD/libhdfs.a  /usr/lib/libhdfs.a
ln -sf $PWD/libhdfs.so.0.0.0  /usr/lib/libhdfs.so
ln -sf $PWD/libhdfspp.a  /usr/lib/libhdfspp.a
ln -sf $PWD/libhdfspp.so.0.1.0  /usr/lib/libhdfspp.so
ln -sf $PWD/libnativetask.a  /usr/lib/libnativetask.a
ln -sf $PWD/libnativetask.so.1.0.0  /usr/lib/libnativetask.so
```

Ma è una pratica **che non consiglio**.

## Test e avvio di Spark Shell

Per testare che tutto funzioni correttamente, aprire il terminale e quindi: 

```bash
spark-shell
```

Se appare:

```plain
WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
```

Allora **qualcosa è andato storto**, riprovare i vari step. Inoltre digitare:

```bash
hadoop version 
```

Per verificare che la versione corrisponda.
