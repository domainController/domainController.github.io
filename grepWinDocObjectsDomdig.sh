kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ grep -Eor --exclude-dir=stats '(document\.\w*\.?\w*)|(window\.[a-zA-Z]+)' .
./domdig.js:document.createEvent
./domdig.js:window.localStorage
./domdig.js:window.sessionStorage
./domdig.js:document.location.hash
./utils.js:document.documentElement
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ 
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ grep -Eor --exclude-dir=stats '(document\.\w*\.?\w*)|(window\.[a-zA-Z]+)' . > raw2
grep: input file ‘./raw2’ is also the output
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ cat raw2 
./domdig.js:document.createEvent
./domdig.js:window.localStorage
./domdig.js:window.sessionStorage
./domdig.js:document.location.hash
./utils.js:document.documentElement
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ awk -F ':' '{print $2}' raw2 
document.createEvent
window.localStorage
window.sessionStorage
document.location.hash
document.documentElement
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ awk -F ':' '{print $2}' raw2 > bla2
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ awk -F ':' '{print $2}' raw2 > bla2
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ sort bla2 | uniq -c | sort -nr
      1 window.sessionStorage
      1 window.localStorage
      1 document.location.hash
      1 document.documentElement
      1 document.createEvent
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ sort bla2 | uniq -c | sort -nr > windocobjectsHz.txt
kami@base43:~/Documents/staticAnalysis/puppeteer/domdig$ mv 
 
