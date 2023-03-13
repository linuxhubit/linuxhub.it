---
class: post
title: '#howto - Creare un supporto USB avviabile usando "dd"'
date: 2017-07-09
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:

---

<p>Normalmente, o almeno oggi come oggi, prima di installare un sistema operativo si preferisce creare un supporto USB avviabile, piuttosto che optare per la masterizzazione o per il semplice uso di un supporto ottico. Di tool dediti&nbsp;alla causa ce ne sono ormai a non finire, per qualsivoglia sistema operativo. Tra i più conosciuti possiamo tranquillamente citare:</p>
<ul>
   <li>UNetbootin;</li>
   <li>Mintstick;</li>
   <li>Fedora liveusb-creator;</li>
   <li>Etcher;</li>
   <li>Suse Image writer.</li>
</ul>
<p>Ma in fin dei conti, questi tool sono semplicemente delle <strong>GUI del software</strong> <strong>"dd"</strong>. Il<strong> Data Duplicator</strong> o più comunemente "dd", permette tra le sue funzionalità, anche di creare, <strong>tramite l'uso del teminale</strong>, in maniera semplicemente disarmante un supporto USB avviabile. Dd è preinstallato nella maggior parte delle distribuzioni linux e permette di copiare i dati in blocchi da un supporto ad un altro. Iniziamo digitando un bel</p>
<pre><code>man dd</code></pre>
<p>per avere subito una panoramica generale sulla sintassi del comando. &nbsp;</p>
<h2>Creazione supporto</h2>
<p>Dopo le dovute premesse du dd e sulle sue potenzialità, non ci resta che passare all'azione. Come operazione preliminare abbiamo bisogno (così giusto per citare l'ovvio) di:</p>
<ul>
   <li>un supporto USB vuoto (grande abbastanza da contenere la<strong> .iso</strong> del sistema operativo che andremo a copiare);</li>
   <li>una porta USB dove collegare il nostro supporto (sul serio?);</li>
   <li>un terminale;</li>
   <li>l'immagine iso del sistema operativo che vogliamo copiare tramite dd.</li>
</ul>
<p>&nbsp; Per prima cosa dobbiamo conoscere il percorso del nostro supporto USB, possiamo farlo da un software ad interfaccia ma ormai che siamo in gioco, giochiamo, possiamo quindi vedere la lista dei nostri dispositivi tramite il comando "lsblk" che restituirà una lista dettagliata dei supporti connessi con relativa path, digitiamo quindi:</p>
<pre>lsblk</pre>
<p>e identifichiamo la path del nostro supporto, indicata nella colonna "NAME" dell'output. Mediante l'istruzione<em> if=/path</em> si definisce il file da copiare (in questo caso sara' un file .iso). Mediante l'istruzione <em>of=/path</em> si determinerà invece il dispositivo sul quale il file verra' copiato. Ma andiamo all'esempio pratico. Se la nostra immagine iso si trova in <em>/home/mio_utente/Download</em> ed il supporto su cui voglio che l'immagine iso sia copiata è <em>/dev/sdb</em>, allora la sintassi sarà:</p>
<pre><code>dd if=/home/mio_utente/Downlod/file.iso of=/dev/sdb</code></pre>
<h2>Consigli</h2>
<p>Di per se è sufficiente seguire l'istruzione sopra citata, aspettare che il terminale smetta di lavorare ed il nostro supporto USB avviabile è bello e pronto per l'uso. Tuttavia, la possibilità di visualizzare lo stato di avanzamento del processo e magari rendere il trasferimento dei dati più veloce, potrebbero essere opzioni molto allettanti. Aggiungendo la sintassi <em>status=progress</em> potremo conoscere in tempo reale quanti dati sono stati trasferiti e come procede, appunto, il trasferimento. Con la sintassi <em>bs=(numero)M</em> forzando il processo di trasferimento in base alla tecnologia della nostra porta usb. Ovviamente la resa è maggiore con tecnlogia <strong>usb 3.0 e/o 3.1</strong> (che ormai rappresenta lo standard).</p>
<p>bs=15M - potrebbe essere un esempio</p>
<p>Mettendo insieme i pezzi del puzzle non ci resta che dare un'occhiata al comando finale:</p>
<pre><code>dd if=/home/mio_utente/Downlod/file.iso of=/dev/sdb status=progress bs=15M</code></pre>
<p>&nbsp;</p>