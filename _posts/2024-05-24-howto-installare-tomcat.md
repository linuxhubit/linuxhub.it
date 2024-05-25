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

## Struttura files di tomcat

Tomcat possiede diversi file di configurazione, la conoscenza di questi file è fondamentale per conoscere tutte le dinamiche che possono impedire un corretto funzionamento dell'applicativo o del server.

Prima di tutto si può fare una panoramica sulle cartelle: 

- bin: contiene gli script per l'esecuzione e la configurazione dell'ambiente di tomcat tra cui `catalina.sh`.
- conf: contiene le configurazioni principali per l'avvio e l'esecuzione di tomcat. Inclusi permessi degli utenti, datasources e punti di accesso dell'applicazione.
- lib: Contiene le librerie che devono essere condivise tra le varie webapps.
- logs: contiene i log dell'applicazione e la loro rotazione.
- temp: File temporanei di catalina
- webapps: La cartella cuore di tomcat, dove vengono memorizzate le varie applicazioni e la ROOT.
- work: Una cartella dove possono essere depositati i vari file dell'applicativo

### Webapps

Ogni cartella all'interno di webapps rappresenta un *possibile endpoint* del server (a meno di configurazioni particolari).

Normalmente al suo interno si hanno le seguenti cartelle: 

- docs: contiene la documentazione di apache.
- examples: Alcuni esempi per applicativi.
- host-manager: un applicativo per la gestione degli utenti di tomcat (si accede tramite **/host-manager**)
- manager: un applicativo per la gestione delle risorse e di altri applicativi di tomcat (si accede tramite **/manager**)
- ROOT: l'applicazione mappata nel percorso **/**, il contenuto si può sovrascrivere per inserire l'applicazione che stiamo sviluppando.

### Files di configurazione

Con la premessa che la suddivisione di alcuni files è più logica che netta, e che quindi questo comporta che più files possono gestire una stessa funzione, la struttura di tomcat è molto semplice ed in genere facilmente configurabile.

Ogni file di configurazione contiene già delle preconfigurazioni di base e delle zone opportunamente commentate per rendere più semplice una personalizzazione all'utente.

Vediamo una panoramica:

-  `server.xml` è uno dei file principali della struttura di tomcat, definisce servizi, driver e configurazioni di connessione alla datasources, gli endpoint e così via...
- `web.xml` Serve a speficiare l'entry point (ovvero i file da servire al punto di ingresso) delle appliazioni. Se configurato nella cartella `conf` è globale, tuttavia ogni applicazione può avere il proprio file *web.xml* nella cartella di *META-INF* per impostazioni specifiche.
- `context.xml` definisce informazioni e configurazioni riguardanti le risorse che devono essere disponibili per un applicazione al suo avvio, come variabili e datasources. Alcune funzionalità si sovrappongono con `server.xml` e si ha la libera scelta nell'utilizzare uno o l'altra.
- `tomcat-users.xml` è un file di sicurezza, definisce infatti quali pagine hanno l'accesso protetto, per quali utenti e con quali credenziali. È una configurazione statica (quindi non si aggiorna in autonomia) ma ottima se si vuole proteggere alcune pagine di configurazione del server.
- `logging.properties` gestisce le configurazioni di logging.
- `catalina.policy` permette di fare il mapping di permessi specifici di java, è un file avanzato di configurazione e necessita la conoscenza dei processi di sicurezza della JVM stessa.
- `catalina.properties` gestisce varie configurazioni di tomcat come la lista dei jar da cui prelevare classi per il classpath generico.

Alcuni files son più ricorrenti nelle configurazioni e meritano un approfondimento in più. 

### server.xml

Il file server.xml può gestire diversi aspetti dell'applicazione, dal percorso della cartella "root" del server, la porta di connessione di tomcat, ai connettori necessari all'avvio fino alle risorse per la gestione del database.

Supponendo di dover fare il mapping di una particolare cartella di **webapps** con la **ROOT** si può scrivere:

```xml
<Engine name="Catalina" defaultHost="localhost">
	<Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true">
	<Context path="" docBase="myapp"/>
	</Host>
</Engine>
```

dove `myapp` è una delle cartelle nella cartella di `webapps`.


Altra configurazione molto frequente è quella per una resource JNDI (o un datasource) all'interno dell'applicativo: 

```xml
<GlobalNamingResources>
<Resource name="jdbc/MyDB"
			auth="Container"
			type="javax.sql.DataSource"
			maxTotal="100" maxIdle="30" maxWaitMillis="10000"
			username="dbuser" password="dbpassword"
			driverClassName="com.mysql.cj.jdbc.Driver"
			url="jdbc:mysql://localhost:3306/mydb"/>
</GlobalNamingResources>
```

Nell'engine va aggiunto il riferimento alla resource: 

```xml
<Engine name="Catalina" defaultHost="localhost">
	<Host name="localhost" appBase="webapps"
		unpackWARs="true" autoDeploy="true">
	<Context path="" docBase="myapp">
		<ResourceLink name="jdbc/MyDB"
					global="jdbc/MyDB"
					type="javax.sql.DataSource"/>
	</Context>
	</Host>
</Engine>
```

Il risultato finale è: 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">

  <!-- Global Naming Resources -->
  <GlobalNamingResources>
    <Resource name="jdbc/MyDB"
              auth="Container"
              type="javax.sql.DataSource"
              maxTotal="100" maxIdle="30" maxWaitMillis="10000"
              username="dbuser" password="dbpassword"
              driverClassName="com.mysql.cj.jdbc.Driver"
              url="jdbc:mysql://localhost:3306/mydb"/>
  </GlobalNamingResources>

  <Service name="Catalina">
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <Engine name="Catalina" defaultHost="localhost">
      <Host name="localhost" appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <Context path="" docBase="myapp">
          <ResourceLink name="jdbc/MyDB"
                        global="jdbc/MyDB"
                        type="javax.sql.DataSource"/>
        </Context>
      </Host>
    </Engine>
  </Service>
</Server>
```

> Attenzione:  
>
> Ci son vari modi per configurare in maniera corretta il file xml, fare sempre riferimento alle documentazioni del proprio progetto.


### web.xml

## Installare un applicativo WAR

## Avviare tomcat

### La cartella dei log

### Fermare tomcat

#### Assicurarsi che sia spento tramite ps

### Avviare tomcat in debug