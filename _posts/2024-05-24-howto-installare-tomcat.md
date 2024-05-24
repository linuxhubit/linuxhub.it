---
class: post
title: "#howtodev - Avviare applicazione su tomcat"
date: 2024-05-24 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: false
tags:
- java
- tomcat
- bash
---

Apache Tomcat è uno dei web server più usati in ambito business, anche grazie alla gran parte di framework Java in circolazione.
Ecco una breve guida introduttiva

## Cos'è un webserver Apache

Apache tomcat è un server web per applicazioni scritte in Java, più semplicemente è quel software che fa da tramite tra il web e l'applicativo avviato in background, ne tiene il ciclo di vita attivo, i log le proprietà di connessione e la gestione degli errori.

### WAR Java e Tomcat

Generalmente un applicazione Java gestita tramite un dependency manager genera in output un archivio WAR, ovvero uno zip contenente librerie e classi compilate, inclusivo delle informazioni su endpoint e connessione di quel modulo.

Il file WAR viene scompattato da Tomcat in una cartella (chiamata `webapps`) e avviata secondo le informazioni presenti nel manifesto, questo processo viene quindi tenuto in vita dal webserver.

### Springboot

Alcuni framework, come springboot, scaricano autonomamente tomcat e installano di conseguenza i propri eseguibili in maniera indipendete.

## Installazione tomcat

Per installare tomcat bisogna innanzitutto avere ben chiara la versione di Java che si andrà ad utilizzare, in base ad essa infatti cambierà di conseguenza la versione di tomcat richiesta.

Nello specifico è presente una tabella riassuntiva [qui](https://tomcat.apache.org/whichversion.html).

### Java8

Per versioni di Java 8 ed inferiori si può utilizzare sia [Tomcat8](https://archive.apache.org/dist/tomcat/tomcat-8/) che [Tomcat9](https://archive.apache.org/dist/tomcat/tomcat-9/).  

Nello specifico Tomcat8 può essere utilizzato con linguaggi che seguono le specifiche di JEE 7, quindi Java 7 e Java 8.

Tomcat9 invece utilizza JEE8, da utilizzare con versioni Java8 e superiori.

Per installare ad esempio *Tomcat 8.5.99* (molto utilizzato in ambito business dai vecchi applicativi) scrivere:

```bash
wget 'https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.100/bin/apache-tomcat-8.5.100.tar.gz'

tar -xvzf apache-tomcat-8.5.100.tar.gz
```

> NOTA BENE:  
>
> La versione 8 di tomcat è ormai senza supporto (da Marzo 2024), e potrebbe avere delle vulnerabilità di sicurezza.

### Java11

Con Java 11 si può utilizzare [Tomcat9](https://archive.apache.org/dist/tomcat/tomcat-9/) e [Tomcat10](https://archive.apache.org/dist/tomcat/tomcat-10/).

Dalla versione 10 di Tomcat viene supportato *non più JavaEE* ma l'alternativa *Open source* **Jakarta**.

Supponendo di voler installare Tomcat 10.1.24 basta scrivere:

```java
wget 'https://archive.apache.org/dist/tomcat/tomcat-10/v10.1.24/bin/apache-tomcat-10.1.24.tar.gz'

tar -xvzf apache-tomcat-10.1.24.tar.gz
```

### Java17


Con Java 17 si possono utilizzare le versioni di [Tomcat successive alla 11](https://archive.apache.org/dist/tomcat/tomcat-11/).

Si ricorda che comunque la versione 11 *è in versione alpha*.

Supponendo di voler installare Tomcat 11.0.0-M20 basta scrivere:

```java
wget 'https://archive.apache.org/dist/tomcat/tomcat-11/v11.0.0-M20/bin/apache-tomcat-11.0.0-M20.tar.gz'

tar -xvzf apache-tomcat-11.0.0-M20.tar.gz
```

## File di configurazione tomcat

Tomcat possiede diversi file di configurazione, la conoscenza di questi file è fondamentale per conoscere tutte le dinamiche che possono impedire un corretto funzionamento dell'applicativo o del server.

Prima di tutto si può fare una 


Il file server.xml è il più critico poiché definisce la struttura di base e i connettori del server.
Il file web.xml fornisce configurazioni standard per tutte le applicazioni, ma ogni applicazione può avere il proprio file web.xml per impostazioni specifiche.
Il file context.xml consente di definire configurazioni che possono essere condivise da tutte le applicazioni o specifiche per una singola applicazione se posizionato nella directory META-INF di quella applicazione.
Il file tomcat-users.xml è essenziale per la gestione degli utenti e dei ruoli, specialmente per l'accesso alle console di gestione di Tomcat.
Il file logging.properties è importante per la gestione dei log, consentendo di configurare come e dove vengono registrati i log di Tomcat.
Il file Catalina.policy è rilevante per le impostazioni di sicurezza e controllo degli accessi a livello di codice.
Il file Catalina.properties gestisce le proprietà di sistema e le configurazioni generali di Tomcat.

### server.xml

### web.xml

## Installare un applicativo WAR

## Avviare tomcat

### La cartella dei log 

### Fermare tomcat

#### Assicurarsi che sia spento tramite ps

### Avviare tomcat in debug